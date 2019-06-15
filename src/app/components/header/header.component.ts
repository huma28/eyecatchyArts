import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headers: object[];
  public isCollapsed: boolean;
 
  button={
    buttonText:"Book Now",
    borderColor: "#e8e1d8",
    textColor: "#FEC051",
  }

  constructor(public router: Router) { 
     this.headers = AppConfig.MENUS;
  }

  ngOnInit() {
    this.isCollapsed = true;
  }

}
