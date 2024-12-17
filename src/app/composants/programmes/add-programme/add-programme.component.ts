import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { Programmes } from '../../../interfaces/programmes';
import { DataServiceService } from '../../../services/data-service.service';
import { Location } from '@angular/common';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { from } from 'rxjs';
import { error } from 'node:console';

@Component({
  selector: 'app-add-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-programme.component.html',
  styleUrl: './add-programme.component.css'
})
export class AddProgrammeComponent {
  loader = true;
  isUser = false;
  isOrganisation = false;

  ancrages = [{libelle: 'Stratégique'}, {libelle: 'Opérationnel'}]

  programmeForm = new FormGroup({
    objectif_id: new FormControl('', Validators.required),
    libelle: new FormControl('', Validators.required),
    objectif_specifique: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  organisationsForm = new FormGroup({
    libelle: new FormControl('', Validators.required),
    ancrage: new FormControl('', Validators.required),
  })

  organisationList: {
    libelle: string,
    ancrage: string,
  }[] = [];

  responsablesForm = new FormGroup({
    responsable: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    organisation: new FormControl('', Validators.required),
    poste: new FormControl('', Validators.required),
  })

  responsableList: {
    responsable: string,
    email: string,
    role: string,
    organisation: string,
    poste: string,
  }[] = [];

  indexResp: any;
  indexOrg: any;

  objectifs: any[] = [];
  users: any[] =[];
  organisations: any[] = [];
  selectedEmail: any;
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

  isLoader(){
    if(this.isUser && this.isOrganisation){
      this.loader = false;
    }
  }

  insertProgrammes(){
    const programme = new FormData()
    if(this.programmeForm.valid){
      const objectif_id = this.programmeForm.value.objectif_id;
      const libelle = this.programmeForm.value.libelle;
      const objectif_specifique = this.programmeForm.value.objectif_specifique;
      const date_debut = this.programmeForm.value.date_debut;
      const date_fin = this.programmeForm.value.date_fin;
      programme.append('objectif_id', objectif_id ? objectif_id.toString() : '');
      programme.append('objectif_specifique', objectif_specifique ? objectif_specifique.toString() : '');
      programme.append('libelle', libelle ? libelle.toString() : '');
      programme.append('date_debut', date_debut ? date_debut.toString() : '');
      programme.append('date_fin', date_fin ? date_fin.toString() : '');

      if(this.responsableList.length > 0){
        for(let i=0; i < this.responsableList.length; i++){
          programme.append('responsable[]', this.responsableList[i].responsable);
          programme.append('email[]', this.responsableList[i].email);
        }
      }

      if(this.organisationList.length > 0){
        for(let i=0; i < this.organisationList.length; i++){
          programme.append('organisation[]', this.organisationList[i].libelle);
          programme.append('ancrage[]', this.organisationList[i].ancrage);
        }
      }

      this.programmeService.insertProgramme(programme).subscribe(
        data =>{
          this.goBack();
        }, error => {
          console.error('erreur insertion de programmes', error);
        }
      )
    }
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

    if(this.organisationsForm.valid){
      const newOrganisation = {
        libelle: this.organisationsForm.value.libelle || '',
        ancrage: this.organisationsForm.value.ancrage || ''
      };
      this.organisationList.push(newOrganisation);
      this.organisationsForm.reset();
    }
  }

  addUserField() {
    if(this.responsablesForm.valid){

      const newResponsable = {
        responsable: this.responsablesForm.value.responsable || '',
        email: this.responsablesForm.value.email || '',
        role: this.responsablesForm.value.role || '',
        organisation: this.responsablesForm.value.organisation || '',
        poste: this.responsablesForm.value.poste || ''
      };

      this.responsableList.push(newResponsable);
      this.responsablesForm.reset();
    }
  }

  onUserSelect(event: any) {
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    console.log(selectedUser);
    if (selectedUser) {
      this.selectedEmail = selectedUser.email;
      this.responsablesForm.get('email')?.setValue(this.selectedEmail);

      if (selectedUser.organisations && selectedUser.organisations.length > 0) {
        const organisationNames = selectedUser.organisations.map((org: any) => org.libelle).join(', ');
        const postes = selectedUser.organisations.map((org: any) => org.pivot.poste).join(', ');

        this.responsablesForm.get('organisation')?.setValue(organisationNames);
        this.responsablesForm.get('poste')?.setValue(postes);
      } else {
        this.responsablesForm.get('organisation')?.setValue('Pas d’organisation');
        this.responsablesForm.get('poste')?.setValue('Aucun poste');
      }

    }
  }

  openEditRespModal(id: any){
    const modal = document.getElementById('edit_resp_modal');

    if(modal != null){
      this.indexResp = id;

      this.responsablesForm.patchValue({
        responsable: this.responsableList[id].responsable,
        email: this.responsableList[id].email,
        role: this.responsableList[id].role
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
      this.organisationsForm.patchValue({
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
    if(this.responsablesForm.valid && this.indexResp != null){

      this.responsableList[this.indexResp].responsable = this.responsablesForm.value.responsable || '';
      this.responsableList[this.indexResp].email = this.responsablesForm.value.email || '';
      this.responsableList[this.indexResp].role = this.responsablesForm.value.role || '';

      this.responsablesForm.reset();
      this.closeEditRespModal();
    }
  }

  EditOrganisation(){
    if(this.organisationsForm.valid && this.indexOrg != null){

      this.organisationList[this.indexOrg].ancrage = this.organisationsForm.value.ancrage || '';
      this.organisationList[this.indexOrg].libelle = this.organisationsForm.value.libelle || '';

      this.organisationsForm.reset();
      this.closeEditOrgModal();
    }
  }

  removeOrganisationField(index: number) {
    this.organisationList.splice(index, 1);
  }

  removeUserField(index: number) {
    this.responsableList.splice(index, 1);
  }

  getObjectif(){
    this.objectifService.getobjectifs().subscribe(
      data => {
        this.objectifs = data;
      }
    )
  }

}
