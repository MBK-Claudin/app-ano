import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { AnoService } from '../../../services/ano.service';
import { ActiviteService } from '../../../services/activite.service';
import { GanttModule, TaskFieldsModel } from '@syncfusion/ej2-angular-gantt';
import { error } from 'console';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';

@Component({
  selector: 'app-activite-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GanttModule,
    NgxSkeletonLoaderModule,
    RouterModule,
  ],
  templateUrl: './activite-budgetannuel.component.html',
  styleUrl: './activite-budgetannuel.component.css'
})
export class ActiviteBudgetannuelComponent {
  @ViewChild('doc') documents: any;
  loader = true;
  bool = true;
  jalons:any[] = [];
  responsables:any[] = [];
  anos: any[] = [];

  phases: any[] = [];
  sites: any[] = [];
  nothing: object[] = [];
  activite: any;

  activite_id: any;
  users: any[] = [];
  indexDoc: number = 0;
  indextEvent: number = 0;

  anoList = [{
    event: '',
    date_debut: '',
    date_fin: '',
    responsable: '',
    email: '',
  }];

  titres: string[] = [];
  files: File[] = [];
  fileToAdd: File | null = null;

  titre: string = "";
  budget: any;
  event: string = ""
  date_debut: string = '';
  date_fin: string = '';
  responsable: string = '';
  email: string = '';
  // jalon var
  jalon: string = '';
  JDate_debut: Date | null = null;
  JDate_fin: Date | null = null;
  JResponsable: string = '';
  JEmail: string = '';
  JPhase: string = '';
  JSite: string = '';

  JResponsables: string[] = [];
  JEmails: string[] = [];
  deleteano: any;
  deleteano_id: any;
  userid: any;


  constructor(
    private router: ActivatedRoute,
    private data: DataServiceService,
    private ano: AnoService,
    private activiteService: ActiviteService,
    private budgetannuelService: BudgetannuelServiceService,
  ){}

  isano(){
    this.bool = true;
  }

  isjalon(){
    this.bool = false;
  }

  ngOnInit(){
    this.activite_id = this.router.snapshot.paramMap.get('id');
    this.indexDoc = 0;
    this.indextEvent = 0;
    this.getusers();
    this.getPhases();
    this.getSites();
    this.getActivite();
  }

  getActivite(){
    this.budgetannuelService.getOneActivite(this.activite_id).subscribe(
      data => {
        this.loader = false;
        this.activite = data;
        this.jalons = data.activites;
        this.responsables = data.users;
        this.anos = data.anos;
      }, error => {
        console.log("erreur lors du chargement de l'activité !", error);
      }
    )
  }

  removeUserField(index: number) {
    this.JResponsables.splice(index, 1);
    this.JEmails.splice(index, 1);
  }

  openSupAnoModal(){
    const modal = document.getElementById('sup_modal');
    if(modal != null){
      modal.style.display = "block";
    }
  }

  getDeletAno(id: any){
    const selectano = this.anos.find(ano => ano.id === id);
    if(selectano){
      this.deleteano = selectano.budget;
      this.deleteano_id = selectano.id;
      this.openSupAnoModal()
    }
  }

  deleteANO(){
    this.ano.deleteAno(this.deleteano_id).subscribe(
      data => {
        this.getActivite();
        this.closemodal();
      }, error => {
        console.log('Une erreur est survenu lors de la suppression !', error);
      }
    )
  }


  insertJalon(){
    const jalonFrom = new FormData();

    if(this.jalon && this.JDate_debut && this.JDate_fin && this.JResponsables && this.JEmails){
      jalonFrom.append('activite_id', this.activite_id);
      jalonFrom.append('site', this.JSite);
      jalonFrom.append('phase', this.JPhase);
      jalonFrom.append('libelle', this.jalon);
      jalonFrom.append('date_debut', this.JDate_debut!.toString());
      jalonFrom.append('date_fin', this.JDate_fin!.toString());
  
      for (let i = 0; i< this.JResponsables.length; i++ ){
        jalonFrom.append('responsables[]', this.JResponsables[i]);
        jalonFrom.append('emails[]', this.JEmails[i]);
      }
  
      console.log(jalonFrom);

      this.activiteService.insertActivite(jalonFrom).subscribe(
        data => {
          this.getActivite();
          this.closejalonmodal();
        }, error => {
          console.log(error);
        }
      )

    }
  }

  getSites(){
    this.activiteService.getSites().subscribe(
      data => {
        console.log('site: ', data);
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

  addResponsable(){
    if(this.JEmail && this.JResponsable){
      this.JResponsables.push(this.JResponsable);
      this.JEmails.push(this.JEmail);
      this.JEmail = '';
      this.JResponsable = ''; 
    }
  }

  jalonmodal(){
    const modal = document.getElementById('jalonmodal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closejalonmodal(){
    const modal = document.getElementById('jalonmodal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  insertAno(){
    const anoForm = new FormData();
    this.userid = localStorage.getItem('user_id');
    anoForm.append('budget', this.budget);
    anoForm.append('activite_id', this.activite_id);
    anoForm.append('user_id', this.userid);

    for (let i = 0; i < this.files.length; i++) {
      anoForm.append('documents[]', this.files[i]); // Envoie les fichiers dans un tableau
      anoForm.append('titres[]', this.titres[i])
    }

    for(let j = 0; j < this.anoList.length; j++){
      anoForm.append('evenement[]', this.anoList[j].event);
      anoForm.append('date_debut[]', this.anoList[j].date_debut.toString());
      anoForm.append('date_fin[]', this.anoList[j].date_fin.toString());
      anoForm.append('responsable[]', this.anoList[j].responsable);
      anoForm.append('email[]', this.anoList[j].email);
    }
    console.log('insert anoForm', anoForm)

    this.ano.insertANO(anoForm).subscribe(
      data => {
        this.getActivite();
        this.closemodal();
      }, error => {
        console.error(error);
      }
    )

  }

  onFileChange(event: any) {
    this.fileToAdd = event.target.files[0];
    if (this.fileToAdd && this.titre) {
      this.files.push(this.fileToAdd);
      this.titres.push(this.titre);
      this.fileToAdd = null;
      this.titre = '';
      event.target.value = '';
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1); // Supprime le fichier de la liste
  }

  addEvent(){
    if(this.event && this.date_debut && this.date_fin && this.responsable && this.email){
      
      this.anoList[this.indextEvent] = ({
        event: this.event,
        date_debut: this.date_debut,
        date_fin: this.date_fin,
        responsable: this.responsable,
        email: this.email
      })

      this.event = '';
      this.date_debut = '';
      this.date_fin = '';
      this.responsable = '';
      this.email = '';
      this.indextEvent += 1;
      console.log('add event !', this.anoList);
    }
  }

  getusers(){
    this.data.getUsers().subscribe(
      data => {
        this.users = data;
      }
    )
  }

  onUserSelect(event: any) {
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    if (selectedUser) {
      this.email = selectedUser.email;
      this.responsable = selectedUser.name;
    }
  }

  onUserSelectJalon(event: any) {
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    if (selectedUser) {
      this.JEmail = selectedUser.email;
      this.JResponsable = selectedUser.name;
    }
  }

  modal(){
    console.log(' ok modal !')
    const modal = document.getElementById('add_ano_modal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closemodal(){
    const modal = document.getElementById('add_ano_modal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  closeSupAnoModal(){
    const modal = document.getElementById('sup_modal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

}
