import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserService } from '../service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  title = 'Sign up';
  form: FormGroup;

  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;

  /**
   * Notification message from received
   * form request or router
   */
  notification: DisplayMessage;

  returnUrl: string;
  captcha :string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.captcha = ''
  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: DisplayMessage) => {
        this.notification = params;
      });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ||'/home';
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      name: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
      surname: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
      age: ['', Validators.compose([Validators.required, Validators.maxLength(3)])],
      residance: ['', Validators.compose([Validators.required, Validators.maxLength(32)])],
      gender: ['', Validators.compose([Validators.required, Validators.maxLength(6)])]
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  onSubmit() {
    if (this.captcha == ""){
      alert("You must solve the captcha first to be able to sign up!")
    } else{
    this.notification = undefined;
    this.submitted = true;

    this.authService.signup(this.form.value)
      .subscribe(data => {
        console.log(data);
        this.router.navigate([this.returnUrl]);
      },
        error => {
          this.submitted = false;
          console.log('Sign up error');
          this.notification = { msgType: 'error', msgBody: error['error'].message };
        });
      }

  }

  resolved(captcha : string){
    this.captcha = captcha;
  }


}
