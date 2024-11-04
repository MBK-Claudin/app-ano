import { FactureService } from './../../../services/facture.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { error } from 'console';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-details-facture',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxDocViewerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './details-facture.component.html',
  styleUrl: './details-facture.component.css'
})
export class DetailsFactureComponent {
  id: any;
  facture: any;
  documents: any[] = [];
  documentFilter: any[] = [];
  ano: any;
  contract: any;
  isdoc = false;
  docurl: any;
  titredoc: any;
  etapeActuelle: string = '';
  merde: string = 'Reçu';
  isRecu: boolean = true;
  isTraitement: boolean = true;
  isTransmetre: boolean = true; 

  uid = localStorage.getItem('uid');
  user: any;

  etapeForm = new FormGroup({
    etape: new FormControl('', Validators.required),
  });
  dataEtat: any;


  constructor(
    private route: ActivatedRoute,
    private factureService: FactureService,
    private authService: AuthService,
  ){}

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOnefacture();
    this.getUserId();
    this.getEtatFacture();
  }

  onSubmit(){
    alert('ok onSubmit !!!!!!!!');
  }

  getEtatFacture () {
    this.factureService.getEtatFacture(this.id).subscribe(
      data => {
        this.dataEtat = data;
        this.etapeActuelle = this.dataEtat.etape
        // this.etapeForm.patchValue({ etape: this.etapeActuelle });
        console.log("Atat facture : ", this.etapeActuelle)
      }, error => {
        console.error("Erreur lors de la recuperation de l'etat ectuel de la facture !!!", error);
      }
    )
  }

  receptionFacture(){}

  traitementFacture(){

  }

  getUserId () {
    this.authService.getAuthUser(this.uid).subscribe(
      data => {
        this.user = data.id;
        //console.log(data);
      }, error => {
        console.log("Erreur lors de la recuperation dd lutilisateur connecter !!", error);
      }
    )
  }

  getOnefacture(){
    this.factureService.getOneFActure(this.id).subscribe(
      data => {
        this.facture = data;
        this.documents = data.documents;
        this.documentFilter = data.documents;
        this.ano = data.ano;
        this.contract = data.contract;
      }, error => {
        console.log('error :', error);
      }
    )
  }

  openEtatModal (){
    const modal = document.getElementById('etatModal');
    if(modal != null){
      modal.style.display = "block";
    }
  }

  openHistoriqueModal (){
    const modal = document.getElementById('historiqueModal');
    if(modal != null){
      modal.style.display = "block";
    }
  }

  closeHistoriqueModal (){
    const modal = document.getElementById('historiqueModal');
    if(modal != null){
      modal.style.display = "none";
    }
  }

  closeEtatModal (){
    const modal = document.getElementById('etatModal');
    if(modal != null){
      modal.style.display = "none";
    }
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
