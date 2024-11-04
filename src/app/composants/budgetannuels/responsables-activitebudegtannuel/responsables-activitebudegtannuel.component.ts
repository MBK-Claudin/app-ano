import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UserServiceService } from '../../../services/user-service.service';
import { error } from 'console';

@Component({
  selector: 'app-responsables-activitebudegtannuel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './responsables-activitebudegtannuel.component.html',
  styleUrl: './responsables-activitebudegtannuel.component.css'
})
export class ResponsablesActivitebudegtannuelComponent {
  @Input() activite_id!:number;

  loader = true;
  users: any[] = [];
  organisations: any[] = [];
  FilterUser: any[] = [];
  photoPreviewUrl: any;

  constructor(
    private userService: UserServiceService,
  ){}

  ngOnInit(){
    this.getUsers()
  }

  insertContributeur(){
      console.log('ok !!!!!!!!!!');
  }

  getUsers(){
    this.userService.getResponsableActivitebudgetannuel(this.activite_id).subscribe(
      data => {
        this.users = data;
        this.FilterUser = data;
      }, error => {
        console.error(error);
      }
    )
  }

  modal(){
    const modal = document.getElementById('addmodal');
    console.log('ok modal !!!!!')
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  closemodal(){
    const modal = document.getElementById('addmodal');

    if(modal != null){
      modal.style.display = 'none';
    }
  }

}
