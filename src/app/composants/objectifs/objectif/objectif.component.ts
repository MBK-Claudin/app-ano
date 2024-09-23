import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObjectifsInterface } from '../../../interfaces/objectifs-interface';
import { error } from 'console';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { RouterModule } from '@angular/router';
import { AddObjectifComponent } from '../add-objectif/add-objectif.component';

@Component({
  selector: 'app-objectif',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AddObjectifComponent,
  ],
  templateUrl: './objectif.component.html',
  styleUrl: './objectif.component.css'
})
export class ObjectifComponent {
  
  objectif: ObjectifsInterface = {
    id: 0,
    secteur: '',
    objectif: '',
    date_debut: new Date(),
    date_fin: new Date(),
    organisation: [],
    ancrage: [],
    responsable: [],
    email: []
  };

  users: any[] =[];
  organisations: any[] = [];
  objectifs: any[] = [];

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
    this.objectifService.getobjectifs().subscribe(data => {
      this.objectifs = data;
    })
  }

}
