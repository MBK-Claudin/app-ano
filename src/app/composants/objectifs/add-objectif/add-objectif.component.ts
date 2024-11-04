import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { ObjectifsInterface } from '../../../interfaces/objectifs-interface';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-add-objectif',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  templateUrl: './add-objectif.component.html',
  styleUrl: './add-objectif.component.css'
})
export class AddObjectifComponent {


  objectifForm = new FormGroup({
    objectif: new FormControl('', Validators.required),
    secteur: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
  });

  responsableForm = new FormGroup({
    responsable: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  responsableList: {
    responsable: string,
    email: string,
  }[] = [];

  organisationForm = new FormGroup({
    libelle: new FormControl('', Validators.required),
    ancrage: new FormControl('', Validators.required),
  });

  organisationList: {
    libelle: string,
    ancrage: string,
  }[] = [];

  users: any[] =[];
  organisations: any[] = [];
  selectedEmail: string = '';
  isSpinner: boolean = false;

  constructor(
    private dataService: DataServiceService,
    private objectifService: ObjectifServiceService,
    private location: Location,
    private spinner: NgxSpinnerService,
  ){}

  ngOnInit(){
    this.getusers()
    this.getorganisations()
    this.openSpinner()
  }

  
  insertObjectif(){
    
    if(this.objectifForm.valid){
      this.isSpinner = true;
      this.openSpinner();

      const formObjectif = new FormData();
      const objectif = this.objectifForm.value.objectif
      const secteur = this.objectifForm.value.secteur
      const date_debut = this.objectifForm.value.date_debut
      const date_fin = this.objectifForm.value.date_fin

      formObjectif.append('objectif', objectif ? objectif.toString() : '');
      formObjectif.append('secteur', secteur ? secteur.toString() : '');
      formObjectif.append('date_debut', date_debut ? date_debut.toString() : '');
      formObjectif.append('date_fin', date_fin ? date_fin.toString() : '');

      if(this.responsableList.length > 0){
        for(let i = 0; i < this.responsableList.length; i++){
          formObjectif.append('responsable[]', this.responsableList[i].responsable);
          formObjectif.append('email[]', this.responsableList[i].email);
        }
      }

      if(this.organisationList.length > 0){
        for(let j = 0; j < this.organisationList.length; j++){
          formObjectif.append('organisation[]', this.organisationList[j].libelle);
          formObjectif.append('ancrage[]', this.organisationList[j].ancrage);
        }
      }
      
      console.log(formObjectif);

      this.objectifService.insertObjectif(formObjectif).subscribe(
        data => {
          this.isSpinner = false;
          this.objectifForm.reset();
          this.responsableList
          this.openSpinner();
          this.goBack();
        }, error => {
          console.log(error);
          this.isSpinner = false;
          this.openSpinner();
        }
      )
    }
  }

  goBack(){
    this.location.back();
  }

  openOrgModal(){
    const modal = document.getElementById('org_modal');
    if(modal != null){
      modal.style.display = 'block'
    }
  }

  closeOrgModal(){
    const modal = document.getElementById('org_modal');
    if(modal != null){
      modal.style.display = 'none'
    }
  }

  openRespModal(){
    const modal = document.getElementById('resp_modal');
    if(modal != null){
      modal.style.display = 'block'
    }
  }

  closeRespModal(){
    const modal = document.getElementById('resp_modal');
    if(modal != null){
      modal.style.display = 'none'
    }
  }

  openSpinner(){
    if(this.isSpinner){
      this.spinner.show();
    } else {
      setTimeout( () => {
        this.spinner.hide();
      },5000);
    }
  }

  spinnerOpen(){
    console.log('spinner !!!!!!!!!!!!!')
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  getusers(){
    this.dataService.getUsers().subscribe(
      data => {
        this.users = data;
      },error => {
        console.log('Erreur lors du chargement de données !', error)
      }
    )
  }

  getorganisations(){
    this.dataService.getOrganisations().subscribe(
      data => {
        this.organisations = data
      }, error => {
        console.log('Erreur lors du chargement de données !', error)
      }
    )
  }

  addOrganisationField() {
    if(this.organisationForm.valid){
      const organsation = {
        libelle: this.organisationForm.value.libelle || '',
        ancrage: this.organisationForm.value.ancrage || '',
      }

      this.organisationList.push(organsation);
    }
  }

  addUserField() {
    if(this.responsableForm.valid){
      const responsable = {
        responsable: this.responsableForm.value.responsable || '',
        email: this.responsableForm.value.email || ''
      }

      this.responsableList.push(responsable);
    }
  }

  onUserSelect(event: any) {
    console.log(event.target.value);
    const selectedUserName = event.target.value;
    console.log(selectedUserName)
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    console.log(selectedUser.email)
    if (selectedUser) {
      this.selectedEmail = selectedUser.email;
      this.responsableForm.get('email')?.setValue(this.selectedEmail);
    }
  }

  removeOrganisationField(index: number) {
    this.organisationList.splice(index, 1);
    // this.objectif.organisation.splice(index, 1);
    // this.objectif.ancrage.splice(index, 1);
  }
  
  removeUserField(index: number) {
    this.responsableList.splice(index, 1)
    // this.objectif.responsable.splice(index, 1);
    // this.objectif.email.splice(index, 1);
  }


}
