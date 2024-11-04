import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnoService } from '../../../services/ano.service';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-ano-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ano-programme.component.html',
  styleUrl: './ano-programme.component.css'
})

export class AnoProgrammeComponent {
  @Input() programme_id!:number;

  anos:any[] = [];
  filterAno: any[] = [];
  deleteano: any;
  deleteano_id: any;
  loader = true;
  searchText: string =  '';
  

  constructor(
    private anoService: AnoService,
  ){}

  ngOnInit(){
    this.getAnoProgramme();
  }

  closemodal(){
    const modal = document.getElementById('sup_modal');
    if(modal != null){
      modal.style.display = "none";
    }
  }

  openmodal(){
    const modal = document.getElementById('sup_modal');
    if(modal != null){
      modal.style.display = "block";
    }
  }

  getDeletAno(id: any){
    const selectano = this.anos.find(ano => ano.id === id);
    if(selectano){
      this.deleteano = selectano.budget;
      this.deleteano_id = selectano.id;
      this.openmodal()
    }
  }

  
  deleteANO(){
    this.anoService.deleteAno(this.deleteano_id).subscribe(
      data => {
        this.getAnoProgramme();
        this.closemodal();
      }, error => {
        console.log('Une erreur est survenu lors de la suppression !', error);
      }
    )
  }

  getAnoProgramme(){
    this.anoService.getAnoProgramme(this.programme_id).subscribe(
      data => {
        this.loader = false
        this.anos = data.anos;
        this.filterAno = data.anos;
        console.log('ano programme : ', data)
      }, error => {
        console.log("Erreur lors du chargement des anos", error);
      }
    )
  }

  filterAnos(){
    this.filterAno = this.anos.filter(a => {
        const objectif = a.budget ? a.budget.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }

}
