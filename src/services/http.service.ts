import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { environment } from '../.environments/environment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    headers: any;
    options; base_url; userSession: any; auth_token;
    deviceId;

    constructor(public http: Http) {
        this.base_url = environment.base_url;
    }

    public get(url, params?) {
        return this.http.get(environment.base_url + url);
    }
    public post(url, body) {
        console.log('body--------', body);
        return this.http.post(environment.base_url + url, body);
    }
    public put(url, body) {
        return this.http.put(environment.base_url + url, body);
    }
    public delete(url, body) {
        return this.http.delete(environment.base_url + url, body);
    }


}