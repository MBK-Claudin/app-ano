import { ProgrammeServiceService } from './../../../services/programme-service.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Programmes } from '../../../interfaces/programmes';
import { DataServiceService } from '../../../services/data-service.service';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'console';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-edit-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-programme.component.html',
  styleUrl: './edit-programme.component.css'
})
export class EditProgrammeComponent {
  id: any;
  loader = true;

  ancrages = [{libelle: 'Stratégique'}, {libelle: 'Opérationnel'}]

  programmeForm = new FormGroup({
    objectif_id: new FormControl('', Validators.required),
    libelle: new FormControl('', Validators.required),
    objectif_specifique: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
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
  editobjectifs: any[] = [];
  editusers: any[] =[];
  editorganisations: any[] = [];
  selectedOrganisation: string = '';
  selectedAncrage: string = '';
  selectedEmail: string = '';
  selectedName: string = '';
  isAncrageDisabled: boolean = false;

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

  SubmitEditProgramme(){
    // this.programmeServiceService.editProgramme(this.programmes).subscribe(
    //   data => {
    //     console.log(data);
    //     this.goBack();
    //   }, error => {
    //     console.log('Erreur lors de la modification', error);
    //   }
    // )
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

  EditOrganisation(){
    if(this.organisationsForm.valid && this.indexOrg != null){ 

      this.organisationList[this.indexOrg].ancrage = this.organisationsForm.value.ancrage || '';
      this.organisationList[this.indexOrg].libelle = this.organisationsForm.value.libelle || '';
      
      this.organisationsForm.reset();
      this.closeEditOrgModal();
    }
  }

  closeEditRespModal(){
    const modal = document.getElementById('edit_resp_modal');
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

  getselectPtogramme(){
    this.programmeServiceService.selectEditProgramme(this.id).subscribe(
      data => {

        this.programmeForm.get('libelle')?.setValue(data.libelle);
        this.programmeForm.get('objectif_specifique')?.setValue(data.objectif_specifique);
        this.programmeForm.get('description')?.setValue(data.description_objectif_specifique);
        this.programmeForm.get('date_debut')?.setValue(data.date_debut);
        this.programmeForm.get('date_fin')?.setValue(data.date_fin);
        this.editobjectifs = data.objectif;
        this.editorganisations = data.organisations;
        this.editusers = data.users;

        for(let i = 0; i < this.editorganisations.length; i++){
          const org = {
            libelle: this.editorganisations[i].libelle,
            ancrage: this.editorganisations[i].pivot.ancrage
          }

          this.organisationList.push(org);
        }

        for(let i = 0; i < this.editusers.length; i++){

          const resp = {
            responsable: this.editusers[i].name,
            email: this.editusers[i].email,
            role: this.editusers[i].pivot.role,
            organisation: this.editusers[i].email,
            poste: this.editusers[i].email,
          }

          this.responsableList.push(resp);
        }

        this.loader = false;
      }
    )
  }

  
  removeOrganisationField(index: number) {
    this.organisationList.splice(index, 1);
  }
  
  removeUserField(index: number) {
    this.responsableList.splice(index, 1);
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
