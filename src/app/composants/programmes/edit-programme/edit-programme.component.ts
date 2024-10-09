import { ProgrammeServiceService } from './../../../services/programme-service.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Programmes } from '../../../interfaces/programmes';
import { DataServiceService } from '../../../services/data-service.service';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-edit-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './edit-programme.component.html',
  styleUrl: './edit-programme.component.css'
})
export class EditProgrammeComponent {
  id: any;
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
  editobjectifs: any[] = [];
  editusers: any[] =[];
  editorganisations: any[] = [];
  selectedOrganisation: string = '';
  selectedAncrage: string = '';
  selectedEmail: string = '';
  selectedName: string = '';

  constructor(
    private programmeServiceService: ProgrammeServiceService,
    private dataService: DataServiceService,
    private objectifservice: ObjectifServiceService,
    private location: Location,
    private router: ActivatedRoute
  ){}

  ngOnInit(){
    this.id = this.router.snapshot.paramMap.get('id');
    this.getusers();
    this.getorganisations();
    this.getObjectif();
    this.getselectPtogramme();
  }

  editProgramme(){
    this.programmeServiceService.editProgramme(this.programmes).subscribe(
      data => {
        console.log(data);
        this.goBack();
      }, error => {
        console.log('Erreur lors de la modification', error);
      }
    )
  }

  getselectPtogramme(){
    this.programmeServiceService.selectProgramme(this.id).subscribe(
      data => {
        console.log('edit programme : ', data);
        this.programmes.id = data.id;
        this.programmes.libelle = data.libelle;
        this.programmes.date_debut = data.date_debut;
        this.programmes.date_fin = data.date_fin;
        this.programmes.objectif_id = data.objectif_id;
        this.editobjectifs = data.objectif;
        this.editorganisations = data.organisations;
        this.editusers = data.users;

        for(let i = 0; i < this.editorganisations.length; i++){
          this.programmes.organisation.push(this.editorganisations[i].libelle);
          this.programmes.ancrage.push(this.editorganisations[i].pivot.ancrage);
        }

        for(let i = 0; i < this.editusers.length; i++){
          this.programmes.responsable.push(this.editusers[i].name);
          this.programmes.email.push(this.editusers[i].email);
        }
      }
    )
  }

  
  removeOrganisationField(index: number) {
    this.programmes.organisation.splice(index, 1);
    this.programmes.ancrage.splice(index, 1);
  }
  
  removeUserField(index: number) {
    this.programmes.responsable.splice(index, 1);
    this.programmes.email.splice(index, 1);
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

  addOrganisationField() {
    if (this.selectedOrganisation && this.selectedAncrage) {
      this.programmes.organisation.push(this.selectedOrganisation);
      this.programmes.ancrage.push(this.selectedAncrage);
      // Réinitialise les sélections après l'ajout
      this.selectedOrganisation = '';
      this.selectedAncrage = '';
    }
  }

  getObjectif(){
    this.objectifservice.getobjectifs().subscribe(
      data => {
        this.objectifs = data;
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
}
