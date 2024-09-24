import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContributeurServicesService } from '../../../services/contributeur-services.service';

@Component({
  selector: 'app-contributeurs',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './contributeurs.component.html',
  styleUrl: './contributeurs.component.css'
})
export class ContributeursComponent {
  users: any[] = [];

  constructor(
    private contributeurService: ContributeurServicesService
  ){}

  ngOnInit(){
    this.getusers();
  }

  getusers(){
    this.contributeurService.getUsers().subscribe(
      data => {
        this.users = data;
      }
    )
  }

}
