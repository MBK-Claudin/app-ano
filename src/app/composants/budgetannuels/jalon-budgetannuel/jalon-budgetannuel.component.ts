import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonEngine } from '@angular/ssr';
import { privateDecrypt } from 'crypto';
import { ActiviteService } from '../../../services/activite.service';
import { error } from 'console';
import { DataServiceService } from '../../../services/data-service.service';

@Component({
  selector: 'app-jalon-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './jalon-budgetannuel.component.html',
  styleUrl: './jalon-budgetannuel.component.css'
})
export class JalonBudgetannuelComponent {
  @Input() activite_id!:number;

  jalons:any[] = [];
  jalonFilter: any[] = [];
  sites: any[] = [];
  users: any[] = [];
  phases: any[] = [];

  jalon: string = '';
  JDate_debut: Date | null = null;
  JDate_fin: Date | null = null;
  JResponsable: string = '';
  JEmail: string = '';
  JPhase: string = '';
  JSite: string = '';
  JBudget: number = 0;

  JResponsables: string[] = [];
  JEmails: string[] = [];

  constructor(
    private activiteService: ActiviteService,
    private data: DataServiceService,
  ){}

  ngOnInit(){
    this.getJalon();
    this.getusers();
    this.getSites();
    this.getPhases();
  }

  insertJalon(){
    const jalonFrom = new FormData();

    if(this.jalon && this.JDate_debut && this.JDate_fin && this.JResponsables && this.JEmails){
      jalonFrom.append('activite_id', this.activite_id.toString());
      jalonFrom.append('site', this.JSite);
      jalonFrom.append('phase', this.JPhase);
      jalonFrom.append('libelle', this.jalon);
      jalonFrom.append('date_debut', this.JDate_debut!.toString());
      jalonFrom.append('date_fin', this.JDate_fin!.toString());
      jalonFrom.append('budget', this.JBudget.toString());
  
      for (let i = 0; i< this.JResponsables.length; i++ ){
        jalonFrom.append('responsables[]', this.JResponsables[i]);
        jalonFrom.append('emails[]', this.JEmails[i]);
      }
  
      console.log(jalonFrom);

      this.activiteService.insertActivite(jalonFrom).subscribe(
        data => {
          this.getJalon()
          this.closejalonmodal();
        }, error => {
          console.log(error);
        }
      )

    }
  }

  getJalon(){
    this.activiteService.getJalonActivitebudgetannuel(this.activite_id).subscribe(
      data => {
        this.jalons = data;
        this.jalonFilter = data;
      }, error => {
        console.error("Erreur lors de la recuperation des jalons !!", error);
      }
    )
  }

  closejalonmodal(){
    const modal = document.getElementById('jalonmodal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  jalonmodal(){
    const modal = document.getElementById('jalonmodal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  addResponsable(){
    if(this.JEmail && this.JResponsable){
      this.JResponsables.push(this.JResponsable);
      this.JEmails.push(this.JEmail);
      this.JEmail = '';
      this.JResponsable = ''; 
    }
  }

  removeUserField(index: number) {
    this.JResponsables.splice(index, 1);
    this.JEmails.splice(index, 1);
  }

  getusers(){
    this.data.getUsers().subscribe(
      data => {
        this.users = data;
      }
    )
  }

  getSites(){
    this.activiteService.getSites().subscribe(
      data => {
        this.sites = data;
      }, error => {
        console.log('Erreur lors du chargement des sites !', error);
      }
    )
  }

  getPhases(){
    this.activiteService.getPhases().subscribe(
      data => {
        this.phases = data;
      }, error => {
        console.log('Erreur lors du chargement des phases !', error);
      }
    );
  }

  onUserSelectJalon(event: any) {
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    if (selectedUser) {
      this.JEmail = selectedUser.email;
      this.JResponsable = selectedUser.name;
    }
  }

}
