import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { ContectUsComponent } from './pages/contect-us/contect-us.component';
import { SpecificationComponent } from './pages/specification/specification.component';
import { BannerComponent } from './components/banner/banner.component';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
import { MakePaymentComponent } from './modules/payments/make-payment-component';
import { PaymentService } from './modules/payments/payment.service';
// import {PaymentModule} from './modules/payments/PaymentModule';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GalleryComponent,
    AboutUsComponent,
    HomeComponent,
    SpecificationComponent,
    BannerComponent,
    ContectUsComponent,
    MakePaymentComponent,
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireAuthModule,
    // PaymentModule,
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
