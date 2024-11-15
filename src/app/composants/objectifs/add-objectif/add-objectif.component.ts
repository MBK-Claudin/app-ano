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
    description: new FormControl('', Validators.required),
  });

  responsableForm = new FormGroup({
    responsable: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    organisation: new FormControl('', Validators.required),
    poste: new FormControl('', Validators.required),
  });

  responsableList: {
    responsable: string,
    email: string,
    role: string,
    organisation: string,
    poste: string,
  }[] = [];

  organisationForm = new FormGroup({
    libelle: new FormControl('', Validators.required),
    ancrage: new FormControl('', Validators.required),
  });

  organisationList: {
    libelle: string,
    ancrage: string,
  }[] = [];

  indexResp: any;
  indexOrg: any;

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
      const objectif = this.objectifForm.value.objectif;
      const secteur = this.objectifForm.value.secteur;
      const date_debut = this.objectifForm.value.date_debut;
      const date_fin = this.objectifForm.value.date_fin;
      const description = this.objectifForm.value.description;

      formObjectif.append('objectif', objectif ? objectif.toString() : '');
      formObjectif.append('secteur', secteur ? secteur.toString() : '');
      formObjectif.append('date_debut', date_debut ? date_debut.toString() : '');
      formObjectif.append('date_fin', date_fin ? date_fin.toString() : '');
      formObjectif.append('description', description ? description.toString() : '');

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

  openEditRespModal(id: any){
    const modal = document.getElementById('edit_resp_modal');
    if(modal != null){
      this.indexResp = id;
      this.responsableForm.patchValue({
        responsable: this.responsableList[id].responsable,
        email: this.responsableList[id].email
      })
      modal.style.display = 'block'
    }
  }

  closeEditRespModal(){
    const modal = document.getElementById('edit_resp_modal');
    if(modal != null){
      modal.style.display = 'none'
    }
  }

  openEditOrgModal(id: any){
    const modal = document.getElementById('edit_org_modal');
    if(modal != null){
      this.indexOrg = id;
      this.organisationForm.patchValue({
        libelle: this.organisationList[id].libelle,
        ancrage: this.organisationList[id].ancrage
      })
      modal.style.display = 'block'
    }
  }

  closeEditOrgModal(){
    const modal = document.getElementById('edit_org_modal');
    if(modal != null){
      modal.style.display = 'none'
    }
  }

  EditResponsable(){
    if(this.responsableForm.valid && this.indexResp != null){ 

      this.responsableList[this.indexResp].responsable = this.responsableForm.value.responsable || '';
      this.responsableList[this.indexResp].email = this.responsableForm.value.email || '';
      this.responsableList[this.indexResp].role = this.responsableForm.value.role || '';

      this.responsableForm.reset();
      this.closeEditRespModal();
    }
  }

  EditOrganisation(){
    if(this.organisationForm.valid && this.indexOrg != null){ 

      this.organisationList[this.indexOrg].ancrage = this.organisationForm.value.ancrage || '';
      this.organisationList[this.indexOrg].libelle = this.organisationForm.value.libelle || '';
      
      this.organisationForm.reset();
      this.closeEditOrgModal();
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
      this.organisationForm.reset();
    }
  }

  addUserField() {
    if(this.responsableForm.valid){
      const responsable = {
        responsable: this.responsableForm.value.responsable || '',
        email: this.responsableForm.value.email || '',
        role: this.responsableForm.value.role || '',
        organisation: this.responsableForm.value.organisation || '',
        poste: this.responsableForm.value.poste || ''
      }

      this.responsableList.push(responsable);
      this.responsableForm.reset();
    }
  }

  onUserSelect(event: any) {
    
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);

    if (selectedUser) {
      this.selectedEmail = selectedUser.email;
      this.responsableForm.get('email')?.setValue(this.selectedEmail);

      if (selectedUser.organisations && selectedUser.organisations.length > 0) {
        const organisationNames = selectedUser.organisations.map((org: any) => org.libelle).join(', ');
        const postes = selectedUser.organisations.map((org: any) => org.pivot.poste).join(', ');
  
        this.responsableForm.get('organisation')?.setValue(organisationNames);
        this.responsableForm.get('poste')?.setValue(postes); 
      } else {
        this.responsableForm.get('organisation')?.setValue('Pas d’organisation');
        this.responsableForm.get('poste')?.setValue('Aucun poste');
      }
    }
  }

  removeOrganisationField(index: number) {
    this.organisationList.splice(index, 1);
  }
  
  removeUserField(index: number) {
    this.responsableList.splice(index, 1)
  }


}
