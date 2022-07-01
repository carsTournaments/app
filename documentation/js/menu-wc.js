'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">cars-tournaments-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link" >AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AccountModule-40ccb26d7fe42ed28e9bcd9f602fa90dc121467510a8493246b9833b5ec1655307a78086eaa41097eaef1fc1ae84b65a369fc9e5a25c3ccbe4fb4288a343f212"' : 'data-target="#xs-components-links-module-AccountModule-40ccb26d7fe42ed28e9bcd9f602fa90dc121467510a8493246b9833b5ec1655307a78086eaa41097eaef1fc1ae84b65a369fc9e5a25c3ccbe4fb4288a343f212"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountModule-40ccb26d7fe42ed28e9bcd9f602fa90dc121467510a8493246b9833b5ec1655307a78086eaa41097eaef1fc1ae84b65a369fc9e5a25c3ccbe4fb4288a343f212"' :
                                            'id="xs-components-links-module-AccountModule-40ccb26d7fe42ed28e9bcd9f602fa90dc121467510a8493246b9833b5ec1655307a78086eaa41097eaef1fc1ae84b65a369fc9e5a25c3ccbe4fb4288a343f212"' }>
                                            <li class="link">
                                                <a href="components/AccountPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardResumeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardResumeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-37e48b5f6af59fcf48a574c5f2c287832bebeeddb4a9f0096e1e5e9bbe1f7993eba9347729a36db45d32b64a02f0e830d88b7c5f124e6e2cbb347e8a233530ee"' : 'data-target="#xs-components-links-module-AppModule-37e48b5f6af59fcf48a574c5f2c287832bebeeddb4a9f0096e1e5e9bbe1f7993eba9347729a36db45d32b64a02f0e830d88b7c5f124e6e2cbb347e8a233530ee"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-37e48b5f6af59fcf48a574c5f2c287832bebeeddb4a9f0096e1e5e9bbe1f7993eba9347729a36db45d32b64a02f0e830d88b7c5f124e6e2cbb347e8a233530ee"' :
                                            'id="xs-components-links-module-AppModule-37e48b5f6af59fcf48a574c5f2c287832bebeeddb4a9f0096e1e5e9bbe1f7993eba9347729a36db45d32b64a02f0e830d88b7c5f124e6e2cbb347e8a233530ee"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CalendarModule.html" data-type="entity-link" >CalendarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CalendarModule-730c07eb87f2331f3c43e369949607b59b10bcc0b34aabfdec0c816352d08daa3a3ee293f771f37aeb0b09338a49e2f0677ea5f1dce25e557591d0195765168a"' : 'data-target="#xs-components-links-module-CalendarModule-730c07eb87f2331f3c43e369949607b59b10bcc0b34aabfdec0c816352d08daa3a3ee293f771f37aeb0b09338a49e2f0677ea5f1dce25e557591d0195765168a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CalendarModule-730c07eb87f2331f3c43e369949607b59b10bcc0b34aabfdec0c816352d08daa3a3ee293f771f37aeb0b09338a49e2f0677ea5f1dce25e557591d0195765168a"' :
                                            'id="xs-components-links-module-CalendarModule-730c07eb87f2331f3c43e369949607b59b10bcc0b34aabfdec0c816352d08daa3a3ee293f771f37aeb0b09338a49e2f0677ea5f1dce25e557591d0195765168a"' }>
                                            <li class="link">
                                                <a href="components/CalendarDatesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarDatesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarItemTournamentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarItemTournamentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarItemsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarItemsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CarModule.html" data-type="entity-link" >CarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CarModule-026857def0918839cbd9bd71b3304397a7306c69f15a6328d7761e54597b5c1086a689f747ed5db3fbe0f994d5af4db6b4bb0577a6ba9e6019781961d9e6b2fe"' : 'data-target="#xs-components-links-module-CarModule-026857def0918839cbd9bd71b3304397a7306c69f15a6328d7761e54597b5c1086a689f747ed5db3fbe0f994d5af4db6b4bb0577a6ba9e6019781961d9e6b2fe"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CarModule-026857def0918839cbd9bd71b3304397a7306c69f15a6328d7761e54597b5c1086a689f747ed5db3fbe0f994d5af4db6b4bb0577a6ba9e6019781961d9e6b2fe"' :
                                            'id="xs-components-links-module-CarModule-026857def0918839cbd9bd71b3304397a7306c69f15a6328d7761e54597b5c1086a689f747ed5db3fbe0f994d5af4db6b4bb0577a6ba9e6019781961d9e6b2fe"' }>
                                            <li class="link">
                                                <a href="components/CarInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarTitleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarTitleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarTotalsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarTotalsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarTotalsDivsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarTotalsDivsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CarsModule.html" data-type="entity-link" >CarsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CarsModule-0b69907af8fcb0f05ab276863cc7fb5b6338bbbd362c7e1a019a933b7c03e2e183fdbed89018010ca4a641b08c36813bc398ebf1c9d82a41ea21cf7f013e8d12"' : 'data-target="#xs-components-links-module-CarsModule-0b69907af8fcb0f05ab276863cc7fb5b6338bbbd362c7e1a019a933b7c03e2e183fdbed89018010ca4a641b08c36813bc398ebf1c9d82a41ea21cf7f013e8d12"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CarsModule-0b69907af8fcb0f05ab276863cc7fb5b6338bbbd362c7e1a019a933b7c03e2e183fdbed89018010ca4a641b08c36813bc398ebf1c9d82a41ea21cf7f013e8d12"' :
                                            'id="xs-components-links-module-CarsModule-0b69907af8fcb0f05ab276863cc7fb5b6338bbbd362c7e1a019a933b7c03e2e183fdbed89018010ca4a641b08c36813bc398ebf1c9d82a41ea21cf7f013e8d12"' }>
                                            <li class="link">
                                                <a href="components/CarsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GarageModule.html" data-type="entity-link" >GarageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GarageModule-31d43ffa980113f7f4b775ad7f90b031b1d08f4628a8837453cd12fb12ca6ca36c0f74fc95f37db28e31efceb9f8b93a80933ee73b6265c4e42a8d0ddc39f0d1"' : 'data-target="#xs-components-links-module-GarageModule-31d43ffa980113f7f4b775ad7f90b031b1d08f4628a8837453cd12fb12ca6ca36c0f74fc95f37db28e31efceb9f8b93a80933ee73b6265c4e42a8d0ddc39f0d1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GarageModule-31d43ffa980113f7f4b775ad7f90b031b1d08f4628a8837453cd12fb12ca6ca36c0f74fc95f37db28e31efceb9f8b93a80933ee73b6265c4e42a8d0ddc39f0d1"' :
                                            'id="xs-components-links-module-GarageModule-31d43ffa980113f7f4b775ad7f90b031b1d08f4628a8837453cd12fb12ca6ca36c0f74fc95f37db28e31efceb9f8b93a80933ee73b6265c4e42a8d0ddc39f0d1"' }>
                                            <li class="link">
                                                <a href="components/GarageListPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GarageListPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GarageOnePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GarageOnePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GaragePopoverComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GaragePopoverComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-9a5f54e13a560ae92b199b004cb5a3e82262174b1d8e96e6461afdbdcb4128120ddc5971bf4c02bc75d7097580d3e548263b3dd5d7126d09ff90962343e9eee4"' : 'data-target="#xs-components-links-module-HomeModule-9a5f54e13a560ae92b199b004cb5a3e82262174b1d8e96e6461afdbdcb4128120ddc5971bf4c02bc75d7097580d3e548263b3dd5d7126d09ff90962343e9eee4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-9a5f54e13a560ae92b199b004cb5a3e82262174b1d8e96e6461afdbdcb4128120ddc5971bf4c02bc75d7097580d3e548263b3dd5d7126d09ff90962343e9eee4"' :
                                            'id="xs-components-links-module-HomeModule-9a5f54e13a560ae92b199b004cb5a3e82262174b1d8e96e6461afdbdcb4128120ddc5971bf4c02bc75d7097580d3e548263b3dd5d7126d09ff90962343e9eee4"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InscriptionsModule.html" data-type="entity-link" >InscriptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InscriptionsModule-d2762e157918fd7389af68697426125a444fc46b2202f762cd0663d6074932c4d4a8cf3708dfe90ca5b4ab07fa8e42e9f9e08335706812c872508f993f3fb60d"' : 'data-target="#xs-components-links-module-InscriptionsModule-d2762e157918fd7389af68697426125a444fc46b2202f762cd0663d6074932c4d4a8cf3708dfe90ca5b4ab07fa8e42e9f9e08335706812c872508f993f3fb60d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InscriptionsModule-d2762e157918fd7389af68697426125a444fc46b2202f762cd0663d6074932c4d4a8cf3708dfe90ca5b4ab07fa8e42e9f9e08335706812c872508f993f3fb60d"' :
                                            'id="xs-components-links-module-InscriptionsModule-d2762e157918fd7389af68697426125a444fc46b2202f762cd0663d6074932c4d4a8cf3708dfe90ca5b4ab07fa8e42e9f9e08335706812c872508f993f3fb60d"' }>
                                            <li class="link">
                                                <a href="components/InscriptionsItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InscriptionsItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InscriptionsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InscriptionsPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InscriptionsPopoverComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InscriptionsPopoverComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InscriptionsStateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InscriptionsStateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LikesModule.html" data-type="entity-link" >LikesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LikesModule-a76a050242eb1801fec08f08b1351cf8fc4f460e02bfcfb6199feea6ce4029e5868cfcea2dfbeac38237eb8746a755af15794fb47362b3cb682a5b3c34958d90"' : 'data-target="#xs-components-links-module-LikesModule-a76a050242eb1801fec08f08b1351cf8fc4f460e02bfcfb6199feea6ce4029e5868cfcea2dfbeac38237eb8746a755af15794fb47362b3cb682a5b3c34958d90"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LikesModule-a76a050242eb1801fec08f08b1351cf8fc4f460e02bfcfb6199feea6ce4029e5868cfcea2dfbeac38237eb8746a755af15794fb47362b3cb682a5b3c34958d90"' :
                                            'id="xs-components-links-module-LikesModule-a76a050242eb1801fec08f08b1351cf8fc4f460e02bfcfb6199feea6ce4029e5868cfcea2dfbeac38237eb8746a755af15794fb47362b3cb682a5b3c34958d90"' }>
                                            <li class="link">
                                                <a href="components/LikesPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikesPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyDataModule.html" data-type="entity-link" >MyDataModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MyDataModule-c06ecac24dd49b6bc5a4e1b82581db7c3b96152f3147045c871507cf51c4a00df3fc3a15f7697c7c2af22774db694c5134c2b39d5e199e5f0edc233aa50270f9"' : 'data-target="#xs-components-links-module-MyDataModule-c06ecac24dd49b6bc5a4e1b82581db7c3b96152f3147045c871507cf51c4a00df3fc3a15f7697c7c2af22774db694c5134c2b39d5e199e5f0edc233aa50270f9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyDataModule-c06ecac24dd49b6bc5a4e1b82581db7c3b96152f3147045c871507cf51c4a00df3fc3a15f7697c7c2af22774db694c5134c2b39d5e199e5f0edc233aa50270f9"' :
                                            'id="xs-components-links-module-MyDataModule-c06ecac24dd49b6bc5a4e1b82581db7c3b96152f3147045c871507cf51c4a00df3fc3a15f7697c7c2af22774db694c5134c2b39d5e199e5f0edc233aa50270f9"' }>
                                            <li class="link">
                                                <a href="components/MyDataPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MyDataPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PairingModule.html" data-type="entity-link" >PairingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PairingModule-635b842ca00ba2f9f96deb64afd6c9b98621b1ff6947597443ba78005e4e4347fc5cc3db62ffac339b0b41a6162b0999b1fdc90a1d8f13e38f2782573fedb776"' : 'data-target="#xs-components-links-module-PairingModule-635b842ca00ba2f9f96deb64afd6c9b98621b1ff6947597443ba78005e4e4347fc5cc3db62ffac339b0b41a6162b0999b1fdc90a1d8f13e38f2782573fedb776"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PairingModule-635b842ca00ba2f9f96deb64afd6c9b98621b1ff6947597443ba78005e4e4347fc5cc3db62ffac339b0b41a6162b0999b1fdc90a1d8f13e38f2782573fedb776"' :
                                            'id="xs-components-links-module-PairingModule-635b842ca00ba2f9f96deb64afd6c9b98621b1ff6947597443ba78005e4e4347fc5cc3db62ffac339b0b41a6162b0999b1fdc90a1d8f13e38f2782573fedb776"' }>
                                            <li class="link">
                                                <a href="components/PairingBlockInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PairingBlockInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PairingHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PairingHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PairingModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PairingModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PairingPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PairingPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrivacyPolicyModule.html" data-type="entity-link" >PrivacyPolicyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PrivacyPolicyModule-d0953bc40930d985649f860e7a95bdf679f316dc398ff3319c853ebefe471ce4a67014868827ab5ba70b21575e1540a28c30a126fb79d55544d03b4164885b9b"' : 'data-target="#xs-components-links-module-PrivacyPolicyModule-d0953bc40930d985649f860e7a95bdf679f316dc398ff3319c853ebefe471ce4a67014868827ab5ba70b21575e1540a28c30a126fb79d55544d03b4164885b9b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrivacyPolicyModule-d0953bc40930d985649f860e7a95bdf679f316dc398ff3319c853ebefe471ce4a67014868827ab5ba70b21575e1540a28c30a126fb79d55544d03b4164885b9b"' :
                                            'id="xs-components-links-module-PrivacyPolicyModule-d0953bc40930d985649f860e7a95bdf679f316dc398ff3319c853ebefe471ce4a67014868827ab5ba70b21575e1540a28c30a126fb79d55544d03b4164885b9b"' }>
                                            <li class="link">
                                                <a href="components/PrivacyPolicyPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivacyPolicyPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' : 'data-target="#xs-components-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' :
                                            'id="xs-components-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' }>
                                            <li class="link">
                                                <a href="components/BrandItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CanYouHelpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CanYouHelpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoItemsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoItemsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TournamentItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TournamentItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TournamentsSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TournamentsSliderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WinnerCarItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WinnerCarItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' : 'data-target="#xs-directives-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' :
                                        'id="xs-directives-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' }>
                                        <li class="link">
                                            <a href="directives/CountUpDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CountUpDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' : 'data-target="#xs-injectables-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' :
                                        'id="xs-injectables-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' }>
                                        <li class="link">
                                            <a href="injectables/ActionSheetIonicService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionSheetIonicService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AdmobService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdmobService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AlertService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AnalyticsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalyticsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BrandService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ImageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InscriptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InscriptionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LikeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationsPushService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsPushService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PairingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PairingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoundService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoundService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SettingsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SocialSharingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialSharingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToastIonicService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToastIonicService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ToggleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToggleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TournamentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TournamentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UtilsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VoteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VoteService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/WinnerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WinnerService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' : 'data-target="#xs-pipes-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' :
                                            'id="xs-pipes-links-module-SharedModule-457ac1ffc209fea9826cffecbaa2aa097b50082d67f0240939219d7534d46a68113ac8b417ab2e84cf9c26b775e21c228948b54023878a4976812ffabf366016"' }>
                                            <li class="link">
                                                <a href="pipes/DateToDayOrMonthPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateToDayOrMonthPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/DateToTimeAgoPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateToTimeAgoPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FirstLetterPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FirstLetterPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FlagByFilePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FlagByFilePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ImagePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImagePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/LastRoundPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LastRoundPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MomentDateShortPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MomentDateShortPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MomentFormatAgoPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MomentFormatAgoPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PercentagePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PercentagePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TruncateTextPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TruncateTextPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/VotesPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VotesPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsModule.html" data-type="entity-link" >TabsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsModule-6656187bbf3744f1806c4c9f9cde4a45e791d116360ba12f34ddfe1cb848452a2607c8deeafaadb6d7826ffc177278d8e6f6024854239fbe47838a01466fb614"' : 'data-target="#xs-components-links-module-TabsModule-6656187bbf3744f1806c4c9f9cde4a45e791d116360ba12f34ddfe1cb848452a2607c8deeafaadb6d7826ffc177278d8e6f6024854239fbe47838a01466fb614"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsModule-6656187bbf3744f1806c4c9f9cde4a45e791d116360ba12f34ddfe1cb848452a2607c8deeafaadb6d7826ffc177278d8e6f6024854239fbe47838a01466fb614"' :
                                            'id="xs-components-links-module-TabsModule-6656187bbf3744f1806c4c9f9cde4a45e791d116360ba12f34ddfe1cb848452a2607c8deeafaadb6d7826ffc177278d8e6f6024854239fbe47838a01466fb614"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TournamentModule.html" data-type="entity-link" >TournamentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TournamentModule-dec64313d822a7cfb491678a6152b0c32951e5c5b72d29fe3dca19443c6ab130472e9a9693de78e5c08fe9b174f8d5335b06f0fd98d8720652f864d00e667cd7"' : 'data-target="#xs-components-links-module-TournamentModule-dec64313d822a7cfb491678a6152b0c32951e5c5b72d29fe3dca19443c6ab130472e9a9693de78e5c08fe9b174f8d5335b06f0fd98d8720652f864d00e667cd7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TournamentModule-dec64313d822a7cfb491678a6152b0c32951e5c5b72d29fe3dca19443c6ab130472e9a9693de78e5c08fe9b174f8d5335b06f0fd98d8720652f864d00e667cd7"' :
                                            'id="xs-components-links-module-TournamentModule-dec64313d822a7cfb491678a6152b0c32951e5c5b72d29fe3dca19443c6ab130472e9a9693de78e5c08fe9b174f8d5335b06f0fd98d8720652f864d00e667cd7"' }>
                                            <li class="link">
                                                <a href="components/TournamentInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TournamentInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TournamentMyInscriptionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TournamentMyInscriptionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TournamentPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TournamentPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TournamentRequisitesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TournamentRequisitesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TournamentRoundsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TournamentRoundsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TournamentWinnersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TournamentWinnersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TournamentsModule.html" data-type="entity-link" >TournamentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TournamentsModule-6efb587e76a060c027094a587823f615874449ccc7d7356dd45ee84fb91f9d988c780f9bbabaf1ef0db45962d77efc1e3e35968aa2fa2eeda0884ae4098f873f"' : 'data-target="#xs-components-links-module-TournamentsModule-6efb587e76a060c027094a587823f615874449ccc7d7356dd45ee84fb91f9d988c780f9bbabaf1ef0db45962d77efc1e3e35968aa2fa2eeda0884ae4098f873f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TournamentsModule-6efb587e76a060c027094a587823f615874449ccc7d7356dd45ee84fb91f9d988c780f9bbabaf1ef0db45962d77efc1e3e35968aa2fa2eeda0884ae4098f873f"' :
                                            'id="xs-components-links-module-TournamentsModule-6efb587e76a060c027094a587823f615874449ccc7d7356dd45ee84fb91f9d988c780f9bbabaf1ef0db45962d77efc1e3e35968aa2fa2eeda0884ae4098f873f"' }>
                                            <li class="link">
                                                <a href="components/TournamentsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TournamentsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AccountViewModel.html" data-type="entity-link" >AccountViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthViewModel.html" data-type="entity-link" >AuthViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Brand.html" data-type="entity-link" >Brand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarViewModel.html" data-type="entity-link" >CalendarViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Car.html" data-type="entity-link" >Car</a>
                            </li>
                            <li class="link">
                                <a href="classes/CarsViewModel.html" data-type="entity-link" >CarsViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CarViewModel.html" data-type="entity-link" >CarViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/GarageListViewModel.html" data-type="entity-link" >GarageListViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/GarageOneViewModel.html" data-type="entity-link" >GarageOneViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Header.html" data-type="entity-link" >Header</a>
                            </li>
                            <li class="link">
                                <a href="classes/Image.html" data-type="entity-link" >Image</a>
                            </li>
                            <li class="link">
                                <a href="classes/Inscription.html" data-type="entity-link" >Inscription</a>
                            </li>
                            <li class="link">
                                <a href="classes/InscriptionsViewModel.html" data-type="entity-link" >InscriptionsViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Like.html" data-type="entity-link" >Like</a>
                            </li>
                            <li class="link">
                                <a href="classes/LikesViewModel.html" data-type="entity-link" >LikesViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Literal.html" data-type="entity-link" >Literal</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyDataViewModel.html" data-type="entity-link" >MyDataViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoItemsModel.html" data-type="entity-link" >NoItemsModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pairing.html" data-type="entity-link" >Pairing</a>
                            </li>
                            <li class="link">
                                <a href="classes/PairingViewModel.html" data-type="entity-link" >PairingViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrivacyPolicyViewModel.html" data-type="entity-link" >PrivacyPolicyViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Report.html" data-type="entity-link" >Report</a>
                            </li>
                            <li class="link">
                                <a href="classes/Round.html" data-type="entity-link" >Round</a>
                            </li>
                            <li class="link">
                                <a href="classes/SettingsApp.html" data-type="entity-link" >SettingsApp</a>
                            </li>
                            <li class="link">
                                <a href="classes/SettingsAppDto.html" data-type="entity-link" >SettingsAppDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TabI.html" data-type="entity-link" >TabI</a>
                            </li>
                            <li class="link">
                                <a href="classes/Toggle.html" data-type="entity-link" >Toggle</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tournament.html" data-type="entity-link" >Tournament</a>
                            </li>
                            <li class="link">
                                <a href="classes/TournamentsViewModel.html" data-type="entity-link" >TournamentsViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/TournamentViewModel.html" data-type="entity-link" >TournamentViewModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/Vote.html" data-type="entity-link" >Vote</a>
                            </li>
                            <li class="link">
                                <a href="classes/Winner.html" data-type="entity-link" >Winner</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActionSheetIonicService.html" data-type="entity-link" >ActionSheetIonicService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdmobService.html" data-type="entity-link" >AdmobService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlertService.html" data-type="entity-link" >AlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnalyticsService.html" data-type="entity-link" >AnalyticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BrandService.html" data-type="entity-link" >BrandService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarService.html" data-type="entity-link" >CarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomTranslateLoader.html" data-type="entity-link" >CustomTranslateLoader</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Destroy.html" data-type="entity-link" >Destroy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthService.html" data-type="entity-link" >GoogleAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImageService.html" data-type="entity-link" >ImageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InscriptionService.html" data-type="entity-link" >InscriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LikeService.html" data-type="entity-link" >LikeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LiteralService.html" data-type="entity-link" >LiteralService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link" >LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link" >LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsPushService.html" data-type="entity-link" >NotificationsPushService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PairingService.html" data-type="entity-link" >PairingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegisterService.html" data-type="entity-link" >RegisterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportService.html" data-type="entity-link" >ReportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoundService.html" data-type="entity-link" >RoundService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SettingsService.html" data-type="entity-link" >SettingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocialSharingService.html" data-type="entity-link" >SocialSharingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StartupService.html" data-type="entity-link" >StartupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastIonicService.html" data-type="entity-link" >ToastIonicService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToggleService.html" data-type="entity-link" >ToggleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TournamentService.html" data-type="entity-link" >TournamentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link" >UtilsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VoteService.html" data-type="entity-link" >VoteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WinnerService.html" data-type="entity-link" >WinnerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/BaseUrlInterceptor.html" data-type="entity-link" >BaseUrlInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link" >TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActionForOptionI.html" data-type="entity-link" >ActionForOptionI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthLogInDto.html" data-type="entity-link" >AuthLogInDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthRegisterDto.html" data-type="entity-link" >AuthRegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BrandGetAllBrandsAndCarsDto.html" data-type="entity-link" >BrandGetAllBrandsAndCarsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BrandGetAllDto.html" data-type="entity-link" >BrandGetAllDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarGetAllDto.html" data-type="entity-link" >CarGetAllDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarGetOneDto.html" data-type="entity-link" >CarGetOneDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenericGetAllI.html" data-type="entity-link" >GenericGetAllI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GoogleUserDto.html" data-type="entity-link" >GoogleUserDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IdDto.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IdSiteDto.html" data-type="entity-link" >IdSiteDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageUploadDto.html" data-type="entity-link" >ImageUploadDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InscriptionCreateDto.html" data-type="entity-link" >InscriptionCreateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InscriptionGetAllDto.html" data-type="entity-link" >InscriptionGetAllDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InscriptionGetAllForDriverI.html" data-type="entity-link" >InscriptionGetAllForDriverI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InscriptionGetAllForDriverItemI.html" data-type="entity-link" >InscriptionGetAllForDriverItemI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InscriptionGetAllOfCarDto.html" data-type="entity-link" >InscriptionGetAllOfCarDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InscriptionGetMyCarsUserForInscriptionResponse.html" data-type="entity-link" >InscriptionGetMyCarsUserForInscriptionResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InscriptionsGetMyCarsForInscriptionDto.html" data-type="entity-link" >InscriptionsGetMyCarsForInscriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikeGetAllDto.html" data-type="entity-link" >LikeGetAllDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikeGetAllOfCarDto.html" data-type="entity-link" >LikeGetAllOfCarDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikeGetAllReceivedForUserResponse.html" data-type="entity-link" >LikeGetAllReceivedForUserResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponseI.html" data-type="entity-link" >LoginResponseI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OptionItemI.html" data-type="entity-link" >OptionItemI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginatorI.html" data-type="entity-link" >PaginatorI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReportCreateAutomaticsReportsDto.html" data-type="entity-link" >ReportCreateAutomaticsReportsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReportGetAllDto.html" data-type="entity-link" >ReportGetAllDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReportUpdateDto.html" data-type="entity-link" >ReportUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoundGetAllDto.html" data-type="entity-link" >RoundGetAllDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsAndroidI.html" data-type="entity-link" >SettingsAndroidI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsAppI.html" data-type="entity-link" >SettingsAppI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsCheckUpdateDto.html" data-type="entity-link" >SettingsCheckUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsCheckUpdateI.html" data-type="entity-link" >SettingsCheckUpdateI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsIosI.html" data-type="entity-link" >SettingsIosI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsIsNeedUpdateI.html" data-type="entity-link" >SettingsIsNeedUpdateI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsStateI.html" data-type="entity-link" >SettingsStateI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsVersionCodeI.html" data-type="entity-link" >SettingsVersionCodeI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsVersionI.html" data-type="entity-link" >SettingsVersionI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TournamentCreateDto.html" data-type="entity-link" >TournamentCreateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TournamentGetAllDto.html" data-type="entity-link" >TournamentGetAllDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TournamentGetAllOfAllStatesResponse.html" data-type="entity-link" >TournamentGetAllOfAllStatesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TournamentRequisiteI.html" data-type="entity-link" >TournamentRequisiteI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TournamentUpdateDto.html" data-type="entity-link" >TournamentUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserGetResumeResponse.html" data-type="entity-link" >UserGetResumeResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VoteGetAllOfCarDto.html" data-type="entity-link" >VoteGetAllOfCarDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WinnerGetOfTournamentComplete.html" data-type="entity-link" >WinnerGetOfTournamentComplete</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});