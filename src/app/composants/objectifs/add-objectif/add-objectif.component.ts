import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { ObjectifsInterface } from '../../../interfaces/objectifs-interface';
import { ObjectifServiceService } from '../../../services/objectif-service.service';

@Component({
  selector: 'app-add-objectif',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
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

  constructor(
    private dataService: DataServiceService,
    private objectifService: ObjectifServiceService,
    private location: Location,
  ){}

  ngOnInit(){
    this.getusers()
    this.getorganisations()
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
      this.objectif.organisation.push(this.selectedOrganisation);
      this.objectif.ancrage.push(this.selectedAncrage);
      // Réinitialise les sélections après l'ajout
      this.selectedOrganisation = '';
      this.selectedAncrage = '';
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

  removeOrganisationField(index: number) {
    this.objectif.organisation.splice(index, 1);
    this.objectif.ancrage.splice(index, 1);
  }
  
  removeUserField(index: number) {
    this.objectif.responsable.splice(index, 1);
    this.objectif.email.splice(index, 1);
  }

  insertObjectif(){
    this.objectifService.insertObjectif(this.objectif).subscribe(
      res => {
        console.log('reponses :')
        console.log('response', res);
        this.objectif.secteur = '',
        this.objectif.organisation = [],
        this.objectif.ancrage = []
        this.objectif.responsable = [],
        this.objectif.email = [],
        this.objectif.objectif = '',
        this.objectif.date_debut = new Date,
        this.objectif.date_fin = new Date,
        this.goBack()
      }
    );
  }

}
