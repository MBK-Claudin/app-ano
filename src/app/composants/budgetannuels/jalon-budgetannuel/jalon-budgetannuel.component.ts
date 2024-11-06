import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    ReactiveFormsModule,
  ],
  templateUrl: './jalon-budgetannuel.component.html',
  styleUrl: './jalon-budgetannuel.component.css'
})
export class JalonBudgetannuelComponent {
  @Input() activite_id!:number;

  jalonForm = new FormGroup({
    site: new FormControl('', Validators.required),
    phase: new FormControl('', Validators.required),
    libelle: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
    budget: new FormControl('', Validators.required),
    responsable: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  })

  JResponsable: any;
  JEmail: any;

  jalons:any[] = [];
  jalonFilter: any[] = [];
  sites: any[] = [];
  users: any[] = [];
  phases: any[] = [];



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
    if(this.jalonForm.valid){
      this.activiteService.insertActivite(this.jalonForm).subscribe(
        data => {
          this.closejalonmodal();
          this.getJalon()
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
