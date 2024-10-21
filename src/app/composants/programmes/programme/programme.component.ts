import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
  selector: 'app-programme',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    NgxDocViewerModule,
  ],
  templateUrl: './programme.component.html',
  styleUrl: './programme.component.css'
})
export class ProgrammeComponent {
  
  programmes: any[] = [];
  loader = true;
  filterProgramme: any[] = [];
  searchText: string = '';
  nameProg: string = '';
  idProg: any;

  constructor(
    private programmeService: ProgrammeServiceService
  ){}

  ngOnInit(){
    this.getprogramme()
  }

  closeDeleteModal(){
    const modal = document.getElementById('deletemodal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }
  
  openDeleteModal(id: any){
    const selectedpro = this.programmes.find(prog => prog.id === id);
    if (selectedpro) {
      this.nameProg = selectedpro.libelle;
      this.idProg = selectedpro.id;
      const modal = document.getElementById('deletemodal');
      if(modal != null){
        modal.style.display = 'block';
      }
    }
  }

  deleteProgramme(id: any){
    this.programmeService.deleteProgramme(id).subscribe(
      data => {
        this.getprogramme();
        this.closeDeleteModal()
      }, error => {
        console.log("Erreur lors de la suppression de l'objectif", error)
      }
    )
  }

  getprogramme(){
    this.programmeService.getProgramme().subscribe(
      data => {
        this.loader = false;
        this.programmes = data;
        this.filterProgramme = data;
      }, error => {
        console.error('Erreur lors du chargement des programme !!', error);
      }
  )
  }

  filterProgrammes() {
    this.filterProgramme = this.programmes.filter(prog => {
        const objectif = prog.libelle ? prog.libelle.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }
}
