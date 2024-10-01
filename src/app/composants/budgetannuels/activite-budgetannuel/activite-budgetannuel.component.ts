import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnoInterface } from '../../../interfaces/ano-interface';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../../services/user-service.service';
import { DataServiceService } from '../../../services/data-service.service';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { error } from 'console';

@Component({
  selector: 'app-activite-budgetannuel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './activite-budgetannuel.component.html',
  styleUrl: './activite-budgetannuel.component.css'
})
export class ActiviteBudgetannuelComponent {
  @ViewChild('doc') documents: any;

  activite_id: any;
  users: any[] = [];
  indexDoc: number = 0;
  indextEvent: number = 0;

  ano = {
    documents: new File([''], ''),
  }

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

  currentEvent = {
    event: '',
    date_d: new Date(),
    date_f: new Date(),
    responsable: '',
    email: ''
  }
  
  constructor(
    private router: ActivatedRoute,
    private data: DataServiceService,
    private programmservice: ProgrammeServiceService,
  ){}

  ngOnInit(){
    this.activite_id = this.router.snapshot.paramMap.get('id');
    this.getusers();
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

    this.programmservice.insertANO(anoForm).subscribe(
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

  /**
   * 
   *   addDocument() {
    if (this.titre && this.ano.documents) {
      this.currentDocuments[this.indexDoc] = ({ doc_titre: this.titre, file: this.ano.documents});
      console.log('current documents :', this.currentDocuments)
      this.indexDoc += 1;
      this.documents.nativeElement.value = '';
      this.titre = '';
    }
  }
   */

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
    console.log(event.target.value);
    const selectedUserName = event.target.value;
    const selectedUser = this.users.find(user => user.name === selectedUserName);
    console.log(selectedUser.email)
    if (selectedUser) {
      this.email = selectedUser.email;
      this.responsable = selectedUser.name;
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
