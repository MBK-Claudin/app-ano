import { ProgrammeServiceService } from './../services/programme-service.service';
import { OrganisationService } from './../services/organisation.service';
import { SiteService } from './../services/site.service';
import { FinancementsService } from './../services/financements.service';
import { Component, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-financement',
  templateUrl: './financement.component.html',
  styleUrls: ['./financement.component.css'],
  standalone: true,
  imports:[
    BrowserModule,
    ReactiveFormsModule
  ]

})


export class FinancementComponent implements OnInit {
  @Input() programme_id!: number;

  financements: any[] = [];
  programme: any;
  Sites: any[]=[];
  organisations:any[] = [];
  financementForm: FormGroup;
  isModalOpen: boolean = true;  // Variable pour contrôler l'ouverture du modal
  selectedFinancement: any = null;
  loading: boolean = false;
  errorMessage: string = '';
  montantRestant: number = 0; // Variable pour la soustraction


  constructor(
    private fb: FormBuilder,
    private FinancementsService: FinancementsService,
        private SiteService: SiteService,
        private OrganisationService: OrganisationService,
        private ProgrammeServiceService:ProgrammeServiceService,

  ) {
    this.financementForm = this.fb.group({
      type_financement: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
      partenaire: ['', Validators.required],
      montant_usd: ['', [Validators.required, Validators.min(0)]],
      statut: ['', Validators.required],
      programme_id:this.programme_id
    });
  }

  ngOnInit(): void {
    this.loadFinancements();
    this.getorganisations();
    this.getProgramme()
  }

  loadFinancements(): void {
    this.loading = true;
    this.FinancementsService.getFinancements(this.programme_id).subscribe(
      data => {
        this.financements = data;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Erreur lors du chargement des financements';
        this.loading = false;
      }
    );
  }






  openmodal(){
    const modal = document.getElementById('add_financement');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closeModal(){
    const modal = document.getElementById('add_financement');
    if(modal != null){
      modal.style.display = 'none';
    }
  }

  viewDetails(financement: any): void {
    this.selectedFinancement = financement;  // Sauvegarde les détails
    this.openmodal();  // Ouvre le modal pour afficher les détails
  }

  editFinancement(financement: any): void {
    this.selectedFinancement = financement;
    this.financementForm.patchValue(financement);  // Charge les données dans le formulaire
    this.openmodal();  // Ouvre le modal pour l'édition
  }

  onPrincipalChange(financement: any, index: number): void {
    // Si cette case est cochée, décocher toutes les autres
    if (financement.principal) {
      this.financements.forEach((item, i) => {
        if (i !== index) {
          item.principal = false; // Décocher toutes les autres cases
        }
      });
    }
  }

  getSites(){
    this.SiteService.getSite().subscribe(
      data => {
        this.Sites = data;
      }, error => {
        console.error('Erreur lors du chargement des sites !', error);
      }
    );
  }



  getorganisations(){
    this.OrganisationService.getOrganisations().subscribe(
      data => {
        this.organisations = data;
        console.log('voici les organ', this.organisations)
      }, error => {
        console.log('Erreur lors du chargement de données !', error)
      }
    )
  }

  deleteFinancement(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce financement ?')) {
      this.FinancementsService.deleteFinancement(id).subscribe(
        () => {
          this.financements = this.financements.filter(f => f.id !== id);
          alert('Financement supprimé avec succès');
        },
        error => {
          this.errorMessage = 'Erreur lors de la suppression du financement';
        }
      );
    }
  }

  onSubmit(): void {
    if (this.financementForm.invalid) return;

    const formData = this.financementForm.value;
    this.FinancementsService.createFinancement(formData).subscribe(
      data => {
        this.closeModal();
        // this.financementForm.reset();
        alert('Financement ajouté avec succès');
      },
      error => {
        this.errorMessage = 'Erreur lors de l\'ajout du financement';
      }
    );
  }
  getProgramme(){
    this.ProgrammeServiceService.selectProgramme(this.programme_id).subscribe(data => {
      this.programme = data;
      console.log('le budget financé',this.programme)


    },error => {
      console.error(error);

    });
}


}


