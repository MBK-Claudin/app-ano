import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnoService } from '../../../services/ano.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { error } from 'node:console';

@Component({
  selector: 'app-ano',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './ano.component.html',
  styleUrl: './ano.component.css'
})
export class AnoComponent {

  anos: any[] = [];
  loader = true;
  deleteano_id: any;
  deleteano: any;

  constructor(
    private anoService: AnoService,
  ){}

  ngOnInit(){
    this.getano();
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
        this.getano();
        this.closemodal();
      }, error => {
        console.log('Une erreur est survenu lors de la suppression !', error);
      }
    )
  }

  getano(){
    this.anoService.getANO().subscribe(
      data => {
        this.loader = false
        this.anos = data;
      }, error => {
        console.log("Erreur lors du chargement des anos", error);
      }
    )
  }


}
