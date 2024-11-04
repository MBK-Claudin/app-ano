import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnoService } from '../../../services/ano.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { error } from 'console';
import { DataServiceService } from '../../../services/data-service.service';

@Component({
  selector: 'app-add-ano-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-ano-programme.component.html',
  styleUrl: './add-ano-programme.component.css'
})
export class AddAnoProgrammeComponent {
  programme_id: any;
  programme: any;
  composantes: any[] = [];
  souscomposantes: any[] = [];
  activites: any[] = [];
  userid: any;

  anoForm = new FormGroup({
    activite_id: new FormControl('', Validators.required),    
    libelle: new FormControl('', Validators.required),
    budget: new FormControl('', Validators.required)
  })

  responsableForm = new FormGroup({
    responsable: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  })

  responsableList: {
    responsable: string,
    email: string
  }[] = []

  eventForm = new FormGroup({
    libelle: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required)
  })

  eventList: {
    libelle: string,
    date_debut: string,
    date_fin: string
  }[] = []

  titres: string[] = [];
  files: File[] = [];
  fileToAdd: File | null = null;
  titre: string = '';
  users: any[] = [];
  selectedEmail: any;

  constructor(
    private anoService: AnoService,
    private dataService: DataServiceService,
    private programmeService: ProgrammeServiceService,
    private router: ActivatedRoute,
    private location: Location,
  ){}

  ngOnInit(){
    this.programme_id = this.router.snapshot.paramMap.get('id');
    this.getCompoData();
  }

  getCompoData(){
    this.anoService.getCreateData(this.programme_id).subscribe(
      data => {
        this.getProgramme();
        this.getUsers();
        this.composantes = data;
      }, error => {
        console.log('', error)
      }
    )
  }

  onComposantChange(event: any){
    const id = +event.target.value;
    console.log(id);
    const composante = this.composantes.find(c => c.id === id);
    console.log(composante);
    if (composante && composante.souscomposants) {
      this.souscomposantes = composante.souscomposants;
      this.activites = this.souscomposantes.flatMap(souscomposant => souscomposant.activitesbudgetannuel);
      console.log(this.activites);
    } else {
      this.activites = [];
    }
  }

  getProgramme(){
    this.programmeService.selectProgramme(this.programme_id).subscribe(
      data => {
        this.programme = data;
      }, error => {
        console.error(error);
      }
    )
  }

  insertAno(){
    if(this.anoForm.valid){
      
      this.userid = localStorage.getItem('user_id')?.toString();
      const formAno = new FormData();
      const libelle = this.anoForm.value.libelle;
      const budget = this.anoForm.value.budget;
      const activite_id = this.anoForm.value.activite_id;
      formAno.append('user_id', this.userid.toString());
      formAno.append('libelle', libelle ? libelle.toString() : '');
      formAno.append('budget', budget ? budget.toString() : '');
      formAno.append('activite_id', activite_id ? activite_id.toString() : '');

      if(this.eventList.length > 0){
        for(let i = 0; i < this.eventList.length; i++){
          formAno.append('evenement[]', this.eventList[i].libelle);
          formAno.append('date_debut[]', this.eventList[i].date_debut);
          formAno.append('date_fin[]', this.eventList[i].date_fin);
        }
      }

      if(this.responsableList.length > 0){
        for(let j = 0; j < this.responsableList.length; j++){
          formAno.append('responsable[]', this.responsableList[j].responsable);
          formAno.append('email[]', this.responsableList[j].email);
        }
      }

      if(this.files.length > 0){
        for(let k = 0; k < this.files.length; k++){
          formAno.append('documents[]', this.files[k]);
          formAno.append('titres[]', this.titres[k]);
        }
      }

      this.anoService.insertANO(formAno).subscribe(
        data => {
          this.goBack();
        }, error => {
          console.error("Erreur dans l'insertion d'un ano de programme" , error);
        }
      )
    }
  }

  goBack(){
    this.location.back();
  }

  getUsers(){
    this.dataService.getUsers().subscribe(
      data => {
        this.users = data;
      }, error => {
        console.error(error);
      }
    )
  }

  removeUserField(index: number) {
    this.responsableList.splice(index, 1);
  }

  removeEventField(index: number) {
    this.eventList.splice(index, 1);
  }


  onUserSelect(event: any) {
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    if (selectedUser) {
      this.selectedEmail = selectedUser.email;
      this.responsableForm.get('email')?.setValue(this.selectedEmail);
    }
  }

  onFileChange(event: any) {
    this.fileToAdd = event.target.files[0];
    if (this.fileToAdd && this.titre) {
      this.files.push(this.fileToAdd);
      this.titres.push(this.titre);
      this.fileToAdd = null;
      this.titre = '';
      event.target.value = '';
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1); // Supprime le fichier de la liste
    this.titres.splice(index, 1)
  }

  addResponsable(){
    if(this.responsableForm.valid){
      const responsable = {
        responsable: this.responsableForm.value.responsable || '',
        email: this.responsableForm.value.email || ''
      }

      this.responsableList.push(responsable);
      this.responsableForm.reset();
    }
  }

  addEvent(){
    if(this.eventForm.valid){
      const event = {
        libelle: this.eventForm.value.libelle || '',
        date_debut: this.eventForm.value.date_debut || '',
        date_fin: this.eventForm.value.date_fin || ''
      }

      this.eventList.push(event);
    }
  }

  openDocModal(){
    const modal = document.getElementById('add_doc_modal');
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  closeDocModal(){
    const modal = document.getElementById('add_doc_modal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }
  openEventModal(){
    const modal = document.getElementById('add_event_modal');
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  closeEventModal(){
    const modal = document.getElementById('add_event_modal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }

  openResponsableModal(){
    const modal = document.getElementById('add_responsable_modal');
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  closeResponsableModal(){
    const modal = document.getElementById('add_responsable_modal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }


}
