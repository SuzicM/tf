import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { Post } from '../model/post.model';
import { LikeNumber } from '../model/like.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts:Post[];
  likes:LikeNumber
  listOfUsers:String[]

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private http: HttpClient
  ) {
  }

  getPosts() {
    this.http.get<any>(this.config.posts_url).subscribe(
      response =>{
        this.posts = response;
        return this.posts;
      }
    );
    
  }

  getList(id : String) : string[] {
    this.http.get<any>(this.config.list_url+id).subscribe(
      response =>{
        this.listOfUsers = response;
        return this.listOfUsers;
      }
    );
    return
  }

  getLikes(id : String) : number{
    this.http.get<any>(this.config.likes_url+id+"/").subscribe(
      response =>{
        this.likes = response;
        return this.likes.numberOfLike;
      }
    );
    return 
  }

  likeTweet(username: string, id : string){
    return this.http.post<unknown>(this.config.likes_url,{
      tweetid: id,
      username: username,
    }, this.headers())
  }

  sendConfirm(code : string){
    const body = {
      'code': code
    };
    return this.http.post<unknown>(this.config.confrim_url, JSON.stringify(body), this.headers())
  }

  headers(){
    return {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

}
