import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private spinerService: NgxSpinnerService) {}

  public callSpinner() {
    this.spinerService.show();
  }

  public stopSpinner() {
    this.spinerService.hide();
  }
}
