import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObjectifsInterface } from '../../../interfaces/objectifs-interface';
import { DataServiceService } from '../../../services/data-service.service';
import { FormArray, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { error } from 'console';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { RouterModule } from '@angular/router';
import { AddObjectifComponent } from '../add-objectif/add-objectif.component';

@Component({
  selector: 'app-objectif',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AddObjectifComponent,
  ],
  templateUrl: './objectif.component.html',
  styleUrl: './objectif.component.css'
})
export class ObjectifComponent {
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

  testeobjectifs = [{id: 1, name: 'Objectif 1'}, {id: 2, name: 'Objectif 2'}];

  users: any[] =[];
  organisations: any[] = [];
  objectifs: any[] = [];
  filteredObjectifs: any[] = [];
  selectedOrganisation: string = '';
  selectedAncrage: string = '';
  selectedEmail: string = '';
  selectedName: string = '';
  searchTerm: string = '';
  objectifIdToDelete: number = 0;

  constructor(
    private dataService: DataServiceService,
    private objectifService: ObjectifServiceService,
  ){}

  ngOnInit(){
    this.getobjectifs();
    this.filteredObjectifs = this.objectifs;
  }

  test(){
    console.log('ok teste !');
  }

  teste(e: any){
    console.log('ok !!!!!!!!!!!!!!!!!!!!!!!!',e)
  }

  openDeleteModal(id: number) {
    this.objectifIdToDelete = id;
    console.log('ok modal !');
    let deleteModal = document.getElementById('deleteModal');
    if (deleteModal != null){
      //deleteModal.modal('show');
      deleteModal.style.display = 'block';
    }
  }

  // Confirmer et supprimer l'objectif
  deleteObjectif() {
    if (this.objectifIdToDelete !== null) {
      this.objectifs = this.objectifs.filter(item => item.id !== this.objectifIdToDelete);
      //$('#deleteModal').modal('hide'); // Fermer le modal après la suppression
    }
  }

  getobjectifs(){
    this.objectifService.getobjectifs().subscribe(data => {
      this.objectifs = data;
    })
  }

  filterObjectifs() {
    this.filteredObjectifs = this.objectifs.filter(item => 
      item.secteur.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      item.objectif.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
