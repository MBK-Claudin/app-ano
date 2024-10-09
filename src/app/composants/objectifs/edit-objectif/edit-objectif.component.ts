import { ObjectifServiceService } from './../../../services/objectif-service.service';
import { CommonModule } from '@angular/common';
import { ObjectifsInterface } from './../../../interfaces/objectifs-interface';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataServiceService } from '../../../services/data-service.service';

@Component({
  selector: 'app-edit-objectif',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

  ],
  templateUrl: './edit-objectif.component.html',
  styleUrl: './edit-objectif.component.css'
})
export class EditObjectifComponent {
    id: any;
    editObjectif: ObjectifsInterface = {
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

    
    selectedOrganisation: string = '';
    selectedAncrage: string = '';
    selectedEmail: string = '';
    selectedName: string = '';

    users: any[] =[];
    organisations: any[] = [];
    editorganisarion:any[] = [];
    editusers: any[] = [];

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private objectifService: ObjectifServiceService,
      private dataService: DataServiceService,
    ){}

    ngOnInit(){
      this.id = this.route.snapshot.paramMap.get('id');
      this.getSelectObjectif();
      this.getorganisations();
      this.getusers()
    }

    submitEditObjectif(){
      this.objectifService.editObjectif(this.editObjectif).subscribe(data => {
        console.log(data)
      });
      
      this.goBack()
    }

    removeOrganisationField(index: number) {
      this.editObjectif.organisation.splice(index, 1);
      this.editObjectif.ancrage.splice(index, 1);
    }
    
    removeUserField(index: number) {
      this.editObjectif.responsable.splice(index, 1);
      this.editObjectif.email.splice(index, 1);
    }

    addOrganisationField() {
      if (this.selectedOrganisation && this.selectedAncrage) {
        this.editObjectif.organisation.push(this.selectedOrganisation);
        this.editObjectif.ancrage.push(this.selectedAncrage);
        // Réinitialise les sélections après l'ajout
        this.selectedOrganisation = '';
        this.selectedAncrage = '';
      }
    }
  
    addUserField() {
      if (this.selectedEmail && this.selectedName) {
        this.editObjectif.responsable.push(this.selectedName);
        this.editObjectif.email.push(this.selectedEmail);
        // Réinitialise les sélections après l'ajout
        this.selectedEmail = '';
        this.selectedName = '';
      }
    }

    onUserSelect(event: any) {
      const selectedUserName = event.target.value;
      console.log(selectedUserName)
      const selectedUser = this.users.find(user => user.name === selectedUserName);
      console.log(selectedUser.email)
      if (selectedUser) {
        this.selectedEmail = selectedUser.email;
      }
    }

    getSelectObjectif(){
      this.objectifService.selectObjectif(this.id).subscribe(
        data => {
          this.editorganisarion = data.organisations;
          this.editusers = data.users;
          this.editObjectif.id = data.id;
          this.editObjectif.secteur = data.secteur;
          this.editObjectif.objectif = data.objectif;
          this.editObjectif.date_debut = data.date_debut;
          this.editObjectif.date_fin = data.date_fin;

          for(let i = 0; i < this.editusers.length; i++){
            this.editObjectif.responsable.push(this.editusers[i].name);
            this.editObjectif.email.push(this.editusers[i].email);
          }

          for(let i = 0; i < this.editorganisarion.length; i++){
            this.editObjectif.organisation.push(this.editorganisarion[i].libelle);
            this.editObjectif.ancrage.push(this.editorganisarion[i].pivot.ancrage);
          }
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
