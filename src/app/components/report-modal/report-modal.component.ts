import { Component, Input } from '@angular/core';
import { Pairing, Report } from 'src/app/models';
import { ReportService } from 'src/app/services/api/report/report.service';
import { AlertService } from 'src/app/services';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'report-modal',
    templateUrl: 'report-modal.component.html',
    styleUrls: ['./report-modal.component.scss'],
})
export class ReportModalComponent {
    @Input() pairing: Pairing;
    @Input() userId: string;
    report = new Report();
    reasons = ['Informacion erronea', 'Posibles trampas', 'Otro'];
    otherReason = {
        state: false,
        text: '',
    };
    constructor(
        private reportService: ReportService,
        private alertService: AlertService,
        private modalCtrl: ModalController
    ) {}

    checkReasons() {
        console.log(this.report.reason);
        if (this.report.reason === 'Otro') {
            this.otherReason.state = true;
        } else {
            this.otherReason.state = false;
        }
    }

    createReport() {
        if (
            this.report.carReported &&
            this.report.reason &&
            this.report.reason.length > 5
        ) {
            this.report.userReporter = this.userId;
            this.report.userReported =
                this.report.carReported === this.pairing.car1._id
                    ? this.pairing.car1.driver
                    : this.pairing.car2.driver;
            this.reportService.create(this.report).subscribe({
                next: () => {
                    this.alertService.presentAlert('Info', 'Reporte creado');
                    this.modalCtrl.dismiss();
                },
                error: (err) => this.alertService.presentAlert('Error', err),
            });
        } else {
            this.alertService.presentAlert(
                'Error',
                'Por favor, llena todos los campos'
            );
        }
    }
}
