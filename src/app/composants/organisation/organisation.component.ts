import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OrganisationService } from '../../services/organisation.service';
import { error } from 'console';

@Component({
  selector: 'app-organisation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './organisation.component.html',
  styleUrl: './organisation.component.css'
})
export class OrganisationComponent {

  loader = true;
  organisations: any[] = [];
  filterOrganisation: any[] = [];
  searchText: string = '';
  nameOrg: any;
  idOrg: any;
  organisation: string = '';

  constructor(
    private orgService: OrganisationService
  ){}

  ngOnInit(){
    this.getOrganisation();
  }

  insertOrganisation(){
    if(this.organisation){
      const organisationForm = new FormData();
      organisationForm.append('libelle', this.organisation);
      this.orgService.insertOrganisation(organisationForm).subscribe(
        data => {
          this.getOrganisation();
          this.closeAddModal();
        }, error => {
          console.error(error);
        }
      )
    }
  }

  openAddModal(){
    const modal = document.getElementById('addmodal');
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  closeAddModal(){
    const modal = document.getElementById('addmodal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }

  openDeleteModal(id: any){
    const selectedpro = this.organisations.find(org => org.id === id);
    if (selectedpro) {
      this.nameOrg = selectedpro.libelle;
      this.idOrg = selectedpro.id;
      const modal = document.getElementById('deletemodal');
      if(modal != null){
        modal.style.display = 'block';
      }
    }
  }

  deleteOrganisation(id: any){
    this.orgService.deleteOrganisation(id).subscribe(
      data => {
        this.getOrganisation();
        this.closeDeleteModal()
      }, error => {
        console.log("Erreur lors de la suppression de l'organisation", error)
      }
    )
  }

  closeDeleteModal(){
    const modal = document.getElementById('deletemodal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }

  getOrganisation(){
    this.orgService.getOrganisations().subscribe(
      data => {
        this.organisations = data;
        this.filterOrganisation = data;
        this.loader = false;
      }, error => {
        console.error(error);
      }
    )
  }

  filterOrganisations() {
    this.filterOrganisation = this.organisations.filter(org => {
        const objectif = org.libelle ? org.libelle.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }

}
