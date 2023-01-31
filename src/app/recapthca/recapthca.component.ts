import { Component, EventEmitter, Output,OnInit } from '@angular/core';

@Component({
  selector: 'app-recapthca',
  template: `<re-captcha (resolved)="resolved($event)" siteKey="6Ld9gkAkAAAAAI2F8n1RtY2TVKWKR1ZlBeTKiN_S"></re-captcha>`,
  styleUrls: ['./recapthca.component.css']
})
export class RecapthcaComponent implements OnInit {

  @Output() resolve = new EventEmitter<string>();

  constructor() { }

  captcha : string

  ngOnInit() {
  }

  resolved(captchaResponse: string) {
    this.captcha = "solved"
    this.resolve.emit(this.captcha);
    console.log(`Resolved captcha with response: ${captchaResponse}`);
}

}
