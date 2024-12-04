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
  searchText: any = '';


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


  getImpacts(): void {
    if (this.programme_id) {
      this.impactService.getImpacts(this.programme_id).subscribe(
        (data) => {
          // Assurez-vous que data est un tableau
          if (Array.isArray(data)) {
            this.impacts = data.reverse();
            this.impactFilter = [...this.impacts];
            console.log('Missions chargées :', this.impacts);
          } else {
            console.error('Données incorrectes reçues :', data);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des missions', error);
        }
      );
    } else {
      console.error('programme_id is not defined');
    }
  }



  filterimpact() {
    if (this.searchText === '') {
      // Si la recherche est vide, afficher toutes les missions
      this.impactFilter = [...this.impacts];  // Affiche toutes les missions
    } else {
      // Si une recherche est effectuée, filtrer les missions
      this.impactFilter = this.impacts.filter(impact => {
        const libelle = impact.libelle ? impact.libelle.toLowerCase() : '';
        return libelle.includes(this.searchText.toLowerCase());
      });
    }
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

      const impact = new FormData();

      const type = this.impactForm.value.type;
      const libelle = this.impactForm.value.libelle;
      const force = this.impactForm.value.force;
      const taille = this.impactForm.value.taille;
      const mitigation = this.impactForm.value.mitigation;
      const site = this.impactForm.value.site;
      const activite = this.impactForm.value.activite;
      const programme = this.programme_id;


      impact.append('type', type ? type.toString() : '');
      impact.append('libelle', libelle ? libelle.toString() : '');
      impact.append('force', force ? force.toString() : '');
      impact.append('taille', taille ? taille.toString() : '');
      impact.append('mitigation', mitigation ? mitigation.toString() : '');
      impact.append('site', site ? parseInt(site).toString() : '');
      impact.append('activite', activite ? parseInt(activite).toString() : '');
      impact.append('programme', this.programme_id.toString());


      this.impactService.insertImpact(impact).subscribe(
        data => {
          console.log(data);
        }, error => {
          console.log("Erreur lors de l'insertion de l'impact", error);
        }
      )
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
