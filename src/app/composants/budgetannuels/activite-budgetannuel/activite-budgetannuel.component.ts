import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ],
  templateUrl: './activite-budgetannuel.component.html',
  styleUrl: './activite-budgetannuel.component.css'
})
export class ActiviteBudgetannuelComponent {
  @ViewChild('doc') documents: any;
  loager = true

  phases: any[] = [];
  sites: any[] = [];
  taskSettings: TaskFieldsModel | undefined;
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

  constructor(
    private router: ActivatedRoute,
    private data: DataServiceService,
    private ano: AnoService,
    private activiteService: ActiviteService,
    private budgetannuelService: BudgetannuelServiceService,
  ){}

  ngOnInit(){
    this.activite_id = this.router.snapshot.paramMap.get('id');
    this.indexDoc = 0;
    this.indextEvent = 0;
    this.getusers();
    this.getPhases();
    this.getSites();
    this.taskSettings = {id: 'TaskID', name: 'TaskName', startDate: 'StartDate', endDate: 'EndDate', duration: 'Duration', progress: 'Progress', child: 'subtasks' };
    this.nothing = [
      {
          TaskID: 1,
          TaskName: 'Project Initiation',
          StartDate: new Date('04/02/2019'),
          EndDate: new Date('04/21/2019'),
          subtasks: [
              { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
              { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50  },
              { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
          ]
      },
      {
          TaskID: 5,
          TaskName: 'Project Estimation',
          StartDate: new Date('04/02/2019'),
          EndDate: new Date('04/21/2019'),
          subtasks: [
              { TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
              { TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
              { TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 }
          ]
      }];
  }

  getActivite(){
    this.budgetannuelService.getOneActivite(this.activite_id).subscribe(
      data => {
        this.loager = false;
        this.activite = data;
      }, error => {
        console.log("erreur lors du chargement de l'activité !", error);
      }
    )
  }

  insertJalon(){
    const jalonFrom = new FormData();

    if(this.jalon && this.JDate_debut && this.JDate_fin && this.JResponsables && this.JEmails){
      jalonFrom.append('activite_id', this.activite_id);
      jalonFrom.append('site[]', this.JSite);
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
          this.closejaonmodal()
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

  closejaonmodal(){
    const modal = document.getElementById('jalonmodal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  insertAno(){
    const anoForm = new FormData();
    anoForm.append('budget', this.budget);
    anoForm.append('activite_id', this.activite_id);
    anoForm.append('user_id', '1');

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
        console.log(data);
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
    const modal = document.getElementById('modal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closemodal(){
    const modal = document.getElementById('modal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

}
