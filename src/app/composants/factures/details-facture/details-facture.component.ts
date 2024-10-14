import { FactureService } from './../../../services/facture.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { error } from 'console';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
  selector: 'app-details-facture',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxDocViewerModule,
  ],
  templateUrl: './details-facture.component.html',
  styleUrl: './details-facture.component.css'
})
export class DetailsFactureComponent {
  id: any;
  facture: any;
  documents: any[] = [];
  ano: any;
  contract: any;
  isdoc = false;
  docurl: any;
  titredoc: any;


  constructor(
    private route: ActivatedRoute,
    private factureService: FactureService,
  ){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOnefacture()
  }

  getOnefacture(){
    this.factureService.getOneFActure(this.id).subscribe(
      data => {
        this.facture = data;
        this.documents = data.documents;
        this.ano = data.ano;
        this.contract = data.contract;
      }, error => {
        console.log('error :', error);
      }
    )
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
