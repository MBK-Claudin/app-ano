import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FactureService } from '../../../services/facture.service';
import { error } from 'console';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.css'
})
export class FactureComponent {

  factures: any [] = [];
  filterFactures: any[] = [];

  titres: string[] = [];
  files: File[] = [];
  fileToAdd: File | null = null;
  titre: string = "";
  isano = false;
  iscontract = false;
  anos: any;
  contracts: any;
  ref_facture: string = '';
  type_facture: string = '';
  date_reception: string = '';
  couverture: string = '';
  montant: number = 0;
  choiceAno: string = '';
  choiceContract: string = '';

  uid = localStorage.getItem('uid');
  user: any;

  constructor(
    private factureService: FactureService,
    private authService: AuthService,
  ){}

  ngOnInit(){
    this.getFactures()
    this.getAno();
    this.getContract();
    this.getUserId();
  }

  insertFacture(){
    const factureForm = new FormData();
    factureForm.append('ref_facture', this.ref_facture);
    factureForm.append('type_facture', this.type_facture);
    factureForm.append('date_reception', this.date_reception.toString());
    factureForm.append('montant', this.montant.toString());
    factureForm.append('couverture', this.couverture.toString());
    factureForm.append('user_id', this.user);

    for (let i = 0; i < this.titres.length; i++){
      factureForm.append('titres[]', this.titres[i]);
      factureForm.append('documents[]', this.files[i], this.files[i].name)
    }

    if(this.choiceAno){
      factureForm.append('ano', this.choiceAno);
    }

    if(this.choiceContract){
      factureForm.append('contract', this.choiceContract);
    }

    console.log(factureForm);
    
    this.factureService.insertFacture(factureForm).subscribe(
      data => {
        this.getFactures();
        this.closemodal();
      }, error => {
        console.log('Erreur :', error);
      }
    )
    
    
  }

  getUserId () {
    this.authService.getAuthUser(this.uid).subscribe(
      data => {
        this.user = data.id;
      }, error => {
        console.log("Erreur lors de la recuperetion del'utilisateur conecter !!", error);
      }
    )
  }

  getAno(){
    this.factureService.getAno().subscribe(
      data => {
        this.anos = data;
        console.log('facture ano:', this.anos)
      }, error => {
        console.error(error);
      }
    )
  }

  getContract(){
    this.factureService.getContract().subscribe(
      data => {
        this.contracts = data;
        console.log('factures contracts :', this.contracts);
      }, error => {
        console.log('erreur contract:', error);
      }
    )
  }

  onAnoChange(event: any): void {
    if (event.target.checked) {
        this.isano = true;
        this.iscontract = false;  // Masquer l'autre formulaire
    } else {
        this.isano = false;
    }
  }

  // Méthode appelée lors de la sélection de la checkbox "Contract"
  onContractChange(event: any): void {
      if (event.target.checked) {
          this.iscontract = true;
          this.isano = false;  // Masquer l'autre formulaire
      } else {
          this.iscontract = false;
      }
  }

  getFactures(){
    this.factureService.getFactures().subscribe(
      data => {
        this.factures = data;
        this.filterFactures = data;
        console.log('contract :', data);
      }, error => {
        console.log('Erreur lors du chargement des contracts :', error)
      }
    )
  }


  onFileChange(event: any) {
    this.fileToAdd = event.target.files[0];
    if (this.fileToAdd && this.titre) {
      this.files.push(this.fileToAdd);
      this.titres.push(this.titre);
      this.fileToAdd = null;
      this.titre = '';
      event.target.value = '';
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1); // Supprime le fichier de la liste
  }

  modal(){
    const modal = document.getElementById('newModal');
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  closemodal(){
    const modal = document.getElementById('newModal');
    if(modal != null){
      modal.style.display = "none";
    }
  }

}
