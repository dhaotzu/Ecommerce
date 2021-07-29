import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }
  
  canActivate() {    
    return this.auth.user$.pipe(
      switchMap(user => {
        // check if user is even logged in
        if (user) { 
          return this.userService.get(user.uid);
        }
        return of(null);
      }),
      map((data: any) => {        
        if (data?.isAdmin) {
          return true;
        }
        return false;        
      })
    )
  }
}
