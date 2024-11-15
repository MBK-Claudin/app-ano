import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { AnoService } from '../../../services/ano.service';
import { ActiviteService } from '../../../services/activite.service';
import { GanttModule, TaskFieldsModel } from '@syncfusion/ej2-angular-gantt';
import { error } from 'console';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';
import { ObjectEncodingOptions } from 'fs';
import { AnoBudgetannuelComponent } from '../ano-budgetannuel/ano-budgetannuel.component';
import { JalonBudgetannuelComponent } from '../jalon-budgetannuel/jalon-budgetannuel.component';
import { GanttBudgetannuelComponent } from '../gantt-budgetannuel/gantt-budgetannuel.component';
import { PlaningTableauBudgetannuelComponent } from '../planing-tableau-budgetannuel/planing-tableau-budgetannuel.component';
import { ResponsablesActivitebudegtannuelComponent } from '../responsables-activitebudegtannuel/responsables-activitebudegtannuel.component';

@Component({
  selector: 'app-activite-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GanttModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    AnoBudgetannuelComponent,
    JalonBudgetannuelComponent,
    GanttBudgetannuelComponent,
    PlaningTableauBudgetannuelComponent,
    ResponsablesActivitebudegtannuelComponent,
  ],
  templateUrl: './activite-budgetannuel.component.html',
  styleUrl: './activite-budgetannuel.component.css'
})
export class ActiviteBudgetannuelComponent {
  @ViewChild('doc') documents: any;
  loader = true;
  bool = true;
  jalons:any[] = [];
  responsables:any[] = [];
  anos: any[] = [];

  phases: any[] = [];
  sites: any[] = [];
  nothing: object[] = [];
  activite: any;

  activite_id: any;
  users: any[] = [];
  indexDoc: number = 0;
  indextEvent: number = 0;

  titres: string[] = [];
  files: File[] = [];
  fileToAdd: File | null = null;

  deleteano: any;
  deleteano_id: any;
  userid: any;

  isAnoList: boolean = true;
  isJalonList: boolean = false;
  isGantt: boolean = false;
  isProgressTable: boolean = false;
  
  taskSettings: TaskFieldsModel | undefined;
  Data: object[] = [];
  DataII: any[] = [];
  ganttData: Object[] = [];
  DataTable: any[] = [];
  
  constructor(
    private router: ActivatedRoute,
    private data: DataServiceService,
    private ano: AnoService,
    private activiteService: ActiviteService,
    private budgetannuelService: BudgetannuelServiceService,
  ){}

  ngOnInit(){
    this.activite_id = this.router.snapshot.paramMap.get('id');
    this.indexDoc = 0;
    this.indextEvent = 0;
    this.getActivite();
    this.taskSettings = {id: 'TaskID', name: 'TaskName', startDate: 'StartDate', endDate: 'EndDate', duration: 'Duration', progress: 'Progress', child: 'subtasks' };
  }


  getActivite(){
    this.budgetannuelService.getOneActivite(this.activite_id).subscribe(
      data => {
        this.loader = false;
        this.activite = data;
        this.responsables = data.users;
      }, error => {
        console.log("erreur lors du chargement de l'activité !", error);
      }
    )
  }

  removeFile(index: number) {
    this.files.splice(index, 1); // Supprime le fichier de la liste
  }

}
