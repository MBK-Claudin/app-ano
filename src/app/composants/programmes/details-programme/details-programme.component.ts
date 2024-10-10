import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersComponent } from '../../users/users/users.component';
import { BudgetannuelsComponent } from '../../budgetannuels/budgetannuels/budgetannuels.component';
import { AddAnoComponent } from '../../anos/add-ano/add-ano.component';
import { PlaningGanttComponent } from '../planing-gantt/planing-gantt.component';
import { AnoComponent } from '../../anos/ano/ano.component';
import { SiteComponent } from '../../sites/site/site.component';
import { LivrableComponent } from '../../livrables/livrable/livrable.component';
import { ContractComponent } from '../../contracts/contract/contract.component';

@Component({
  selector: 'app-details-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UsersComponent,
    BudgetannuelsComponent,
    AddAnoComponent,
    PlaningGanttComponent,
    AnoComponent,
    SiteComponent,
    LivrableComponent,
    ContractComponent,
  ],
  templateUrl: './details-programme.component.html',
  styleUrl: './details-programme.component.css'
})

export class DetailsProgrammeComponent {
  detailsProgramme: any;
  organisations: any[] = [];
  responsables: any[] = [];
  id: any;

  constructor(
    private programmeService: ProgrammeServiceService,
    private location: Location,
    private router: ActivatedRoute,
  ){}

  ngOnInit(){
    this.id = this.router.snapshot.paramMap.get('id');
    this.getProgramme();
  }

  goBack(){
    this.location.back();
  }

  getProgramme(){
    this.programmeService.selectProgramme(this.id).subscribe(data => {
      this.detailsProgramme = data;
      this.organisations = data.organisations;
      this.responsables = data.users;
      console.log(data)
    },error => {
      console.error(error);
    });
  }

}
