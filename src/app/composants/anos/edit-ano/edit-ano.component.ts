import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';
import { DataServiceService } from '../../../services/data-service.service';
import { AnoService } from '../../../services/ano.service';
import { error } from 'console';

@Component({
  selector: 'app-edit-ano',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './edit-ano.component.html',
  styleUrl: './edit-ano.component.css'
})
export class EditAnoComponent {

  anoList = [{
    event: '',
    date_debut: '',
    date_fin: '',
    responsable: '',
    email: '',
  }];
  
  editBudget: any;

  titres: string[] = [];
  files: File[] = [];
  fileToAdd: File | null = null;
  activite_id: any;

  titre: string = "";
  budget: any;
  event: string = ""
  date_debut: string = '';
  date_fin: string = '';
  responsable: string = '';
  email: string = '';

  indextEvent: number = 0;
  users: any[] = [];
  activites: any[] = [];
  id: any;

  editDocuments: any[] = [];
  editevent: any[] = [];
  editResponsable: any[] = [];
  ano_id: any;
  event_id: any[] = [];
  doc_id: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private budgetannuelService: BudgetannuelServiceService,
    private dataService: DataServiceService,
    private location: Location,
    private anoService: AnoService,
  ){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSelectAno();
    this.indextEvent = 0;
    this.getActivites();
    this.getuser();
  }

  editAno(){

    const anoForm = new FormData();

    anoForm.append('budget', this.budget);
    anoForm.append('activite_id', this.activite_id);
    anoForm.append('user_id', '1');
    anoForm.append('ano_id', this.ano_id);

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

    console.log('insert anoForm', anoForm);

    this.anoService.editAno(anoForm).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.error('Error:', error);
      }
    )
  }
  
  getSelectAno(){
    this.anoService.getSelectANO(this.id).subscribe(
      async data => {
        this.ano_id = data.id
        this.budget = data.budget;
        this.editDocuments = data.documents;
        this.editevent = data.evenements;
        this.editResponsable = data.users;
        console.log('data : ',data);
        console.log('event : ', this.editevent);
        console.log('doc : ', this.editDocuments);

        for (let i = 0; i < this.editDocuments.length; i++) {
          
          this.titres.push(this.editDocuments[i].titre);
          console.log(this.editDocuments[i].file_url, this.editDocuments[i].file_path, this.editDocuments[i].file_name);

          try {
            const fileRes = await fetch(this.editDocuments[i].file_url);
            if (!fileRes.ok) {
              throw new Error(`Erreur lors de la récupération du fichier : ${fileRes.statusText}`);
            }
            const blob = await fileRes.blob();
            const file = new File([blob], this.editDocuments[i].file_name, { type: blob.type });
            this.files.push(file);
          } catch (error) {
            console.error("Erreur lors du téléchargement du fichier :", error);
          }
          
        }

        for (let j = 0; j < this.editevent.length; j++){

          this.event_id.push(this.editevent[j].id);

          for(let k = 0; k < this.editevent[j].users.length; k++){
            this.anoList[this.indextEvent] = ({
              event: this.editevent[j].libelle,
              date_debut: this.editevent[j].date_debut,
              date_fin: this.editevent[j].date_fin,
              responsable: this.editevent[j].users[k].name,
              email: this.editevent[j].users[k].email,
            });
          }

          this.indextEvent += 1;
        }

        console.log('Event : ', this.anoList);
        console.log('Doc : ', this.files);
        console.log('titre doc : ', this.titres)
      }, error => {
        console.error("Erreur lors de la recuperation de l'ano:", error);
      }
    )
  }

  removeFile(index: number) {
    this.files.splice(index, 1); // Supprime le fichier de la liste
  }

  removeEvent(index: number){
    if (index > -1) {
      this.anoList.splice(index, 1);
    }
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

  onUserSelect(event: any) {
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    if (selectedUser) {
      this.email = selectedUser.email;
      this.responsable = selectedUser.name;
    }
  }

  getuser(){
    this.dataService.getUsers().subscribe(
      data => {
        this.users = data;
      }, error => {
        console.log('Erreur lors du chargement des users !', error)
      }
    )
  }

  getActivites(){
    this.budgetannuelService.getActivites().subscribe(
      data => {
        this.activites = data;
      }, error => {
        console.log('Erreur lors du chargement des activites !', error);
      }
    )
  }

  goBack(){
    this.location.back()
  }

}
