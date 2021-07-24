import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(user: firebase.User) {
    this.db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email,
    }, {merge: true})
  }

  get(uid: string){    
    return this.db.collection('users').doc(uid);
  }
}
