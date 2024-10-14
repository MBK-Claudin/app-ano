import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { Programmes } from '../../../interfaces/programmes';
import { DataServiceService } from '../../../services/data-service.service';
import { Location } from '@angular/common';
import { ProgrammeServiceService } from '../../../services/programme-service.service';

@Component({
  selector: 'app-add-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './add-programme.component.html',
  styleUrl: './add-programme.component.css'
})
export class AddProgrammeComponent {
  loader = true;
  isUser = false;
  isOrganisation = false;
  programmes: Programmes = {
    id: 0,
    objectif_id: 0,
    libelle: '',
    date_debut: new Date(),
    date_fin: new Date(),
    organisation: [],
    ancrage: [],
    responsable: [],
    email: []
  }

  objectifs: any[] = [];
  users: any[] =[];
  organisations: any[] = [];
  selectedOrganisation: string = '';
  selectedAncrage: string = '';
  selectedEmail: string = '';
  selectedName: string = '';
  isAncrageDisabled: boolean = false;

  constructor(
    private objectifService: ObjectifServiceService,
    private dataService: DataServiceService,
    private programmeService: ProgrammeServiceService,
    private location: Location,
  ){}

  ngOnInit(){
    this.getObjectif();
    this.getusers();
    this.getorganisations();
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

  isLoader(){
    if(this.isUser && this.isOrganisation){
      this.loader = false;
    }
  }

  insertProgrammes(){
    this.programmeService.insertProgramme(this.programmes).subscribe(
      data => {
        console.log('reponse insertion de programmes', data)
        this.goBack()
      }, error => {
        console.log('erreur insertion de programmes', error);
      }
    )
  }

  goBack(){
    this.location.back();
  }

  getusers(){
    this.dataService.getUsers().subscribe(
      data => {
        this.isUser = true;
        this.users = data;
      },error => {
        console.log('Erreur lors du chargement de données !', error)
      }
    )
  }

  getorganisations(){
    this.dataService.getOrganisations().subscribe(
      data => {
        this.isOrganisation = true;
        this.organisations = data
      }, error => {
        console.log('Erreur lors du chargement de données !', error)
      }
    )
  }

  addOrganisationField() {
    if (this.selectedOrganisation && this.selectedAncrage) {
      this.programmes.organisation.push(this.selectedOrganisation);
      this.programmes.ancrage.push(this.selectedAncrage);
      // Réinitialise les sélections après l'ajout
      this.selectedOrganisation = '';
      this.selectedAncrage = '';
      this.isAncrageDisabled = false;
    }
  }

  addUserField() {
    if (this.selectedEmail && this.selectedName) {
      this.programmes.responsable.push(this.selectedName);
      this.programmes.email.push(this.selectedEmail);
      // Réinitialise les sélections après l'ajout
      this.selectedEmail = '';
      this.selectedName = '';
    }
  }

  onUserSelect(event: any) {
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    if (selectedUser) {
      this.selectedEmail = selectedUser.email;
    }
  }

  removeOrganisationField(index: number) {
    this.programmes.organisation.splice(index, 1);
    this.programmes.ancrage.splice(index, 1);
  }
  
  removeUserField(index: number) {
    this.programmes.responsable.splice(index, 1);
    this.programmes.email.splice(index, 1);
  }

  getObjectif(){
    this.objectifService.getobjectifs().subscribe(
      data => {
        this.objectifs = data;
      }
    )
  }

}
