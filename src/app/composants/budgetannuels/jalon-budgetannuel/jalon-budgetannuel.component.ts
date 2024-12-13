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
  @Input() id!:number;
  statut!:'en cours';


  JResponsable: any;
  JEmail: any;

  jalons:any[] = [];
  jalonFilter: any[] = [];
  sites: any[] = [];
  users: any[] = [];
  phases: any[] = [];
  activite_id: any []=[];



  constructor(
    private activiteService: ActiviteService,
    private data: DataServiceService,
  ){}

  ngOnInit(){
    this.getJalon();
    this.getusers();
    this.getSites();
    this.getPhases();

    console.log('voici lidentifiant recherché',this.id.toString())
  }

  jalonForm = new FormGroup({
    site: new FormControl('', Validators.required),
    phase: new FormControl('', Validators.required),
    libelle: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
    budget: new FormControl('', Validators.required),
    responsable: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    activite_id: new FormControl(this.id) ,
    statut:new FormControl(this.statut)

      })

  insertJalon(){
    if(this.jalonForm.valid){
      const activite = new FormData();

      const site = this.jalonForm.value.site;
      const phase = this.jalonForm.value.phase;
      const libelle = this.jalonForm.value.libelle;
      const responsable = this.jalonForm.value.responsable;
      const date_debut = this.jalonForm.value.date_debut;
      const date_fin = this.jalonForm.value.date_fin;
      const budget = this.jalonForm.value.budget;
      const email = this.jalonForm.value.email;



      activite.append('site', site ? site.toString() : '');
      activite.append('phase', phase ? phase.toString() : '');
      activite.append('responsable', responsable ? responsable.toString() : '');
      activite.append('libelle', libelle ? libelle.toString() : '');
      activite.append('date_debut', date_debut ? date_debut.toString() : '');
      activite.append('date_fin', date_fin ? date_fin.toString() : '');
      activite.append('budget', budget ? budget.toString() : '');
      activite.append('email', email ? email.toString():'');
      activite.append('activite_id', this.id.toString());
      activite.append('statut', this.statut)

      this.activiteService.insertActivite(activite).subscribe(
        data => {
          this.closejalonmodal();
          this.getJalon()
        }, error => {
          console.log(error);
        }
      )
    }else{
      console.log(this.jalonForm)
    }
  }

  getJalon(){
    this.activiteService.getJalonActivitebudgetannuel(this.id).subscribe(
      data => {
        this.jalons = data;
        console.log(this.jalons )
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
      // Mettre à jour les variables
      this.JEmail = selectedUser.email;
      this.JResponsable = selectedUser.name;

      // Mettre à jour la valeur du champ 'email' dans le formulaire
      this.jalonForm.get('email')?.setValue(this.JEmail);
    }
  }



}
