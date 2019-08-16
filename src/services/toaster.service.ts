import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class ToasterService {

  constructor(public toastr: ToastsManager) { }

  showToasters(msg, type) {
    if (type == "success") {
      // this.toastr.success(msg, type,);
      this.toastr.success('You are awesome!', 'Success!', {positionClass: 'toast-bottom-right'})
    // .then((toast) => {
    //     // DO some stuff here
    //     // and based on the condition dismiss the toast
    //         // this.toastr.dismissToast(toast);
    //         // this.toastr.
    // });
    }
    else {
      this.toastr.error(msg);
    }
  }

  showSuccess(message) {
      console.log('on succuss', message);
    this.toastr.success(message, '', {positionClass: 'toast-bottom-right'});
  }

  showError(message) {
    this.toastr.error(message);
  }
}


