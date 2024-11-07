import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImpactService } from '../services/impact.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-impacts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './impacts.component.html',
  styleUrls: ['./impacts.component.css'],
})
export class ImpactsComponent implements OnInit {
  @Input() programme_id!: number;
  impacts: any[] = [];
  sites: any;

  constructor(private impactService: ImpactService,
       private siteService: SiteService
  ) {}

  ngOnInit() {
    this.getImpacts();
  }

  getImpacts() {
    this.impactService.getImpacts(this.programme_id).subscribe(

      (data) => {

        this.impacts = Array.isArray(data) ? data : [data];// Affecte les données récupérées à la variable impacts
        console.log('impacts :', this.impacts);
        console.log('programme:',this.programme_id)
      },
      (error) => {
        console.log('Erreur lors du chargement des impacts', error);  // Affiche une erreur en cas de problème
      }
    );
  }

  openmodal(){
    const modal = document.getElementById('modale');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  //avoir la liste
  getSites(){
    this.siteService.getProgrammeSite(this.programme_id).subscribe(
      data => {
        this.sites = data;
      }, error => {
        console.error('Erreur lors du chargement des sites !', error);
      }
    );
  }
}
