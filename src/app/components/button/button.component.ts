import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @Input() text: string;
    @Input() border: string;
    @Input() textColor: string;
    
  constructor() { 
    //  this.banners = PictureConfig.banners;
  }

  ngOnInit() {
  }


}
