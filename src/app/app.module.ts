import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { FormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { ContectUsComponent } from './pages/contect-us/contect-us.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { SpecificationComponent } from './pages/specification/specification.component';
import { BannerComponent } from './components/banner/banner.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { ButtonComponent } from 'app/components/button/button.component';
// import * as firebase from 'firebase';

import { AwesomeShopService } from '../services/awesomeShope.service';
import { HttpService } from '../services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FirebaseService } from './app.firebase.service';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from 'services/shoppingCart.service';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
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
    ButtonComponent,
    DetailComponent,
    CartComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    FormsModule,
    NgxGalleryModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    // BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
            AwesomeShopService,
            HttpService,
            FirebaseService,
            AuthService,
            ShoppingCartService,
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
