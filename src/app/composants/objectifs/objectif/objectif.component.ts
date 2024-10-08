import { NgxSkeletonLoaderConfig } from './../../../../../node_modules/ngx-skeleton-loader/lib/ngx-skeleton-loader-config.types.d';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { RouterModule } from '@angular/router';
import { AddObjectifComponent } from '../add-objectif/add-objectif.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { error } from 'console';

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
  loader = true;

  constructor(
    private objectifService: ObjectifServiceService,
  ){}

  ngOnInit(){
    this.getobjectifs();
  }

  test(){
    alert('ok !!!!!!!!!!!!!');
  }

  teste(e: number){
    console.log('ok !!!!!!!!!!!!!!!!!!!!!!!!',e)
  }

  getobjectifs(){
    this.objectifService.getobjectifs().subscribe(
      data => {
      this.loader = false;
      this.objectifs = data;
      }, error => {
        this.loader = false;
        console.error(error);
      }
    )
  }

}
