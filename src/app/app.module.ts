import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Reactive Form
import { ReactiveFormsModule } from "@angular/forms";

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StoreComponent } from './components/store/store.component';
import { GameComponent } from './components/game/game.component';
import { SettingsComponent } from './components/settings/settings.component';

// Authentication Components
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Header and Footer Components
import { LayoutHeaderComponent } from './shared/components/layout-header/layout-header.component';
import { StadiaComponent } from './shared/components/layout-header/stadia/stadia.component';
import { SearchComponent } from './shared/components/layout-header/search/search.component';
import { LayoutFooterComponent } from './shared/components/layout-footer/layout-footer.component';

// Services
import { AuthService } from "./shared/services/auth.service";
import { StadiaGamesService } from './components/store/stadia-games.service';
import { LocalStorageService } from "./shared/services/localstorage.service";

// Other Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
    GameComponent,
    SettingsComponent,

		SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    DashboardComponent,
		
    LayoutHeaderComponent,
    StadiaComponent,
    SearchComponent,
    LayoutFooterComponent
  ],
  imports: [
		BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
		AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    MatSlideToggleModule  
  ],
  providers: [
		AuthService,
		AngularFirestore,
		AngularFireStorage,
		StadiaGamesService,
		LocalStorageService
	],
	exports: [
		MatSlideToggleModule
	],
  bootstrap: [AppComponent]
})

export class AppModule { }