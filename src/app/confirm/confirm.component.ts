import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, UserService ,PostService, ApiService, ConfigService} from '../service';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operators';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  title = 'Confirm Account';
  form: FormGroup;
  submitted = false;
  notification: DisplayMessage;

  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  code: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  this.form = this.formBuilder.group({
    confirmationNumber: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(32)])],
  });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    this.code = this.form.get('confirmationNumber').value
    this.submitted = true;
    this.returnUrl = `/home`;
    //this.sendCode(this.code).subscribe()
    this.authService.sendcode(this.form.value).subscribe()
  }

  sendCode(code : string){
    return this.authService.sendcode(code)
  }

}
