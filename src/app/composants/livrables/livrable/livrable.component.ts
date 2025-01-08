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
    @Input() programme_id!: string;

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
    }];

    titres: string[] = [];
    files: File[] = [];
    fileToAdd: File | null = null;

    titre: string = "";
    livrable: string = "";
    responsable: string = '';

    constructor(
      private data: DataServiceService,
      private livrableService: LivrableService
    ){}
    ngOnInit(){
      this.getusers()
      this.getJalon()
      this.getLivrable();
    }

    insertLivrable(){
      const alivrableForm = new FormData();
      alivrableForm.append('livrable', this.livrable);
      alivrableForm.append('activite_id', this.activite_id);
      alivrableForm.append('responsable', this.responsable);
      alivrableForm.append('programme_id', this.programme_id);


      // Ajouter les fichiers et titres associés
      for (let i = 0; i < this.files.length; i++) {
        alivrableForm.append('documents[]', this.files[i]);
        alivrableForm.append('titres[]', this.titres[i]);
      }


      console.log('insert anoForm', alivrableForm);

      this.livrableService.insertLivrable(alivrableForm).subscribe(
        data => {
          console.log('Livrable ajouté avec succès', data);
          this.closemodal();  // Fermer la fenêtre modale après l'ajout
        },
        error => {
          console.error('Erreur lors de l\'insertion du livrable', error);
        }
      );
    }

    extractFileName(url: string): string {
      return url.split('/').pop() || 'Document';
    }

    getLivrable(){
      this.livrableService.getLivrable(this.programme_id).subscribe(
        data => {
          this.livrables = data;
          console.log('livrables :', this.livrables);
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
      this.files.splice(index, 1);
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
