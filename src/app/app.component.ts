import { Component, ViewContainerRef, ViewChild, Input } from '@angular/core';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import {FirebaseService} from './app.firebase.service';
import { element } from '../../node_modules/protractor';
import { AuthService } from '../services/auth.service';
import * as jwt from 'jsonwebtoken';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

interface photos {
  url?: string;
  name?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  autocompleteInput: string;

  data = [];
  // details: any;
  items: any;
  @Input() adressType: string;
  @ViewChild('addresstext') addresstext: any;
  constructor(private router: Router,
    private firebaseService:FirebaseService,
    private authService: AuthService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,) {
    //   const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
    //     algorithm: 'RS256',
    //     expiresIn: 120,
    // });
    this.toastr.setRootViewContainerRef(vcr);
    this.authService.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImV5ZWNhdGNoeSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxMDAwfQ.1rBRMaHGtyhwR4rwlv2mA4vhqZimepu8r8LsdgrS4Fw');
      
  }

  ngOnInit() {
    console.log('token--------', this.authService.isTokenExpired());
  
    // setTimeout(() => {
    //   if (!this.authService.isTokenExpired()) {
    //   console.log('not expire');
    //     // return true;
    //   } else {
    //     console.log('expire');
    //   }
    // }, 0);
    // setTimeout(() => { console.log('now expire') , 300000})
   
    var x = this.firebaseService.getBanner();
    x.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.data.push(y);
      })
      // console.log('item-----', this.data);
    })

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });

  }
  ngAfterViewInit() {
  }

  title = 'app';
}
