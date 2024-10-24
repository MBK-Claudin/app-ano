import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FactureService } from '../../../services/facture.service';
import { error } from 'console';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-facture-programme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './facture-programme.component.html',
  styleUrl: './facture-programme.component.css'
})
export class FactureProgrammeComponent {
  @Input() programme_id!: number;

  factures: any[] = [];
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


  constructor(
    private factureService: FactureService
  ){}

  ngOnInit(){
    this.getFactures()
  }

  insertFacture(){
    const factureForm = new FormData();
    factureForm.append('ref_facture', this.ref_facture);
    factureForm.append('type_facture', this.type_facture);
    factureForm.append('date_reception', this.date_reception.toString());
    factureForm.append('montant', this.montant.toString());
    factureForm.append('couverture', this.couverture.toString());

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
    this.factureService.getProgrammeFactures(this.programme_id).subscribe(
      data => {
        this.factures = data;
        this.filterFactures = data;
      }, error => {
        console.error('Erreur lors de la récuperation des factures !!!!!!!!!!!', error);
      }
    )
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

}
