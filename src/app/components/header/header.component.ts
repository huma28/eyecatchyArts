import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ShoppingCartService } from 'services/shoppingCart.service';
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
 
  button={
    buttonText:"Book Now",
    borderColor: "#e8e1d8",
    textColor: "#FEC051",
  }

  constructor(public router: Router,  public shoppingCartService: ShoppingCartService) { 
     this.headers = AppConfig.MENUS;

     this.subscription = this.shoppingCartService.getSubjectForCart().subscribe(message => { 
       this.cartCount = message.value;
      });
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
    let list = this.shoppingCartService.getProductList();
    this.cartCount = list.length;
  }

}
