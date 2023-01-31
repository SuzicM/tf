import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, PostService} from '../service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Community } from '../model/community.model';
import { Post } from '../model/postId.model';
import { Observable } from 'rxjs';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  form: FormGroup;
  expand = false;

  newPost!:Post;
  
  submitted = false;

  notification: DisplayMessage;
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  selectedValue: string;
  username: string;


  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.newPost = {
      title : "",
      body : "",
      username:""
    }
  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');


    this.returnUrl = '/home';
    this.form = this.formBuilder.group({
      title: [''],
      text: [''],
      author_name: ['']
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  postPost(post: Post):Observable<any>{
    return this.authService.createpost(post);
  }

  onSubmit() {
    this.newPost.title = this.form.get('title').value
    //this.newPost.body = this.form.get('title').value
    this.newPost.username = this.username

    console.log(this.newPost.body)

    this.postPost(this.newPost).subscribe(data => {console.log(data);
      this.router.navigate([this.returnUrl]);})
    
  }

}
