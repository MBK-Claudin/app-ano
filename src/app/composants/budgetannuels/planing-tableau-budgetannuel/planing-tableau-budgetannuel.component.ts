import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';

@Component({
  selector: 'app-planing-tableau-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './planing-tableau-budgetannuel.component.html',
  styleUrl: './planing-tableau-budgetannuel.component.css'
})
export class PlaningTableauBudgetannuelComponent {
  @Input() activite_id!:number;

  jalons:any[] = [];
  responsables:any[] = [];
  loader = true;
  anos: any[] = [];
  activite: any;

  Data: object[] = [];
  DataII: any[] = [];
  ganttData: Object[] = [];
  DataTable: any[] = [];

  constructor(
    private budgetannuelService: BudgetannuelServiceService,
  ){}

  ngOniInit(){
    this.getActivite();
  }

  getActivite(){
    this.budgetannuelService.getOneActivite(this.activite_id).subscribe(
      data => {
        this.loader = false;
        this.activite = data;
        this.jalons = data.activites;
        this.responsables = data.users;
        this.anos = data.anos;
        this.DataII = this.groupByPhase(this.jalons);
        this.DataTable = this.transformDataTable(this.DataII);
        console.log('Organisation des données', this.DataII);
        console.log('Transmation des données', this.Data);
      }, error => {
        console.log("erreur lors du chargement de l'activité !", error);
      }
    )
  }

  groupByPhase(data: any[]): any {
    return data.reduce((acc, current) => {
      const phaseName = current.phase.libelle;
  
      // Si la phase n'existe pas encore dans l'accumulateur, on la crée
      if (!acc[phaseName]) {
        acc[phaseName] = {
          phase_id: current.phase.id,
          phase_name: phaseName,
          activities: [],
        };
      }
  
      // Ajout de l'activité à la phase correspondante
      acc[phaseName].activities.push({
        id: current.id,
        libelle: current.libelle,
        date_debut: current.date_debut,
        date_fin: current.date_fin,
        budget: current.budget,
      });
  
      return acc;
    }, {});
  }


  transformDataTable(originalData: any): any[] {
    const transformedPhases = [];
  
    // Parcours de chaque phase dans l'objet original
    for (const phaseKey in originalData) {
      if (originalData.hasOwnProperty(phaseKey)) {
        const phase = originalData[phaseKey];
  
        // Création d'un objet pour la phase avec son libellé et ses activités
        const transformedPhase = {
          libelle: phase.phase_name,
          activities: phase.activities.map((activity: any) => ({
            libelle: activity.libelle,
            date_debut: activity.date_debut,
            date_fin: activity.date_fin,
            progress: this.calculateProgress(activity.date_debut, activity.date_fin),
          })),
        };
  
        // Ajout de la phase transformée dans le tableau final
        transformedPhases.push(transformedPhase);
      }
    }
  
    return transformedPhases;
  }

  calculateProgress(dateDebut: string, dateFin: string): number {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const today = new Date();
  
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = today.getTime() - startDate.getTime();
  
    if (totalDuration <= 0) return 100;  // Si la phase est terminée ou a une mauvaise configuration
    const progress = (elapsedDuration / totalDuration) * 100;
    return progress > 100 ? 100 : progress < 0 ? 0 : progress;  // Garde la progression entre 0 et 100
  }

}
