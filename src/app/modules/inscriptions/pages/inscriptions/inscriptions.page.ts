import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { config } from '@config';
import { NavController } from '@ionic/angular';
import { Car } from '@models';
import { AnalyticsService, InscriptionService } from '@services';
import { InscriptionsViewModel } from '../../models/inscriptions.view-model';

@Component({
    selector: 'page-inscriptions',
    templateUrl: 'inscriptions.page.html',
})
export class InscriptionsPage {
    vm = new InscriptionsViewModel();
    constructor(
        private route: ActivatedRoute,
        private inscriptionService: InscriptionService,
        private analyticsService: AnalyticsService,
        private navCtrl: NavController
    ) {}

    ionViewWillEnter() {
        this.vm.id = this.route.snapshot.paramMap.get('id')!;
        this.getInscriptionsOfTournament();
    }

    getInscriptionsOfTournament() {
        this.vm.loading = true;
        this.inscriptionService
            .getAllOfTournament({ id: this.vm.id })
            .subscribe({
                next: (data) => {
                    this.vm.inscriptions = data;
                    this.vm.loading = false;
                    this.vm.error = false;
                },
                error: () => {
                    this.vm.loading = false;
                    this.vm.error = true;
                },
            });
    }

    goToCar(car: Car): void {
        this.analyticsService.logEvent('tournament_goToCar');
        this.navCtrl.navigateForward(config.routes.car.replace(':id', car._id));
    }
}
