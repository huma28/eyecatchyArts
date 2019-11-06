import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ShoppingCartService } from 'services/shoppingCart.service';
import { FirebaseService } from '../../app.firebase.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headers: object[];
  public isCollapsed: boolean;
  cartCount = 0;
  subscription: Subscription;
  subscriptionUserData: Subscription;
  userDetail:any;
 
  button={
    buttonText:"Book Now",
    borderColor: "#e8e1d8",
    textColor: "#FEC051",
  }

  constructor(public router: Router,  public shoppingCartService: ShoppingCartService, public firebaseService:FirebaseService) { 
     this.headers = AppConfig.MENUS;

     this.subscription = this.shoppingCartService.getSubjectForCart().subscribe(item => { 
       item.list.valueChanges().subscribe(item => {
        this.cartCount = item.length;
      });

      
      });
      this.subscriptionUserData = this.firebaseService.getUserDataObservable().subscribe(item => { 
       this.userDetail = item;

       })

  }
  navLinkClicked() {
    let collapse1 = document.getElementById('navbar-collapse-1');
    let collapse2 = document.getElementById('navbar-collapse-2');
    collapse1 && collapse1.classList.remove('in');
    collapse2 && collapse2.classList.remove('in');
      var elmnt = document.getElementById("contentUs");
      elmnt.scrollIntoView({
        behavior: 'smooth'
      });
  }

  ngOnInit() {
    this.isCollapsed = true;
    // let list = this.shoppingCartService.getProductList();
    // list.valueChanges().subscribe(item => {
    //   console.log('hey products', item);
    // });
    let userData = this.firebaseService.getUserData();
    // console.log('user data-----', list, userData);
    // this.cartCount = list.length;
  }
}
