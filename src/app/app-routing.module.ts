import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { config } from '@config';

const routes: Routes = [
  {
    path: config.routes.home,
    data: { title: '' },
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: config.routes.tab,
    loadChildren: () =>
      import('./modules/tabs/tabs.module').then((m) => m.TabsModule),
  },
  {
    path: config.routes.tournament,
    data: { title: 'Torneo' },
    loadChildren: () =>
      import('./modules/tournament/tournament.module').then(
        (m) => m.TournamentModule
      ),
  },
  {
    path: config.routes.car,
    data: { title: 'Coche' },
    loadChildren: () =>
      import('./modules/car/car.module').then((m) => m.CarModule),
  },
  {
    path: config.routes.pairing,
    data: { title: 'Emparejamiento' },
    loadChildren: () =>
      import('./modules/pairing/pairing.module').then((m) => m.PairingModule),
  },
  {
    path: config.routes.rounds,
    data: { title: 'Rondas' },
    loadChildren: () =>
      import('./modules/rounds/rounds.module').then((m) => m.RoundsModule),
  },
  {
    path: config.routes.inscriptions,
    data: { title: 'Inscripciones' },
    loadChildren: () =>
      import('./modules/inscriptions/inscriptions.module').then(
        (m) => m.InscriptionsModule
      ),
  },
  {
    path: config.routes.rounds,
    data: { title: 'Rondas' },
    loadChildren: () =>
      import('./modules/rounds/rounds.module').then((m) => m.RoundsModule),
  },
  {
    path: config.routes.ranking,
    data: { title: 'Ranking' },
    loadChildren: () =>
      import('./modules/ranking/ranking.module').then((m) => m.RankingModule),
  },
  {
    path: config.routes.myGarage,
    data: { title: 'Garage' },
    loadChildren: () =>
      import('./modules/my-garage/my-garage.module').then(
        (m) => m.MyGarageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: config.routes.myInscriptions,
    data: { title: 'Mis Inscripciones' },
    loadChildren: () =>
      import('./modules/my-inscriptions/my-inscriptions.module').then(
        (m) => m.MyInscriptionsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: config.routes.myLikes,
    data: { title: 'Mis Me gustas' },
    loadChildren: () =>
      import('./modules/my-likes/my-likes.module').then((m) => m.MyLikesModule),
    canActivate: [AuthGuard],
  },
  {
    path: config.routes.myTrophies,
    data: { title: 'Mis Trofeos' },
    loadChildren: () =>
      import('./modules/my-trophies/my-trophies.module').then(
        (m) => m.MyTrophiesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: config.routes.myData,
    data: { title: 'Mis datos' },
    loadChildren: () =>
      import('./modules/my-data/my-data.module').then((m) => m.MyDataModule),
    canActivate: [AuthGuard],
  },
  {
    path: config.routes.privaciPolicy,
    data: { title: 'Politica de privacidad' },
    loadChildren: () =>
      import('./modules/privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyModule
      ),
  },
  {
    path: config.routes.about,
    data: { title: 'Acerca de' },
    loadChildren: () =>
      import('./modules/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: config.routes.home,
    redirectTo: '',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
