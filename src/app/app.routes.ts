// Import our dependencies
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SpecificationComponent } from './pages/specification/specification.component';
import { ContectUsComponent } from './pages/contect-us/contect-us.component';
// Define which component should be loaded based on the current URL
export const routes: Routes = [
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
    {   path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' },
];