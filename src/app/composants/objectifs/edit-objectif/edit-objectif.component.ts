import { ObjectifServiceService } from './../../../services/objectif-service.service';
import { CommonModule } from '@angular/common';
import { ObjectifsInterface } from './../../../interfaces/objectifs-interface';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataServiceService } from '../../../services/data-service.service';

@Component({
  selector: 'app-edit-objectif',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-objectif.component.html',
  styleUrl: './edit-objectif.component.css'
})
export class EditObjectifComponent {
    id: any;

    objectifForm = new FormGroup({
      objectif: new FormControl('', Validators.required),
      secteur: new FormControl('', Validators.required),
      date_debut: new FormControl('', Validators.required),
      date_fin: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  
    responsableForm = new FormGroup({
      responsable: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      organisation: new FormControl('', Validators.required),
      poste: new FormControl('', Validators.required),
    });
  
    responsableList: {
      responsable: string,
      email: string,
      role: string,
      organisation: string,
      poste: string,
    }[] = [];
  
    organisationForm = new FormGroup({
      libelle: new FormControl('', Validators.required),
      ancrage: new FormControl('', Validators.required),
    });
  
    organisationList: {
      libelle: string,
      ancrage: string,
    }[] = [];
  
    indexResp: any;
    indexOrg: any;

    selectedOrganisation: string = '';
    selectedAncrage: string = '';
    selectedEmail: string = '';
    selectedName: string = '';

    users: any[] =[];
    organisations: any[] = [];
    editorganisarion:any[] = [];
    editusers: any[] = [];

    isAncrageDisabled: boolean = false;

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

    openOrgModal(){
      const modal = document.getElementById('org_modal');
      if(modal != null){
        modal.style.display = 'block'
      }
    }


    closeDeleteModal(){
      const modal = document.getElementById('deletemodal');
      if(modal != null){
        modal.style.display = 'none'
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

    submitEditObjectif(){
      alert("objectif edit !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      // this.objectifService.editObjectif(this.editObjectif).subscribe(data => {
      //   this.goBack()
      // });
    }

    removeOrganisationField(index: number) {
      this.organisationList.splice(index, 1);
    }
    
    removeUserField(index: number) {
      this.responsableList.splice(index, 1);
    }

    addOrganisationField() {
      if(this.organisationForm.valid){
        const organsation = {
          libelle: this.organisationForm.value.libelle || '',
          ancrage: this.organisationForm.value.ancrage || '',
        }
  
        this.organisationList.push(organsation);
        this.organisationForm.reset();
      }
    }
  
    addUserField() {
      if(this.responsableForm.valid){
        const responsable = {
          responsable: this.responsableForm.value.responsable || '',
          email: this.responsableForm.value.email || '',
          role: this.responsableForm.value.role || '',
          organisation: this.responsableForm.value.organisation || '',
          poste: this.responsableForm.value.poste || ''
        }
  
        this.responsableList.push(responsable);
        this.responsableForm.reset();
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

    openEditRespModal(id: any){
      const modal = document.getElementById('edit_resp_modal');
      if(modal != null){
        this.indexResp = id;
        this.responsableForm.patchValue({
          responsable: this.responsableList[id].responsable,
          email: this.responsableList[id].email
        })
        modal.style.display = 'block'
      }
    }

    openEditOrgModal(id: any){
      const modal = document.getElementById('edit_org_modal');
      if(modal != null){
        this.indexOrg = id;
        this.organisationForm.patchValue({
          libelle: this.organisationList[id].libelle,
          ancrage: this.organisationList[id].ancrage
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

    EditResponsable(){
      if(this.responsableForm.valid && this.indexResp != null){ 
  
        this.responsableList[this.indexResp].responsable = this.responsableForm.value.responsable || '';
        this.responsableList[this.indexResp].email = this.responsableForm.value.email || '';
        this.responsableList[this.indexResp].role = this.responsableForm.value.role || '';
  
        this.responsableForm.reset();
        this.closeEditRespModal();
      }
    }

    EditOrganisation(){
      if(this.organisationForm.valid && this.indexOrg != null){ 
  
        this.organisationList[this.indexOrg].ancrage = this.organisationForm.value.ancrage || '';
        this.organisationList[this.indexOrg].libelle = this.organisationForm.value.libelle || '';
        
        this.organisationForm.reset();
        this.closeEditOrgModal();
      }
    }

    closeEditOrgModal(){
      const modal = document.getElementById('edit_org_modal');
      if(modal != null){
        modal.style.display = 'none'
      }
    }

    getSelectObjectif(){
      this.objectifService.selectEditObjectif(this.id).subscribe(
        data => {
          this.editorganisarion = data.organisations;
          this.editusers = data.users;
          this.objectifForm.get('secteur')?.setValue(data.secteur);
          this.objectifForm.get('objectif')?.setValue(data.objectif);
          this.objectifForm.get('description')?.setValue(data.description);
          this.objectifForm.get('date_debut')?.setValue(data.date_debut);
          this.objectifForm.get('date_fin')?.setValue(data.date_fin);

          for(let i = 0; i < this.editusers.length; i++){
            const resp = {
              responsable: this.editusers[i].name,
              email: this.editusers[i].email,
              role: this.editusers[i].name,
              organisation: this.editusers[i].name,
              poste: this.editusers[i].name,
            }

            this.responsableList.push(resp);
          }

          for(let i = 0; i < this.editorganisarion.length; i++){
            const org = {
              libelle: this.editorganisarion[i].libelle,
              ancrage: this.editorganisarion[i].pivot.ancrage,
            }

            this.organisationList.push(org);
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
