import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { error } from 'console';

@Component({
  selector: 'app-programme',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './programme.component.html',
  styleUrl: './programme.component.css'
})
export class ProgrammeComponent {
  programmes: any[] = [];
  loader = true;

  constructor(
    private programmeService: ProgrammeServiceService
  ){}

  ngOnInit(){
    this.getprogramme()
  }

  getprogramme(){
    this.programmeService.getProgramme().subscribe(
      data => {
        this.loader = false;
        this.programmes = data;
      }, error => {
        console.error('Erreur lors du chargement des programme !!', error);
      }
  )
  }
}
