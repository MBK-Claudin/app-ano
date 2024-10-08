import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';
import { error } from 'console';
import { PlaningGanttComponent } from '../../programmes/planing-gantt/planing-gantt.component';

@Component({
  selector: 'app-details-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './details-budgetannuel.component.html',
  styleUrl: './details-budgetannuel.component.css'
})
export class DetailsBudgetannuelComponent {
  budget_id: any;
  budgets: any;
  programme: any;
  loader = true;
  
  constructor(
    private router: ActivatedRoute,
    private budgetservice: BudgetannuelServiceService
  ){}

  ngOnInit(){
    this.budget_id = this.router.snapshot.paramMap.get('id');
    this.getDetailBudget()
  }

  getDetailBudget(){
    this.budgetservice.getDetails(this.budget_id).subscribe(
      data => {
        this.loader = false;
        this.budgets = data.budget;
        this.programme = data.programme;
      }, error => {
        console.error('Budget error', error);
      }
    )
  }

}
