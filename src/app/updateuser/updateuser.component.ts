import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService, PostService} from '../service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Community } from '../model/community.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { updateUser } from '../model/updateuser.model';
import { User } from '../model/user3.model';
interface DisplayMessage {
  msgType: string;
  msgBody: string;
}
@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  submitted = false;
  notification: DisplayMessage;
  form: FormGroup;
  newUser!:User;
  username: string;
  returnUrl: string;
  constructor(    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private _Activatedroute:ActivatedRoute) { 
      this.newUser = {
        username: '',
        password: '',
        name: '',
        surname: '',
        age: 0,
        gender: '',
        residance: ''
      }
    }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get(`username`) || ""
      this.getUser(this.username).subscribe(newUser => {
      this.newUser = newUser})
    }); 
    this.username = this.route.snapshot.paramMap.get('username');

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.form = this.formBuilder.group({
      display_name: [''],
      description: ['']
    });
  }
  onSubmit() {
    /*this.newUser.display_name =this.form.get('display_name').value
    this.newUser.description =this.form.get('description').value*/
    console.log(this.username);
    this.putUser(this.newUser,this.username).subscribe(data =>{console.log(data);this.router.navigate([this.returnUrl]);})
  }

  putUser(user:User, username: string) {

    return this.http.put<User>(`http://localhost:8080/api/user/${username}/`,user);
    
  }



  getUser(username: string){
    return this.http.get<User>(`http://localhost:8080/api/user/username/${username}/`);
    
  }

}
