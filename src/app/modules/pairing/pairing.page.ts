import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ModalController,
  ModalOptions,
  NavController,
  Platform,
} from '@ionic/angular';
import { PairingViewModel } from './model/pairing.view-model';
import {
  EventsService,
  ImageService,
  PairingService,
  SocialSharingService,
  ToastIonicService,
  UserService,
  VoteService,
} from '@services';
import { ImagePipe } from '@pipes';
import { ReportModalComponent } from '@components/report-modal/report-modal.component';
import { Pairing, Vote } from '@models';
import { Device } from '@capacitor/device';

@Component({
  selector: 'page-pairing',
  templateUrl: 'pairing.page.html',
})
export class PairingPage {
  type: string;
  vm = new PairingViewModel();

  constructor(
    private route: ActivatedRoute,
    private pairingService: PairingService,
    private modalCtrl: ModalController,
    private imagePipe: ImagePipe,
    private voteService: VoteService,
    private socialSharingService: SocialSharingService,
    private userService: UserService,
    private navCtrl: NavController,
    private eventsService: EventsService,
    private imageService: ImageService,
    private toastIonicService: ToastIonicService,
    private platform: Platform
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.vm.loading = true;
    this.vm.id = this.route.snapshot.paramMap.get('id')!;
    this.vm.user = this.userService.getUser();
    if (this.vm.user) {
      this.vm.reportState = true;
    }
    this.getOne();
    this.vm.uuid = (await Device.getId()).uuid;
  }

  getOne() {
    this.pairingService.getOne(this.vm.id).subscribe({
      next: async (item) => this.getOneOnSuccess(item),
      error: (error) => this.getOneOnError(error),
    });
  }

  async getOneOnSuccess(item: Pairing) {
    this.vm.pairing = item;
    this.vm.header.title = this.vm.pairing.tournament.name;
    this.vm.backButtonRoute = `tournament/${this.vm.pairing.tournament._id}`;
    this.setImageForBackground('car1');
    this.setImageForBackground('car2');
    this.vm.voteBody.pairing = this.vm.pairing._id;
    this.vm.voteBody.tournament = this.vm.pairing.tournament._id;
    this.vm.voteBody.round = this.vm.pairing.round._id;
    this.setScore();
    if (await this.voteService.isValidVote(this.vm.voteBody)) {
      this.vm.voted = false;
    } else {
      this.vm.voted = true;
    }

    if (this.vm.pairing.round.status === 'Completed') {
      this.vm.voted = true;
    }
    this.vm.loading = false;
    this.setRoute();
  }

  getOneOnError(error) {
    this.toastIonicService.error(error ?? 'Error al obtener la información');
    this.vm.loading = false;
  }

  setRoute() {
    this.route.queryParams.subscribe((params) => {
      if (params.type) {
        this.vm.header.backButton.default = false;
        this.type = params['type'];
        this.vm.header.backButton.route = `/tab/calendar`;
      } else {
        this.vm.header.backButton.default = true;
        this.vm.header.backButton.route = `/rounds/${this.vm.pairing.tournament._id}`;
      }
    });
  }

  setImageForBackground(type: 'car1' | 'car2') {
    if (this.vm.pairing[type]) {
      this.vm[type === 'car1' ? 'image1' : 'image2'] = {
        url: this.imagePipe.transform(
          this.vm.pairing[type].image && this.vm.pairing[type].image.url
            ? this.vm.pairing[type].image.url
            : null
        ),
      };
    }
  }

  async openReportModal() {
    const options: ModalOptions = {
      component: ReportModalComponent,
      mode: 'ios',
      cssClass: 'modal-report',
      componentProps: {
        pairing: this.vm.pairing,
        userId: this.vm.user._id,
      },
    };
    const modal = await this.modalCtrl.create(options);
    modal.present();
  }

  share() {
    this.socialSharingService.share(
      `¡${this.vm.pairing.round.name} del torneo ${
        this.vm.pairing.tournament.name
      }! ${
        this.vm.pairing.car1.brand.name + ' ' + this.vm.pairing.car1.model
      } vs ${
        this.vm.pairing.car2.brand.name + ' ' + this.vm.pairing.car2.model
      }`,
      `https://www.carstournaments.com/pairing/${this.vm.id}`
    );
  }

  onClickBackRoute() {
    this.eventsService.publish('returnFromVote', {
      voted: this.vm.votedNow,
    });
    this.navCtrl.navigateBack(this.vm.header.backButton.route);
  }

  async vote(type: string) {
    const user = this.userService.getUser();
    if (!this.platform.is('capacitor') && !user) {
      return this.toastIonicService.error('Debes iniciar sesión para votar');
    } else if (this.platform.is('capacitor') && !user) {
      this.vm.voteBody.uuid = this.vm.uuid;
    } else if (this.platform.is('capacitor') && user || !this.platform.is('capacitor') && user) {
      this.vm.voteBody.user = user._id;
    }
    this.vm.voteBody.car = this.vm.pairing[type]._id;
    this.voteService.create(this.vm.voteBody).subscribe({
      next: (item) => this.onVoteSuccess(item),
      error: (error) =>
        this.toastIonicService.error(error ?? 'Ha ocurrido un error al votar'),
    });
  }

  onVoteSuccess(vote: Vote) {
    const car = vote.car === this.vm.pairing.car1._id ? 'car1' : 'car2';
    this.voteService.setValidVote(vote);
    this.setScore(car);
    this.vm.voted = true;
    this.toastIonicService.info(
      'Tu voto se ha registrado correctamente, ¡gracias!'
    );
  }

  setScore(force?: any): void {
    const cars = {
      car1: { votes: 0, percentage: 0 },
      car2: { votes: 0, percentage: 0 },
    };
    for (const vote of this.vm.pairing.votes) {
      if (
        vote.car === this.vm.pairing.car1 ||
        vote.car === this.vm.pairing.car1._id
      ) {
        cars.car1.votes++;
      } else {
        cars.car2.votes++;
      }
    }
    if (force) {
      cars[force].votes++;
    }
    this.vm.pairing.car1.votes = cars.car1.votes;
    this.vm.pairing.car2.votes = cars.car2.votes;
  }

  openImage(image: string) {
    this.imageService.openImage(image);
  }
}
