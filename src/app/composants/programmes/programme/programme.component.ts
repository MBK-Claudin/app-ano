import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgrammeServiceService } from '../../../services/programme-service.service';

@Component({
  selector: 'app-programme',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './programme.component.html',
  styleUrl: './programme.component.css'
})
export class ProgrammeComponent {
  programmes: any[] = [];

  constructor(
    private programmeService: ProgrammeServiceService
  ){}

  ngOnInit(){
    this.getprogramme()
  }

  getprogramme(){
    this.programmeService.getProgramme().subscribe(data => {
      this.programmes = data;
      console.log(this.programmes)
    })
  }

  test(){
    alert('ok !!!!!!!!!!!!!!!!!!!')
  }
}
