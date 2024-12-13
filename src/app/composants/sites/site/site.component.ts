import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site.service';
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent {

  @Input() programme_id!:number;
  sites: any[] = [];
  filtersites: any[] = [];

  site: string = '';
  departement: string = '';
  ville: string = '';
  province: string = '';
  coordonne: string = '';
  commentaire: string = '';
  searchText: string = "";

  constructor(
    private siteService: SiteService
  ){}

  ngOnInit(){
    this.getSites();
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
    siteForm.append('programme_id', this.programme_id.toString());
    siteForm.append('site', this.site);
    siteForm.append('province', this.province);
    siteForm.append('departement', this.departement);
    siteForm.append('ville', this.ville);
    siteForm.append('coordonnee', this.coordonne);
    siteForm.append('commentaire', this.commentaire);
    console.log(siteForm);

    this.siteService.insertSites(siteForm).subscribe(
      data => {
        this.getSites()
        this.closeaddmodal()
      }, error => {
        console.error("Erreur lors de l'insertion du site", error);
      }
    )
  }

  getSites(){
    this.siteService.getProgrammeSite(this.programme_id).subscribe(
      data => {
        this.sites = data.reverse();
        this.filtersites = data;
      }, error => {
        console.error('Erreur lors du chargement des sites !', error);
      }
    );
  }

  filterSite() {
    this.filtersites = this.sites.filter(site => {
        const objectif = site.libelle ? site.libelle.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }

}
