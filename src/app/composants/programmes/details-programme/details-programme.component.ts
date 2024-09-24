import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ProgrammeServiceService } from '../../../services/programme-service.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { ContributeursComponent } from '../contributeurs/contributeurs.component';

@Component({
  selector: 'app-details-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ContributeursComponent
  ],
  templateUrl: './details-programme.component.html',
  styleUrl: './details-programme.component.css'
})
export class DetailsProgrammeComponent {
  detailsProgramme: any;
  organisations: any[] = [];
  responsables: any[] = [];
  id: any;

  constructor(
    private programmeService: ProgrammeServiceService,
    private location: Location,
    private router: ActivatedRoute,
  ){}

  ngOnInit(){
    this.id = this.router.snapshot.paramMap.get('id')
    this.getProgramme()
  }

  goBack(){
    this.location.back();
  }

  getProgramme(){
    this.programmeService.selectProgramme(this.id).subscribe(data => {
      this.detailsProgramme = data;
      this.organisations = data.organisations;
      this.responsables = data.users;
      console.log(data)
    },error => {
      console.error(error);
    });
  }

}
