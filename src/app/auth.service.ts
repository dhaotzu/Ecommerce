import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) { 
    this.user$ = this.afAuth.authState;  
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  // checkAppUserAdmin() {
  //   return this.user$.pipe( 
  //     map(user => {
  //       return this.userService.get(user.uid).get().toPromise().then(doc => {
  //         const data: any = doc.data();
  //         if (data.isAdmin) {
  //             return true;
  //         } else {
  //             return false;
  //         }
  //       })
  //     })
  //   )
  // }
}
