import { Component, OnInit, Output } from '@angular/core';
import {UserService} from '../service/user.service';
import {ConfigService} from '../service/config.service';
import { AuthService, PostService } from '../service';
import { Post } from '../model/post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
// @ts-ignore
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { OuterSubscriber } from 'rxjs/internal-compatibility';
import { User } from '../model/user2.model';

@Component({
    selector: 'app-home',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {



    posts: Post[]=[];
    user!:User;
    author_name: String;
    communityName: String;
    username: string;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {
        this.user = {
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
        console.log("asd")
        /*this.route.paramMap.subscribe((params: ParamMap) => {
          this.getPosts().subscribe(posts => {
          this.posts = posts

          this.username=this.getUsername();
        })
        });
    */
    }

    makeRequest() {


    }

    getUser(username: String){
        return this.http.get<any>(`http://localhost:8080/api/user/${username}`).subscribe(
            user=> {this.user = user;}

        )
    }

    getPosts() {
        const headers= new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*');
        return this.http.get<any>(`http://localhost:8080/api/post/`,{'headers' : headers});
    }

    getUsername(){
        return this.authService.getUsername();
    }



}
