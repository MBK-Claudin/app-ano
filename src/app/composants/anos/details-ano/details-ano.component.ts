import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnoService } from '../../../services/ano.service';
import { error } from 'console';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
  selector: 'app-details-ano',
  standalone: true,
  imports: [
    CommonModule,
    NgxDocViewerModule,
  ],
  templateUrl: './details-ano.component.html',
  styleUrl: './details-ano.component.css'
})
export class DetailsAnoComponent {

  id: any;
  ano: any;
  events: any;
  users: any;
  documents: any[] = [];
  isdoc = false;
  docurl: any;
  titredoc: any;

  constructor(
    private location: Location,
    private router: ActivatedRoute,
    private anoservice: AnoService,
  ){}

  ngOnInit(){
    this.id = this.router.snapshot.paramMap.get('id');
    this.getAno();
  }

  getAno(){
    this.anoservice.getDetailAno(this.id).subscribe(
      data => {
        this.ano = data;
        this.events = data.evenements;
        this.users = data.users;
        this.documents = data.documents;
        console.log(this.ano);
      }, error => {
        console.log('eereur :', error)
      }
    )
  }

  goBack(){
    this.location.back();
  }

  closeDoc(){
    this.isdoc = false;
  }

  openDoc(id: any){
    const selectDoc = this.documents.find(doc => doc.id === id)
    if(selectDoc){
      this.docurl = selectDoc.file_url;
      this.titredoc = selectDoc.titre;
      this.isdoc = true;
    }
  }
}
