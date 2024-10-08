import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { error } from 'console';
import { LivrableService } from '../../../services/livrable.service';

@Component({
  selector: 'app-livrable',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './livrable.component.html',
  styleUrl: './livrable.component.css'
})
export class LivrableComponent {
    @Input() programme_id!: number;
    loager = true;
    livrables: any[] = [];
    jalons: any[] = [];

    activite: any;
  
    activite_id: any;
    users: any[] = [];
    indexDoc: number = 0;
    indextEvent: number = 0;
  
    responsableList = [{
      responsable: '',
      email: '',
    }];
  
    titres: string[] = [];
    files: File[] = [];
    fileToAdd: File | null = null;
  
    titre: string = "";
    livrable: string = "";
    responsable: string = '';
    email: string = '';

    constructor(
      private data: DataServiceService,
      private livrableService: LivrableService
    ){}
    ngOnInit(){
      this.getusers()
      this.getJalon()
    }

    insertLivrable(){
      const alivrableForm = new FormData();
      alivrableForm.append('livrable', this.livrable);
      alivrableForm.append('activite_id', this.activite_id);
  
      for (let i = 0; i < this.files.length; i++) {
        alivrableForm.append('documents[]', this.files[i]); // Envoie les fichiers dans un tableau
        alivrableForm.append('titres[]', this.titres[i])
      }

      for(let j = 0; j < this.responsableList.length; j++){
        alivrableForm.append('responsable[]', this.responsableList[j].responsable);
        alivrableForm.append('email[]', this.responsableList[j].email);
      }
      console.log('insert anoForm', alivrableForm)

      this.livrableService.insertLivrable(alivrableForm).subscribe(
        data => {
          this.closemodal()
          
        }, error => {
          console.error('Error:', error);
        }
      )
    }

    getLivrable(){
      this.livrableService.getLivrable(this.programme_id).subscribe(
        data => {

        }, error => {
          console.log('erreur lors du chargement des livrable', error)
        }
      )
    }

    getJalon(){
      this.data.getJalon().subscribe(
        data => {
          this.jalons = data;
        }, error => {
          console.error('Error:', error);
        }
      )
    }

    addresponsables(){
      if(this.responsable && this.email){
        this.responsableList[this.indextEvent] = ({
          responsable: this.responsable,
          email: this.email
        })

        this.responsable = '';
        this.email = '';
        this.indextEvent += 1;
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

    getusers(){
      this.data.getUsers().subscribe(
        data => {
          this.users = data;
        }
      )
    }

    closemodal(){
      const modal = document.getElementById('modal');
      if (modal != null) {
        modal.style.display = 'none';
      }
    }
    openmodal(){
      const modal = document.getElementById('modal');
      if (modal != null) {
        modal.style.display = 'block';
      }
    }

}
