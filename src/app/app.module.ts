import { ImagePipe } from './pipes/image/image.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { customAnimation } from './core/animations/animations';
import { ServicesModule } from './services/services.module';
import { PipesModule } from './pipes/pipes.module';
import { LoginGuard } from './core/guards/check-token.guard';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        ServicesModule,
        PipesModule,
        IonicModule.forRoot({
            navAnimation: customAnimation,
        }),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
    ],
    providers: [
        ImagePipe,
        LoginGuard,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
