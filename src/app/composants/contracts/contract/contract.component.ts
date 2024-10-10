import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContractService } from '../../../services/contract.service';
import { error } from 'console';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css'
})
export class ContractComponent {
  @Input() programme_id!: number;

  contracts: any [] = [];

  ref_contract: string = '';
  libelle: string = '';
  description: string = '';
  montant: number = 0;

  titres: string[] = [];
  files: File[] = [];
  fileToAdd: File | null = null;
  titre: string = "";

  constructor(
    private contractService: ContractService,
  ) {}

  ngOnInit(){
    this.getContracts();
  }

  insertContract(){
    const contractForm = new FormData();
    contractForm.append('ref_contract', this.ref_contract);
    contractForm.append('libelle', this.libelle);
    contractForm.append('description', this.description);
    contractForm.append('montant', this.montant.toString());
    contractForm.append('programme_id', this.programme_id.toString())

    for (let i = 0; i < this.titres.length; i++){
      contractForm.append('titres[]', this.titres[i]);
      contractForm.append('documents[]', this.files[i], this.files[i].name)
    }

    this.contractService.insertContracts(contractForm).subscribe(
      data => {
        this.closemodal();
      }, error => {
        console.log('Erreur :', error);
      }
    )
  }

  getContracts(){
    this.contractService.getContracts().subscribe(
      data => {
        this.contracts = data;
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

  openmodal(){
    console.log('ok modal !!!!!!!!!!');
    const modal = document.getElementById('addmodal');
    if(modal != null){
      modal.style.display = "block";
    }
  }

  closemodal(){
    const modal = document.getElementById('addmodal');
    if(modal != null){
      modal.style.display = "none";
    }
  }
}
