import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-svgText',
  templateUrl: './SvgText.component.html',
  styleUrls: ['./SvgText.component.scss'],
})
export class SvgTextComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // const element = this.svg;
    // // const bbox = element.getBBox();
    // const bbox = this.text.getBBox();
    // console.log('text here-----', bbox);
    // if (element) {
    //   element.setAttribute('viewBox', [bbox.x, bbox.y, bbox.width + 10, bbox.height].join(' '));
    // }
  }

}
