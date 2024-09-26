import { BudgetAnnuel } from './../../../interfaces/budget-annuel';
import { Component, Input } from '@angular/core';
import { execFile } from 'child_process';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgrammeServiceService } from '../../../services/programme-service.service';

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
  selectedperiode = '';

  file: File | null = null;

  constructor(
    private programmeService: ProgrammeServiceService
  ){}

  ngOnInit(){}

  insertBudgetAnnuel(){
    //this.budgetannuel.periode = this.selectedperiode;
    this.budgetannuel.programme_id = this.programme_id;
    console.log(this.budgetannuel);

    this.programmeService.insertBudgetAnnuel(this.budgetannuel).subscribe(
      data => {
        console.log(data);
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
