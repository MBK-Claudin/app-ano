import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';
import { error } from 'console';

@Component({
  selector: 'app-details-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './details-budgetannuel.component.html',
  styleUrl: './details-budgetannuel.component.css'
})
export class DetailsBudgetannuelComponent {
  budget_id: any;
  budgets: any;
  programme: any;
  
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
        this.budgets = data.budget;
        this.programme = data.programme;
        console.log('Budget details', this.programme)
      }, error => {
        console.error('Budget error', error);
      }
    )
  }

}
