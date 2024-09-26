import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../../services/user-service.service';
import { error } from 'console';
import { UserInterface } from '../../../interfaces/user-interface';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @Input() programme_id!: number;
  users: any[] = [];
  organisations: any[] = [];
  photoPreviewUrl: any;

  contributeur: UserInterface = {
    id: 0,
    programme_id: this.programme_id,
    name: '',
    email: '',
    photo: new File([''], ''),
    role: '',
    organisations: '',
    poste: '',
  }



  constructor(
    private userService: UserServiceService,
    private dataService: DataServiceService
  ){}

  ngOnInit(){
    this.getusers();
    this.getOrganisations();
  }

  test(){
    alert('Ok !!!!!!!!!!!!!!!!!')
  }

  insertContributeur(){
    this.contributeur.programme_id = this.programme_id;
    const userform = new FormData();
    userform.append('programme_id', this.programme_id.toString());
    userform.append('name', this.contributeur.name);
    userform.append('email', this.contributeur.email);
    userform.append('role', this.contributeur.role);
    userform.append('orgranisations', this.contributeur.organisations);
    userform.append('poste', this.contributeur.poste);
    userform.append('photo', this.contributeur.photo)
    console.log(this.contributeur, userform)
    this.userService.insertContributeur(this.contributeur).subscribe(
      data => {
        console.log(data);
        const modal = document.getElementById('edit_modal');

        if(modal != null){
          modal.style.display = 'none';
        }

      }
    );
  }

  getOrganisations(){
    this.dataService.getOrganisations().subscribe(
      data => {
        this.organisations = data;
      }
    )
  }

  modal(){
    const modal = document.getElementById('edit_modal');

    if(modal != null){
      modal.style.display = 'block';
    }
  }
  closemodal(){
    const modal = document.getElementById('edit_modal');

    if(modal != null){
      modal.style.display = 'none';
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.photoPreviewUrl = e.target.result;
        };
        reader.readAsDataURL(file);
        this.contributeur.photo = file, file.name;
    }
  }


  getusers(){
    this.userService.getUsers(this.programme_id).subscribe(
      data => {
        this.users = data;
        console.log('users / programme', data)
      }, error => {
        console.error('Erreur users / programme', error);
      }
    )
  }

}
