import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footer: any = AppConfig.MENUS;
  constructor( @Inject(DOCUMENT) private document: any) { 
  }

  ngOnInit() {
  }
  goTo(url) {
    window.open(url);
    // this.document.location.href = url;
  }
}
