import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ShoppingCartService } from 'services/shoppingCart.service';
import { Subscription } from 'rxjs/Subscription';
import { ButtonComponent } from 'app/components/button/button.component';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormSubmitService } from 'services/formSubmit.service';
import { ToasterService } from 'services/toaster.service';
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

  constructor(public router: Router,  public shoppingCartService: ShoppingCartService, public db: AngularFireDatabase, public formSubmitService: FormSubmitService, private toasterService: ToasterService) { 
    //  this.headers = AppConfig.MENUS;

    //  this.cartList = this.shoppingCartService.getSubjectForCart().subscribe(message => { 
    //     this.cartCount = message.value;
    //     console.log('here cart', message);
    //   });
  }

  paintingForm = {
    name: '',
    email: '',
    phone: '',
    pincode: '',
    houseNo: '',
    colony: '',
    landMark: '',
    city: '',
    state: '',
    address: '',
    paintingName: '',
    dateMsg: '',
  }
  paintingRequestList: AngularFireList<any>;

  ngOnInit() {
    // this.isCollapsed = true;
    // this.list = this.shoppingCartService.getProductList();
    // console.log('cart list ---', this.list);

    this.getPaintingRequestList();
  }
  getPaintingRequestList() {
    this.paintingRequestList = this.db.list('paintingRequestList');
    // console.log('painting list---------', this.paintingRequestList);
    return this.paintingRequestList;
  }
  onSubmit() {
    // this.paintingForm.paintingName = this.paintingData.name;
    const date = new Date();
    this.paintingForm.dateMsg = date.toString();

    console.log('submit---', this.paintingForm );
    this.paintingRequestList.push(
      this.paintingForm
    ).then((data) =>{
      console.log('successfull');
     let body = {
        customerEmail: this.paintingForm.email,
        name: this.paintingForm.name,
        paintingName: this.paintingForm.paintingName,
        subject: "your painting request to eyecatchyArts",
        text: 'We received your request and will contact you soon.'
     }
      let  email = this.formSubmitService.sendMail(body);
     console.log('mail Send---- on payment email', email);
     email.subscribe((data) => {
        console.log('response-------email', data);
        this.toasterService.showSuccess('Yourorder confirm and sent an email');
        this.router.navigate(['gallery']);
        this.shoppingCartService.removeAllItem();
      },
      (error) => {
        this.toasterService.showError('Something went wrong');
      }
    );
    });
    // this.formDataSaved = true;
  }
}
