import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminAuthGuardService } from '../admin-auth-guard.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin: boolean;
  constructor(private db: AngularFirestore, public auth: AuthService, private adminAuthGuardService: AdminAuthGuardService) {
    this.adminAuthGuardService.canActivate().subscribe(data => {
      this.isAdmin = data;
    })
  }

  logout() {
    this.auth.logout();
  }

}
