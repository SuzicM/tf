import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reaction } from '../model/reaction.model';
import { User } from '../model/user2.model';
import { Post } from '../model/post.model';
import { LikeNumber } from '../model/like.model';
import { AuthService, PostService, ApiService, ConfigService } from '../service';
import { HomeComponent } from '../home/home.component';
import * as internal from 'assert';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  expand = false;

  @Input() postId: string;

  @Input() club: string;
  @Input() title: string;

  @Input() author: string;

  @Input() content: string;

  @Input() apiText: string;
  @Input() responseObj: any;
  
  @Output() pid: string;

  upvoted: boolean = false;


  returnUrl: string;
  status: string;
  errorMessage:string
  @Output() apiClick: EventEmitter<any> = new EventEmitter();


  newReaction!:Reaction;
  user!:User;
  newPost!:Post;
  user1!:User;
  posts:Post[]=[]
  username:string;
  displayName: string;
  likes: number;
  listOfUsers: string[]
  likesNumber: LikeNumber

  constructor(    
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private postService: PostService,
    private home: HomeComponent,
    private apiService: ApiService,
    private config: ConfigService
   ) { 
    this.newPost = {
      tweetid: "",
      title: "",
      body: "",
      username: ""
    }
    this.newReaction = {
      tweetid: "",
      username: ""
    }
    this.user = {
      username: '',
      password: '',
      name: '',
      surname: '',
      age: 0,
      gender: '',
      residance: ''
    }
    this.user1 = {
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
    this.postId=this.pid
    this.returnUrl = this.route.snapshot.paramMap.get('name');

    this.username = this.authService.getUsername()
    this.displayName = this.username
    this.home.username = this.username
    this.home.getPosts().subscribe(posts => {
      this.posts = posts
      this.posts.forEach(obj => {
        if (this.title == obj.title){
          this.postId = obj.tweetid
        }
      });
      this.home.getList(this.postId).subscribe( userlist => {
        this.listOfUsers = userlist
      })
      this.home.getLikes(this.postId).subscribe( likes => {
        this.likes = likes.likes
      })
    })
    this.getUser(this.author)
    this.getUser1(this.username) 
    
  }

  getUser(username: String){
    return this.http.get<any>(`http://localhost:8080/api/user/username/${username}/`).subscribe(
      user=> {this.user = user;}
     
    )
  }
  getUser1(username: String){
    return this.http.get<any>(`http://localhost:8080/api/user/username/${username}/`).subscribe(
      user=> {this.user1 = user; }
     
    )
  }


  upvote(){
    if(this.authService.tokenIsPresent())
    {
    this.newReaction.tweetid = this.postId;
    this.newReaction.username = this.authService.getUsername();
    this.postVote(this.newReaction).subscribe(data => {console.log(data);
      this.refresh();})
    }
    else{
      this.router.navigateByUrl('/login');
    }

  }


  postVote(reaction : Reaction){
    return this.postService.likeTweet(reaction.username, reaction.tweetid)
  }

  onButtonClick1(){
    this.home.getList(this.postId).subscribe( userlist => {
      this.listOfUsers = userlist
    })
    console.log(this.listOfUsers)
  }

  onButtonClick2(){
    this.home.getLikes(this.postId).subscribe( likes => {
      this.likes = likes.likes
    })
  }
  
  refresh(): void {
        window.location.reload();
    }
    

  toggleExpand() {
    this.expand = !this.expand;
  }

  responsePanelClass() {
    let classes = ['response'];

    if (this.expand) {
      classes.push('expand');
    }


    return classes.join(' ');
  }

}
