import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, PostService} from '../service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user3.model';
import {Post} from "../model/post.model";

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})


export class UserdetailsComponent implements OnInit {
  posts: Post[]=[];
  submitted = false;
  usernameUser: string;
  name: string;
  surname: string;
  notification: DisplayMessage;
  form: FormGroup;
  newUser: User;
  username: string;
  returnUrl: string;

  constructor(private postService: PostService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get(`username`);
      this.getUser(this.username).subscribe((responseUser) => {
        console.log(responseUser);
        this.newUser = responseUser[0];
        this.usernameUser = responseUser[0].username;
        this.name = responseUser[0].name;
        this.surname = responseUser[0].surname;
      });
      this.getPosts().subscribe(posts => {
        this.posts = posts;
      });
    });
  }


  putUser(user: User, username: string) {

    return this.http.put<User>(`http://localhost:8080/api/user/${username}/`, user);

  }


  getUser(username: string) {
    return this.http.get<any>(`http://localhost:8080/api/user/${username}/`);
  }

  getPosts() {
    const headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', 'http://localhost:8080');
    return this.http.get<any>(`http://localhost:8080/api/tweet/username/${this.username}/`,{'headers' : headers});
  }

}
