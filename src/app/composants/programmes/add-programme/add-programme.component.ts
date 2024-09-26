import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { Programmes } from '../../../interfaces/programmes';
import { DataServiceService } from '../../../services/data-service.service';
import { Location } from '@angular/common';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { error } from 'node:console';

@Component({
  selector: 'app-add-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './add-programme.component.html',
  styleUrl: './add-programme.component.css'
})
export class AddProgrammeComponent {
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
      this.programmes.organisation.push(this.selectedOrganisation);
      this.programmes.ancrage.push(this.selectedAncrage);
      // Réinitialise les sélections après l'ajout
      this.selectedOrganisation = '';
      this.selectedAncrage = '';
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
    console.log(event.target.value);
    const selectedUserName = event.target.value;
    console.log(selectedUserName)
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    console.log(selectedUser.email)
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
