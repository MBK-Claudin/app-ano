import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BudgetAnnuel } from '../../../interfaces/budget-annuel';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';
import { RouterModule } from '@angular/router';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { error } from 'console';

@Component({
  selector: 'app-ptba',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    RouterModule,
  ],
  templateUrl: './ptba.component.html',
  styleUrl: './ptba.component.css'
})
export class PtbaComponent {

  loader = true;
  isSpinner: boolean = false;

  budgetannuel: BudgetAnnuel = {
    id: 0,
    programme_id: 0,
    periode: '',
    date_debut: new Date(),
    date_fin: new Date(),
    excel: new File([''], '')
  }
  budgetannuels: any[] = [];
  Filterbudgetannuels: any[] = [];
  d_periode: any;
  f_periode: any;

  file: File | null = null;
  programme_id: any;
  programmes: any[] = [];
  searchText: string = '';
  
  
  constructor(
    private budgetservice: BudgetannuelServiceService,
    private spinner: NgxSpinnerService,
    private programmeService: ProgrammeServiceService,
  ){}

  ngOnInit(){
    this.getBudget()
    this.getProgrammes();
  }

  getBudget(){
    this.budgetservice.getAllBudget().subscribe(
      data => {
        this.loader = false
        this.budgetannuels = data;
        this.Filterbudgetannuels = data;
      }, error => {
        console.error(error);
      }
    )
  }

  spinnerOpen(){
    if(this.isSpinner){
      this.spinner.show();
    } else {
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
    }
  }

  getProgrammes(){
    this.programmeService.getProgramme().subscribe(
      data => {
        this.programmes = data;
      }, error => {
        console.error('Erreur lors du chargement des programmes !!!!', error);
      }
    )
  }

  insertBudgetAnnuel(){
    this.budgetannuel.programme_id = this.programme_id;
    const date_debut = new Date(this.budgetannuel.date_debut);
    const date_fin = new Date(this.budgetannuel.date_fin);

    if (!isNaN(date_debut.getTime()) && !isNaN(date_fin.getTime())) {
        this.d_periode = date_debut.getFullYear();
        this.f_periode = date_fin.getFullYear();
    } else {
        console.error("Les dates ne sont pas valides.");
    }

    const BudgetAnnuelForm = new FormData()
    BudgetAnnuelForm.append('programme_id', this.budgetannuel.programme_id.toString());
    BudgetAnnuelForm.append('periode', this.d_periode+'-'+this.f_periode);
    BudgetAnnuelForm.append('date_debut', this.budgetannuel.date_debut.toString());
    BudgetAnnuelForm.append('date_fin', this.budgetannuel.date_fin.toString());
    BudgetAnnuelForm.append('excel', this.budgetannuel.excel);
    console.log(BudgetAnnuelForm);
    
    this.isSpinner = true;
    this.spinnerOpen()
    
    this.budgetservice.insertBudgetAnnuel(BudgetAnnuelForm).subscribe(
      data => {
        this.getBudget();
        this.closemodal();
        this.isSpinner = false;
        this.spinnerOpen()
      }, error => {
        console.error(error);
      }
    )

  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.budgetannuel.excel = input.files[0];
    }
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

  filterBugets() {
    this.Filterbudgetannuels = this.budgetannuels.filter(budget => {
        const objectif = budget.programme.libelle ? budget.programme.libelle.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }

}
