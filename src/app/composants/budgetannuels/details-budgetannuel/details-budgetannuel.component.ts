import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';
import { error } from 'console';
import { PlaningGanttComponent } from '../../programmes/planing-gantt/planing-gantt.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    FormsModule,
  ],
  templateUrl: './details-budgetannuel.component.html',
  styleUrl: './details-budgetannuel.component.css'
})
export class DetailsBudgetannuelComponent {
  budget_id: any;
  budgets: any = [];
  filterBudgets: any = [];
  programme: any;
  loader = true;
  nameActivite: any;
  idActivite: any;
  searchText: string = '';
  
  
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
        this.filterBudgets = data.budget;
        this.programme = data.programme;
        console.log(this.budgets);
      }, error => {
        console.error('Budget error', error);
      }
    )
  }

  closeDeleteModal(){
    const modal = document.getElementById('deletemodal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }

  
  

  deleteProgramme(id: any){
    this.budgetservice.deleteActivite(id).subscribe(
      data => {
        this.getDetailBudget();
        this.closeDeleteModal()
      }, error => {
        console.log("Erreur lors de la suppression de l'objectif", error)
      }
    )
  }



  /**
   *   filterActivites() {
    this.filterBudgets = this.budgets.filter(budget => {
        const objectif = budget.libelle ? budget.libelle.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }
   */

}
