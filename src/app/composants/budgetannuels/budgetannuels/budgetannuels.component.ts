import { BudgetAnnuel } from './../../../interfaces/budget-annuel';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';

@Component({
  selector: 'app-budgetannuels',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './budgetannuels.component.html',
  styleUrl: './budgetannuels.component.css'
})
export class BudgetannuelsComponent {
  @Input() programme_id!: number;

  budgetannuel: BudgetAnnuel = {
    id: 0,
    programme_id: 0,
    periode: '',
    date_debut: new Date(),
    date_fin: new Date(),
    excel: new File([''], '')
  }
  budgetannuels: any[] = [];

  file: File | null = null;

  constructor(
    private budgetservice: BudgetannuelServiceService,
  ){}

  ngOnInit(){
    this.getBudget()
  }

  getBudget(){
    this.budgetservice.getBudget(this.programme_id).subscribe(
      data => {
        this.budgetannuels = data;
      }, error => {
        console.error(error);
      }
    )
  }

  insertBudgetAnnuel(){
    //this.budgetannuel.periode = this.selectedperiode;
    this.budgetannuel.programme_id = this.programme_id;
    const BudgetAnnuelForm = new FormData()
    BudgetAnnuelForm.append('programme_id', this.budgetannuel.programme_id.toString());
    BudgetAnnuelForm.append('periode', this.budgetannuel.periode);
    BudgetAnnuelForm.append('date_debut', this.budgetannuel.date_debut.toString());
    BudgetAnnuelForm.append('date_fin', this.budgetannuel.date_fin.toString());
    BudgetAnnuelForm.append('excel', this.budgetannuel.excel);
    console.log(BudgetAnnuelForm);

    this.budgetservice.insertBudgetAnnuel(BudgetAnnuelForm).subscribe(
      data => {
        console.log(data);
        const modal = document.getElementById('modal_add');
        if(modal != null){
          modal.style.display = 'none';
        }
      }
    )

  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.budgetannuel.excel = input.files[0];
    }
  }

  test(){
    alert('ok !!!!!!!!!!!!!!!!')
  }

  openmodal(){
    const modal = document.getElementById('modal_add');
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  closemodal(){
    const modal = document.getElementById('modal_add');
    if(modal != null){
      modal.style.display = 'none';
    }
  }

}
