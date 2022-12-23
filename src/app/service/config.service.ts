import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _api_url = 'http://localhost:8080/api';

  private _user_url = this._api_url + '/user/';

  private _tweets_url = this._api_url + '/tweet/';

  private _likes_url = this._tweets_url + 'like/';

  private _list_url = this._tweets_url + 'list/';

  private _login_url = this._user_url + 'login/';

  private _logout_url = this._user_url + 'logout/';

  private _posts_url = this._tweets_url + 'username/';

  private _community_url = this._api_url + '/community/'



  get community_url(): string {
    return this._community_url;
  }

  get posts_url(): string {
    return this._posts_url;
  }

  get likes_url(): string {
    return this._likes_url;
  }

  get list_url(): string {
    return this._list_url;
  }

  get login_url(): string {
    return this._login_url;
  }

  get tweets_url(): string {
    return this._tweets_url + 'usernames/tweet/';
  }

  get logout_url(): string {
    return this._logout_url;
  }


  private _users_url = this._user_url + 'user/';

  get users_url(): string {
    return this._users_url;
  }
  
  private _signup_url = this._user_url + 'register/';

  get signup_url(): string {
    return this._signup_url;
  }

}
