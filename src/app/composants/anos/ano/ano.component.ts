import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnoService } from '../../../services/ano.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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

  constructor(
    private anoService: AnoService,
  ){}

  ngOnInit(){
    this.getano();
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
