import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ShoppingCartService } from 'services/shoppingCart.service';
import { Subscription } from 'rxjs/Subscription';
import { ButtonComponent } from 'app/components/button/button.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  // headers: object[];
  // public isCollapsed: boolean;
  // cartCount = 0;
  // cartList: Subscription;
  list:any;
  // button={
  //   buttonText:"Book Now",
  //   borderColor: "#e8e1d8",
  //   textColor: "#FEC051",
  // }

  constructor(public router: Router,  public shoppingCartService: ShoppingCartService) { 
    //  this.headers = AppConfig.MENUS;

    //  this.cartList = this.shoppingCartService.getSubjectForCart().subscribe(message => { 
    //     this.cartCount = message.value;
    //     console.log('here cart', message);
    //   });
  }

  ngOnInit() {
    // this.isCollapsed = true;
    this.list = this.shoppingCartService.getProductList();
    console.log('cart list ---', this.list);
  }

}
