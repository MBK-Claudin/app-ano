import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SiteService } from '../../services/site.service';
import { error } from 'console';

@Component({
  selector: 'app-site-all',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './site-all.component.html',
  styleUrl: './site-all.component.css'
})
export class SiteAllComponent {
  loader = true;
  sites: any[] = [];
  filterSites: any[] = [];
  site: string = '';
  province: string = '';
  departement: string = '';
  ville: string = '';
  coordonne: string = '';
  commentaire: string = '';
  searchText: string = '';
  nameSite: any;
  idSite: any;



  constructor(
    private siteService: SiteService
  ){}

  ngOnInit(){
    this.getSites();
  }

  getSites(){
    this.siteService.getSite().subscribe(
      data => {
        this.sites = data;
        this.filterSites = data;
        this.loader = false;
        console.log(this.filterSites);
      }, error => {
        console.log(error);
      }
    )
  }

  openDeleteModal(id: any){
    const selectedpro = this.sites.find(site => site.id === id);
    if (selectedpro) {
      this.nameSite = selectedpro.libelle;
      this.idSite = selectedpro.id;
      const modal = document.getElementById('deletemodal');
      if(modal != null){
        modal.style.display = 'block';
      }
    }
  }

  deleteSite(id: any){
    this.siteService.deleteSites(id).subscribe(
      data => {
        this.getSites();
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

  closeaddmodal(){
    const add_modal = document.getElementById('add_modal');
    if(add_modal != null){
      add_modal.style.display = 'none';
    }
  }

  addmodal(){
    const add_modal = document.getElementById('add_modal');
    if(add_modal != null){
      add_modal.style.display = 'block';
    }
  }

  insertSite(){
    let siteForm = new FormData();
    siteForm.append('site', this.site);
    siteForm.append('province', this.province);
    siteForm.append('departement', this.departement);
    siteForm.append('ville', this.ville);
    siteForm.append('coordonnee', this.coordonne);
    siteForm.append('commentaire', this.commentaire);
    console.log(siteForm);

    this.siteService.insertNewSites(siteForm).subscribe(
      data => {
        this.getSites();
        this.closeaddmodal()
      }, error => {
        console.error("Erreur lors de l'insertion du site", error);
      }
    )
  }

  filterSite() {
    this.filterSites = this.sites.filter(site => {
        const objectif = site.libelle ? site.libelle.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }


}
