import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-login-check',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './login-check.component.html',
  styleUrl: './login-check.component.css'
})
export class LoginCheckComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(){
    this.loginCheck();
  }

  loginCheck(){
    this.route.queryParams.subscribe(
      params => {
        const token = params['token'];
        const user_id = params['auth'];
        
        if (user_id) {
          localStorage.setItem('uid', user_id);
        }

        if(token){
          localStorage.setItem('token', token);
          this.router.navigate(['/objectif']);
        }
      }
    )
  }
}
