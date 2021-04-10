import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { UserComponent } from './shared/components/layout-header/user/user.component';
import { LayoutFooterComponent } from './shared/components/layout-footer/layout-footer.component';

// Services
import { AuthService } from "./shared/services/auth.service";
import { LocalStorageService } from "./shared/services/localstorage.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
    GameComponent,

		SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    DashboardComponent,
		
    LayoutHeaderComponent,
    StadiaComponent,
    SearchComponent,
    UserComponent,
    LayoutFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [
		AuthService,
		AngularFirestore,
		AngularFireStorage,
		LocalStorageService
	],
  bootstrap: [AppComponent]
})

export class AppModule { }