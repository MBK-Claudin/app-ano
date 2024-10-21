import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  user: any;
  uid = localStorage.getItem('uid');

  constructor(
    private authService: AuthService,
    private route: Router
  ){}

  ngOnInit(){
    this.getAuthUser();
  }

  logout(){
    this.authService.logout();
    this.route.navigate(['/login']);
  }

  getAuthUser(){
    this.authService.getAuthUser(this.uid).subscribe(
      data => {
        this.user = data.user;
        localStorage.setItem('user_id', this.user.id);
      }, error => {
        console.log('Erreur authentification user :', error);
      }
    )
  }

}
