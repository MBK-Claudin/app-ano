import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { error } from 'console';

@Component({
  selector: 'app-programme-objectif',
  standalone: true,
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './programme-objectif.component.html',
  styleUrl: './programme-objectif.component.css'
})
export class ProgrammeObjectifComponent {
  @Input() objetif_id!:number;
  programmes: any[] = [];
  filterProgramme: any[] = [];
  loader: boolean = true;

  nameProg: any;
  idProg: any;
  searchText: string = '';

  constructor(
    private objetifService: ObjectifServiceService,
    private programmeService: ProgrammeServiceService,
  ){}

  ngOnInit(){
    this.getObjectifProgramme()
  }

  getObjectifProgramme(){
    this.objetifService.getProgrammeObjectif(this.objetif_id).subscribe(
      data => {
        this.loader = false;
        this.programmes = data;
        this.filterProgramme = data;
      }, error => {
        console.error(error);
      }
    )
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

  filterProgrammes() {
    this.filterProgramme = this.programmes.filter(prog => {
        const objectif = prog.libelle ? prog.libelle.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }

  closeDeleteModal(){
    const modal = document.getElementById('deletemodal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }

  deleteProgramme(id: any){
    this.programmeService.deleteProgramme(id).subscribe(
      data => {
        this.getObjectifProgramme();
        this.closeDeleteModal()
      }, error => {
        console.log("Erreur lors de la suppression de l'objectif", error)
      }
    )
  }


}
