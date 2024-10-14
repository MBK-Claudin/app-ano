import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../services/data-service.service';
import { error } from 'console';

@Component({
  selector: 'app-auth-organisation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './auth-organisation.component.html',
  styleUrl: './auth-organisation.component.css'
})
export class AuthOrganisationComponent {

  bool: any;
  organisation: string = '';
  poste: string = ''
  organisations: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataServiceService,
  ){}

  ngOnInit(){
    this.bool = this.route.snapshot.paramMap.get('isOrg');
    this.getOrganisations()
  }

  getOrganisations(){
    this.dataService.getOrganisations().subscribe(
      data => {
        this.organisations = data;
      }, error => {
        console.error(error);
      }
    )
  }


}
