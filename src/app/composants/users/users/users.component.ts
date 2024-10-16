import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../../services/user-service.service';
import { error } from 'console';
import { UserInterface } from '../../../interfaces/user-interface';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @Input() programme_id!: number;
  users: any[] = [];
  organisations: any[] = [];
  photoPreviewUrl: any;
  isSpinner: boolean = false;

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

  loader = true;

  constructor(
    private userService: UserServiceService,
    private dataService: DataServiceService,
    private spinner: NgxSpinnerService,
  ){}

  ngOnInit(){
    this.getusers();
    this.getOrganisations();
  }

  spinnerOpen(){
    if(this.isSpinner){
      this.spinner.show();
    }else {
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
    }
  }

  insertContributeur(){
    this.contributeur.programme_id = this.programme_id;
    const userform = new FormData();
    userform.append('programme_id', this.programme_id.toString());
    userform.append('name', this.contributeur.name);
    userform.append('email', this.contributeur.email);
    userform.append('role', this.contributeur.role);
    userform.append('organisations', this.contributeur.organisations);
    userform.append('poste', this.contributeur.poste);
    userform.append('photo', this.contributeur.photo);
    console.log(this.contributeur, userform)

    this.isSpinner = true;
    this.spinnerOpen()
    this.userService.insertContributeur(userform).subscribe(
      data => {
        this.loader = true;
        this.getusers();
        this.closemodal();
        this.isSpinner = false;
        this.spinnerOpen();
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
        this.loader = false;
      }, error => {
        console.error('Erreur users / programme', error);
      }
    )
  }

}
