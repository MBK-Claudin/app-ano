import { CommonModule, Location } from '@angular/common';
import { AnoInterface } from './../../../interfaces/ano-interface';
import { Component, Input } from '@angular/core';
import { AnoService } from '../../../services/ano.service';
import { FormsModule } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { error } from 'console';
import { ActiviteService } from '../../../services/activite.service';
import { BudgetannuelServiceService } from '../../../services/budgetannuel-service.service';


@Component({
  selector: 'app-add-ano',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './add-ano.component.html',
  styleUrl: './add-ano.component.css'
})
export class AddAnoComponent {

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
  userid: any;

  constructor(
    private anoService: AnoService,
    private dataService: DataServiceService,
    private location: Location,
    private budgetannuelService: BudgetannuelServiceService
  ){}

  ngOnInit(){
    this.getuser();
    this.getActivites();
  }


  insertAno(){
    const anoForm = new FormData();
    this.userid = localStorage.getItem('user_id')?.toString();
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

    this.anoService.insertANO(anoForm).subscribe(
      data => {
        this.goBack();
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
    console.log('merde')
    this.budgetannuelService.getActivites().subscribe(
      data => {
        this.activites = data;
      }, error => {
        console.log('Erreur lors du chargement des activites !', error)
      }
    )
  }

  goBack(){
    this.location.back();
  }


}
