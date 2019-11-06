import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../.environments/environment';
import { UrlHandlingStrategy } from '@angular/router/src/url_handling_strategy';

@Injectable()
export class FormSubmitService {
    constructor (
        public http: HttpService) { }

    getDetail(id){
        return this.http.get(`/products/${id}`)
        .map(res => res.json());
    }
    sendMail(body) {
        console.log('hey send email here-', body);
        return this.http.post('email', body)
        // .map(res => res.json());
    }
}