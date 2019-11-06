import { FirebaseService } from './app.firebase.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private firebaseService: FirebaseService) { }

  canActivate() {
    if  ( this.firebaseService.isLoggedIn() ) {

      return true;

    }

    this.router.navigate(['login']);
    return false;
  }

}
