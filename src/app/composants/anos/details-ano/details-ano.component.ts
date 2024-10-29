import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnoService } from '../../../services/ano.service';
import { error } from 'console';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-ano',
  standalone: true,
  imports: [
    CommonModule,
    NgxDocViewerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  templateUrl: './details-ano.component.html',
  styleUrl: './details-ano.component.css'
})
export class DetailsAnoComponent {

  id: any;
  ano: any;
  events: any;
  users: any;
  activite: any;
  documents: any[] = [];
  isdoc = false;
  docurl: any;
  titredoc: any;
  isSpinner: boolean = false;

  anoForm = new FormGroup({
    budget_cntippee: new FormControl('', Validators.required),
    situation_sctuelle: new FormControl('', Validators.required),
    situation_venir: new FormControl('', Validators.required),
    commentaire: new FormControl('', Validators.required),
  })

  constructor(
    private location: Location,
    private router: ActivatedRoute,
    private anoservice: AnoService,
    private spinner: NgxSpinnerService,
  ){}

  ngOnInit(){
    this.id = this.router.snapshot.paramMap.get('id');
    this.getAno();
  }

  etudeAno(){
    this.isSpinner = true
    if(this.anoForm.valid){
      this.anoservice.etudeAno(this.id, this.anoForm).subscribe(
        data => {
          this.getAno();
          this.isSpinner = false;
          this.openSpinner();
        }, error => {
          console.error(error);
          this.isSpinner = false;
          this.openSpinner();
        }
      )
    }
  }

  validerAno(){
    this.isSpinner = true;
    this.anoservice.validerAno(this.id).subscribe(
      data => {
        this.getAno();
        this.isSpinner = false;
        this.openSpinner();
      }, error => {
        console.error(error);
        this.isSpinner = false;
        this.openSpinner();
      }
    )
  }

  closemodal(){
    const modal = document.getElementById('traitementModal');
    if(modal != null){
      modal.style.display = 'none';
    }
  }

  openmodal(){
    const modal = document.getElementById('traitementModal');
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  openSpinner(){
    if(this.isSpinner){
      this.spinner.show();
    } else {
      setTimeout( () => {
        this.spinner.hide();
      },5000);
    }
  }

  getAno(){
    this.anoservice.getDetailAno(this.id).subscribe(
      data => {
        this.ano = data;
        this.activite = data.activitebudgetannuel;
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
