import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImpactService } from '../services/impact.service';
import { SiteService } from '../services/site.service';
import { error } from 'node:console';

@Component({
  selector: 'app-impacts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './impacts.component.html',
  styleUrls: ['./impacts.component.css'],
})
export class ImpactsComponent implements OnInit {
  @Input() programme_id!: number;

  impacts: any[] = [];
  impactFilter: any[] = [];
  activite: any[] = [];
  sites: any;

  impactForm = new FormGroup({
    type: new FormControl('', Validators.required),
    libelle: new FormControl('', Validators.required),
    force: new FormControl('', Validators.required),
    taille: new FormControl('', Validators.required),
    mitigation: new FormControl('', Validators.required),
    site: new FormControl('', Validators.required),
    activite: new FormControl('', Validators.required),
  })

  constructor(
    private impactService: ImpactService,
    private siteService: SiteService
  ) {}

  ngOnInit() {
    this.getImpacts();
    this.getSites();
    this.getActiviteBudgetAnnuel();
  }

  getImpacts() {
    this.impactService.getImpacts(this.programme_id).subscribe(
      data => {
        this.impacts = data;
      },
      error => {
        console.log('Erreur lors du chargement des impacts', error);
      }
    );
  }

  openmodal(){
    const modal = document.getElementById('modale');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  getSites(){
    this.siteService.getSite().subscribe(
      data => {
        this.sites = data;
      }, error => {
        console.error('Erreur lors du chargement des sites !', error);
      }
    );
  }

  insertImpact(){
    if(this.impactForm.valid){
      console.log('insertion impacts !!!!!!!!');
    }
  }
  
  getActiviteBudgetAnnuel(){
    this.impactService.getAcitviteProgramme(this.programme_id).subscribe(
      data => {
        this.activite = data;
      }, error => {
        console.error('Erreur lors du chargement des activités !', error);
      }
    )
  }

  closeModal(){
    const modal = document.getElementById('add_impact');
    if(modal != null){
      modal.style.display = 'none';
    }
  }

  openModal(){
    const modal = document.getElementById('add_impact');
    if(modal != null){
      modal.style.display = 'block';
    }
  }
}
