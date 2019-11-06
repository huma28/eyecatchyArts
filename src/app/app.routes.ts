// Import our dependencies
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SpecificationComponent } from './pages/specification/specification.component';
import { ContectUsComponent } from './pages/contect-us/contect-us.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth-guard.service';
// Define which component should be loaded based on the current URL
export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'gallery',
        component: GalleryComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'about-us',
        component: AboutUsComponent,
        // canActivate: [AuthGuard]
    },
     {
        path: 'specification',
        component: SpecificationComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'contect-us',
        component: ContectUsComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'detail/:id',
        component: DetailComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'cart',
        canActivate: [AuthGuard],
        component: CartComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'payment',
        component: PaymentComponent,
    },
    {   path: '', 
        redirectTo: '/home', 
        pathMatch: 'full'
    },
];