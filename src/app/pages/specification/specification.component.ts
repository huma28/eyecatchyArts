import { Component, OnInit } from '@angular/core';
import { PictureConfig } from '../../pictureConfig';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss']
})
export class SpecificationComponent implements OnInit {
  paitings: object[];
  constructor() {
    this.paitings = PictureConfig.paitings;
  }

  ngOnInit() {
  }

}
