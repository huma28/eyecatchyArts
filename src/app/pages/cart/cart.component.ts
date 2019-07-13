import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ShoppingCartService } from 'services/shoppingCart.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  headers: object[];
  public isCollapsed: boolean;
  cartCount = 0;
  cartList: Subscription;
  list:any;
  button={
    buttonText:"Book Now",
    borderColor: "#e8e1d8",
    textColor: "#FEC051",
  }

  constructor(public router: Router,  public shoppingCartService: ShoppingCartService) { 
     this.headers = AppConfig.MENUS;

     this.cartList = this.shoppingCartService.getSubjectForCart().subscribe(message => { 
        this.cartCount = message.value;
        // this.list = message.list;
        console.log('huma-----------------------', this.list); 
      });
    //  console.log('in header-----', this.shoppingCartService.subjectValue );
    //  this.shoppingCartService.subjectValue.subscribe((subjectValue: any) => {
    //   console.log('hey subject working', subjectValue);
    //   this.cartCount = subjectValue;
    //   // this.lastSyncData = abc;
    //   // this.userData = JSON.parse(localStorage.getItem("currentUser"));
    // });
  }
  navLinkClicked() {
    let collapse1 = document.getElementById('navbar-collapse-1');
    let collapse2 = document.getElementById('navbar-collapse-2');
    collapse1.classList.remove('in');
    collapse2.classList.remove('in');
  }

  ngOnInit() {
    this.isCollapsed = true;
    this.list = this.shoppingCartService.getProductList();
  }

}
