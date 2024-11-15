import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { error } from 'console';

@Component({
  selector: 'app-affectations',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './affectations.component.html',
  styleUrl: './affectations.component.css'
})
export class AffectationsComponent {

  userid: any;
  affectations: any[] = [];
  programmes: any[] = [];
  objectifs: any[] = [];
  activites: any[] = [];
  isAffectaion: boolean = false

  constructor(
    private userService: UserServiceService,
  ){}

  ngOnInit(){
    this.getAffectations()
  }

  getAffectations(){
    this.userid = localStorage.getItem('user_id');
    this.userService.getAffectation(this.userid).subscribe(
      data => {
        this.objectifs = data.objectifs;
        this.programmes = data.programme;
        this.activites = data.activite;

        if(this.programmes.length === 0 && this.objectifs.length === 0 && this.activites.length === 0){
          this.isAffectaion = true
        }
      }, error => {
        console.log(error);
      }
    )
  }

}
