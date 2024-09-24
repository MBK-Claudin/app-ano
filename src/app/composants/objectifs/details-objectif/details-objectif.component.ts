import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-objectif',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './details-objectif.component.html',
  styleUrl: './details-objectif.component.css'
})
export class DetailsObjectifComponent {

  detailsObjectif: any;
  responsables: any[] = [];
  oragnisations: any[] = [];
  programmes: any[] = [];
  id: any;
  constructor(
    private objectifService: ObjectifServiceService,
    private route: ActivatedRoute,
    private location: Location,
  ){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.getObjectif()
  }

  goBack(){
    this.location.back();
  }

  getObjectif(){
    this.objectifService.selectObjectif(this.id).subscribe(data => {
      this.detailsObjectif = data;
      this.responsables = data.users;
      this.oragnisations = data.organisations;
      this.programmes = data.programmes;
      console.log(this.detailsObjectif);
    })
  }
}
