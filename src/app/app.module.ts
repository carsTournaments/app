import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { customAnimation } from './core/animations/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from '@shared/shared.module';
import { ImagePipe } from '@shared/pipes';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        SharedModule,
        BrowserModule,
        HttpClientModule,
        RouterModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot({ navAnimation: customAnimation }),
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        ImagePipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
