import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AnoService } from '../../../services/ano.service';
import { DataServiceService } from '../../../services/data-service.service';
import { error } from 'console';
import { errorMonitor } from 'events';

@Component({
  selector: 'app-ano-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './ano-budgetannuel.component.html',
  styleUrl: './ano-budgetannuel.component.css'
})
export class AnoBudgetannuelComponent {
  @Input() activite_id!:number;
  userid: any;

  anos: any[] = [];
  anoFilter: any[] = [];
  users: any[] = [];
  deleteano: any;
  deleteano_id: any;

  // insert ano var
  titre: string = "";
  budget: any;
  event: string = ""
  date_debut: string = '';
  date_fin: string = '';
  responsable: string = '';
  email: string = '';
  indextEvent: number = 0;

  
  anoList = [{
    event: '',
    date_debut: '',
    date_fin: '',
    responsable: '',
    email: '',
  }];

  // doc var
  titres: string[] = [];
  files: File[] = [];
  fileToAdd: File | null = null;


  constructor(
    private anoService: AnoService,
    private data: DataServiceService
  ){}

  ngOnInit(){
    this.getusers();
    this.getAnoActivitebudgetannuel();
  }

  insertAno(){
    const anoForm = new FormData();
    this.userid = localStorage.getItem('user_id');
    anoForm.append('budget', this.budget);
    anoForm.append('activite_id', this.activite_id.toString());
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
        this.getAnoActivitebudgetannuel();
        this.closemodal();
      }, error => {
        console.error(error);
      }
    )

  }

  getAnoActivitebudgetannuel(){
    this.anoService.getAnoActivitebudgetannuel(this.activite_id).subscribe(
      data => {
        this.anos = data;
        this.anoFilter = data
      }, error => {
        console.log("erreur lors de la recuparation des ano lié à l'activité du PTBA !!", error);
      }
    )
  }

  closeSupAnoModal(){
    const modal = document.getElementById('sup_modal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  deleteANO(){
    this.anoService.deleteAno(this.deleteano_id).subscribe(
      data => {
        this.getAnoActivitebudgetannuel();
        this.closemodal();
      }, error => {
        console.log('Une erreur est survenu lors de la suppression !', error);
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

  getDeletAno(id: any){
    const selectano = this.anos.find(ano => ano.id === id);
    if(selectano){
      this.deleteano = selectano.budget;
      this.deleteano_id = selectano.id;
      this.openSupAnoModal()
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

  
  onUserSelect(event: any) {
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    if (selectedUser) {
      this.email = selectedUser.email;
      this.responsable = selectedUser.name;
    }
  }

  openSupAnoModal(){
    const modal = document.getElementById('sup_modal');
    if(modal != null){
      modal.style.display = "block";
    }
  }

  getusers(){
    this.data.getUsers().subscribe(
      data => {
        this.users = data;
      }, error => {
        console.error('erreur users !!!!', error);
      }
    )
  }


  removeFile(index: number) {
    this.files.splice(index, 1); // Supprime le fichier de la liste
  }

  closemodal(){
    const modal = document.getElementById('add_ano_modal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  openmodal(){
    const modal = document.getElementById('add_ano_modal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

}
