import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image, Pairing, Vote } from '@models';
import {
    ImageService,
    ToastIonicService,
    UserService,
    VoteService,
} from '@services';

@Component({
    selector: 'pairing-header',
    templateUrl: 'pairing-header.component.html',
    styleUrls: ['./pairing-header.component.scss'],
})
export class PairingHeaderComponent implements OnInit {
    @Input() pairing: Pairing;
    @Input() images: { car1: Image; car2: Image };
    @Input() backButtonRoute: string;
    @Input() voteBody: Vote;
    @Input() voted: boolean;
    @Input() reportState = false;
    @Output() share = new EventEmitter();
    @Output() report = new EventEmitter();
    image1: Image;
    image2: Image;

    constructor(
        private userService: UserService,
        private voteService: VoteService,
        private imageService: ImageService,
        private toastIonicService: ToastIonicService
    ) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.setScore();
        }, 1000);
    }

    async vote(type: string) {
        this.voteBody.car = this.pairing[type]._id;
        if (this.userService.getUser()) {
            this.voteBody.user = this.userService.getUser()._id;
        }
        this.voteService.create(this.voteBody).subscribe({
            next: (item) => this.onVoteSuccess(item),
            error: () =>
                this.toastIonicService.error(
                    'Ha ocurrido un error, intentalo mas tarde'
                ),
        });
    }

    onVoteSuccess(vote: Vote) {
        const car = vote.car === this.pairing.car1._id ? 'car1' : 'car2';
        this.voteService.setValidVote(vote);
        this.setScore(car);
        this.voted = true;
        this.toastIonicService.info(
            'Tu voto se ha registrado correctamente, ¡gracias!'
        );
    }

    setScore(force?: any): void {
        const cars = {
            car1: { votes: 0, percentage: 0 },
            car2: { votes: 0, percentage: 0 },
        };
        for (const vote of this.pairing.votes) {
            if (
                vote.car === this.pairing.car1 ||
                vote.car === this.pairing.car1._id
            ) {
                cars.car1.votes++;
            } else {
                cars.car2.votes++;
            }
        }
        if (force) {
            cars[force].votes++;
        }
        this.pairing.car1.votes = cars.car1.votes;
        this.pairing.car2.votes = cars.car2.votes;
    }

    openImage(image: string) {
        console.log(image);
        this.imageService.openImage(image);
    }
}
