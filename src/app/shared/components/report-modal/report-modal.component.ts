import { Component, Input } from '@angular/core';
import { Pairing, Report } from '@models';
import { ModalController } from '@ionic/angular';
import { ReportService, AlertService, ToastIonicService } from '@services';

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
    private modalCtrl: ModalController,
    private toastIonicService: ToastIonicService
  ) {}

  checkReasons() {
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
          this.toastIonicService.info('Reporte creado');
          this.modalCtrl.dismiss();
        },
        error: () =>
          this.toastIonicService.error('Error, intentalo de nuevo mas tarde'),
      });
    } else {
      this.toastIonicService.error('Por favor, llena todos los campos');
    }
  }
}
