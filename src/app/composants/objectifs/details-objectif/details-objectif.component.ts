import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ObjectifServiceService } from '../../../services/objectif-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgrammeServiceService } from '../../../services/programme-service.service';

@Component({
  selector: 'app-details-objectif',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './details-objectif.component.html',
  styleUrl: './details-objectif.component.css'
})
export class DetailsObjectifComponent {

  detailsObjectif: any;
  responsables: any[] = [];
  oragnisations: any[] = [];
  programmes: any[] = [];
  filterProgrammes: any[] = [];
  id: any;
  searchText: string = '';
  nameProg: string = '';
  idProg: any;


  constructor(
    private objectifService: ObjectifServiceService,
    private route: ActivatedRoute,
    private location: Location,
    private programmeService: ProgrammeServiceService,
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
      this.filterProgrammes = data.programmes;
    })
  }

  deleteProgramme(id: any){
    this.programmeService.deleteProgramme(id).subscribe(
      data => {
        this.getObjectif();
        this.closeDeleteModal()
      }, error => {
        console.log("Erreur lors de la suppression de l'objectif", error)
      }
    )
  }

  filterProgramme() {
    this.filterProgrammes = this.programmes.filter(prog => {
        const objectif = prog.libelle ? prog.libelle.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }

  closeDeleteModal(){
    const modal = document.getElementById('deletemodal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }
  
  openDeleteModal(id: any){
    const selectedpro = this.programmes.find(prog => prog.id === id);
    if (selectedpro) {
      this.nameProg = selectedpro.libelle;
      this.idProg = selectedpro.id;
      const modal = document.getElementById('deletemodal');
      if(modal != null){
        modal.style.display = 'block';
      }
    }
  }
}
