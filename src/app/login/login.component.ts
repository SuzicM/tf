import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, UserService} from '../service';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operators';
import { User } from '../model/user.model';
interface DisplayMessage {
  msgType: string;
  msgBody: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
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
    captcha : string;
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    username: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.captcha = ''
   }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: DisplayMessage) => {
        this.notification = params;
      });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(32)])]
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    if (this.captcha == ""){
      alert("You must solve the captcha first to be able to log in!")
    } else{
    this.username = this.form.get('username').value
    this.notification = undefined;
    this.submitted = true;
    console.log(this.captcha)
   
    //this.returnUrl = `/${this.username}/home`;
    this.returnUrl = `/home`;

    console.log(this.username);
    console.log(this.returnUrl)
    this.authService.login(this.form.value)
      .subscribe(data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: 'Incorrect username or password.'};
        });
      }
  }
  
  resolved(captcha : string){
    this.captcha = captcha;
  }

}
