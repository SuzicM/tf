import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { updateUser } from '../model/updateuser.model';
import { AuthService } from '../service';
interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  updatePasswordForm: FormGroup;
  oldPassword: FormControl;
  newPassword: FormControl;
  cnewPassword: FormControl;
  submitted = false;
  notification: DisplayMessage;
  constructor(private fb: FormBuilder, private authService: AuthService,private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
      this.oldPassword = new FormControl('', [Validators.required]);
      this.newPassword = new FormControl('', [Validators.required]);
      this.cnewPassword = new FormControl('', [Validators.required, this.MustMatch(this.newPassword)]);

      this.updatePasswordForm = this.fb.group({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          cnewPassword: this.cnewPassword
      });
  }

  MustMatch(firstControl: AbstractControl): ValidatorFn {
    return (
        secondControl: AbstractControl
    ): { [key: string]: boolean } | null => {
        if (!firstControl && !secondControl) {
            return null;
        }

        if (secondControl.hasError && !firstControl.hasError) {
            return null;
        }
        if (firstControl.value !== secondControl.value) {
            return { mustMatch: true };
        } else {
            return null;
        }
    };
}

onSubmit() {
  if (this.updatePasswordForm.valid && (this.updatePasswordForm.get("cnewPassword").value != this.updatePasswordForm.get("oldPassword").value)) {
      this.getUser(this.authService.getUsername()).subscribe((result) => {
          if (result.username) {
            console.log(result.username + this.updatePasswordForm.get("cnewPassword").value)
              this.changePass(this.updatePasswordForm.get("cnewPassword").value, this.authService.getUsername()).subscribe(
                  (result) => {
                      this.router.navigate(["/home"]);
                      alert("Password changed successfully");
                  },
                  (error) => alert(error.error.message)
              );
          }
      }
      
      );
  }
  else{
    alert("New password cannot be equal to Old password");
  }


}

changePass(newPassword: string, username: string) {

  return this.http.put<any>(`http://localhost:8080/api/user/changePassword/${username}/`, newPassword);
  
}

getUser(username: string){
  return this.http.get<any>(`http://localhost:8080/api/user/${username}/`);
  
}
}