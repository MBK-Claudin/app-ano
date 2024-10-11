import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { ObjectifsInterface } from '../../../interfaces/objectifs-interface';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-objectif',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  templateUrl: './add-objectif.component.html',
  styleUrl: './add-objectif.component.css'
})
export class AddObjectifComponent {
  objectif: ObjectifsInterface = {
    id: 0,
    secteur: '',
    objectif: '',
    date_debut: new Date(),
    date_fin: new Date(),
    organisation: [],
    ancrage: [],
    responsable: [],
    email: []
  };

  users: any[] =[];
  organisations: any[] = [];
  selectedOrganisation: string = '';
  selectedAncrage: string = '';
  selectedEmail: string = '';
  selectedName: string = '';
  isAncrageDisabled: boolean = false;
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
    this.isSpinner = true;
    this.openSpinner()
    this.objectifService.insertObjectif(this.objectif).subscribe(
      res => {
        console.log('response', res);
        this.isSpinner = false;
        this.openSpinner()
        this.goBack()
      }
    );
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
    if (this.selectedOrganisation && this.selectedAncrage) {
      this.objectif.organisation.push(this.selectedOrganisation);
      this.objectif.ancrage.push(this.selectedAncrage);
      // Réinitialise les sélections après l'ajout
      this.selectedOrganisation = '';
      this.selectedAncrage = '';
      this.isAncrageDisabled = false;
    }
  }

  addUserField() {
    if (this.selectedEmail && this.selectedName) {
      this.objectif.responsable.push(this.selectedName);
      this.objectif.email.push(this.selectedEmail);
      // Réinitialise les sélections après l'ajout
      this.selectedEmail = '';
      this.selectedName = '';
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
    }
  }

  onOrganisationChange(event: any) {
    const selectedValue = event.target.value;

    if (selectedValue === 'Autre') {
        this.selectedAncrage = 'Autre';
        this.isAncrageDisabled = true;  // Désactive le champ
    } else {
        this.isAncrageDisabled = false; // Active le champ
        this.selectedAncrage = '';  // Réinitialise l'ancrage si nécessaire
    }
  }

  removeOrganisationField(index: number) {
    this.objectif.organisation.splice(index, 1);
    this.objectif.ancrage.splice(index, 1);
  }
  
  removeUserField(index: number) {
    this.objectif.responsable.splice(index, 1);
    this.objectif.email.splice(index, 1);
  }


}
