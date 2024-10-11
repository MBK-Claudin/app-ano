import { NgxSkeletonLoaderConfig } from './../../../../../node_modules/ngx-skeleton-loader/lib/ngx-skeleton-loader-config.types.d';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { RouterModule } from '@angular/router';
import { AddObjectifComponent } from '../add-objectif/add-objectif.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-objectif',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AddObjectifComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './objectif.component.html',
  styleUrl: './objectif.component.css'
})

export class ObjectifComponent {
  

  objectifs: any[] = [];
  filteredObjectifs: any[] = [];
  loader = true;
  searchText: string = '';
  nameOb: string = '';
  idob: any;

  constructor(
    private objectifService: ObjectifServiceService,
  ){}

  ngOnInit(){
    this.getobjectifs();
  }

  filterObjectifs() {
    this.filteredObjectifs = this.objectifs.filter(obj => {
        const objectif = obj.objectif ? obj.objectif.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }

  getobjectifs(){
    this.objectifService.getobjectifs().subscribe(
      data => {
      this.loader = false;
      this.objectifs = data;
      this.filteredObjectifs = data;
      }, error => {
        this.loader = false;
        console.error(error);
      }
    )
  }

  closeDeleteModal(){
    const modal = document.getElementById('deletemodal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }
  
  openDeleteModal(id: any){
    const selectedObjectif = this.objectifs.find(ob => ob.id === id);
    if (selectedObjectif) {
      this.nameOb = selectedObjectif.objectif;
      this.idob = selectedObjectif.id;
      const modal = document.getElementById('deletemodal');
      if(modal != null){
        modal.style.display = 'block';
      }
    }
  }

  deleteObjectif(id: any){
    this.objectifService.deleteObjectif(id).subscribe(
      data => {
        this.getobjectifs();
        this.closeDeleteModal()
      }, error => {
        console.log("Erreur lors de la suppression de l'objectif", error)
      }
    )
  }

}
