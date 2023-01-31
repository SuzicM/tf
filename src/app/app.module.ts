import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import {AngularMaterialModule} from './angular-material/angular-material.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import {ApiService} from './service/api.service';
import {AuthService} from './service/auth.service';
import {UserService} from './service/user.service';
import {ConfigService} from './service/config.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { PostComponent } from './post/post.component';
import { CreatepostComponent } from './createpost/createpost.component';
import {MatInputModule} from '@angular/material';
import { VoteButtonComponent } from './vote-button/vote-button.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { environment } from '../environments/environment';
import { RecapthcaComponent } from './recapthca/recapthca.component';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    HeaderComponent,
    UserMenuComponent,
    LoginComponent,
    SignUpComponent,
    PostComponent,
    CreatepostComponent,
    VoteButtonComponent,
    UpdateuserComponent,
    ChangepasswordComponent,
    UserdetailsComponent,
    ConfirmComponent,
    RecapthcaComponent,
  ],
  imports: [
    MatInputModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    HomeComponent,
    AuthService,
    ApiService,
    UserService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
