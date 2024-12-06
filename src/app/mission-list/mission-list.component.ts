import { Component, OnInit, input } from '@angular/core';
import { MissionService } from '../services/mission.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { RouterModule } from '@angular/router';
import { SiteService } from '../services/site.service';
import { ActiviteService } from '../services/activite.service';
import { UserServiceService } from '../services/user-service.service';
import { DetailMissionComponent } from '../detail-mission/detail-mission.component';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css'],
  standalone: true,
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    NgxDocViewerModule,
    RouterModule,
    ReactiveFormsModule,

],
})
export class MissionListComponent implements OnInit {
  readonly programme_id = input.required<number>();

  missions: any[] = [];
  filterMission: any;
  searchText: any = '';
  sites: any[] = [];
  users: any[] = [];
  activite: any[] = [];
  successMessage: string | null = null;
  loading: boolean = false;


  // Formulaire pour la création d'une mission
  missionForm = new FormGroup({
    libelle: new FormControl('', Validators.required),
    objectif: new FormControl('', Validators.required),
    activite: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required),
    definition_objectif_specifique: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    statut: new FormControl('', Validators.required),
    site: new FormControl('', Validators.required),
  });
item: any;

  // Message de succès

  constructor(
    private missionService: MissionService,
    private siteService: SiteService,
    private activiteService: ActiviteService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getSites();
    this.getActivites();
    this.loadMissions();
  }


  // Charger les missions existantes
// mission-list.component.ts

loadMissions(): void {
  const programme_id = this.programme_id();
  if (programme_id) {
    this.loading = true;
    this.missionService.getMissions(programme_id).subscribe(
      (data) => {
        // Assurez-vous que data est un tableau
        if (Array.isArray(data)) {
          this.missions = data.reverse();
          this.filterMission = [...this.missions];
          this.loading = false;

          console.log('Missions chargées :', this.missions);
        } else {
          console.error('Données incorrectes reçues :', data);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des missions', error);
      }
    );
  } else {
    console.error('programme_id is not defined');
  }
}



  // Récupérer la liste des utilisateurs
  getUsers(): void {
    this.userService.getUser().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  // Récupérer la liste des sites
  getSites(): void {
    this.siteService.getSite().subscribe(
      (data) => {
        this.sites = data;
        console.log('Sites chargés :', this.sites);
      },
      (error) => {
        console.error('Erreur lors du chargement des sites', error);
      }
    );
  }

  // Récupérer la liste des activités
  getActivites(): void {
    this.activiteService.getActivite().subscribe(
      (data) => {
        this.activite = data;
        console.log('Activités chargées :', this.activite);
      },
      (error) => {
        console.error('Erreur lors du chargement des activités', error);
      }
    );
  }

  // Méthode d'ouverture du modal
  openModal(): void {
    const modal = document.getElementById('add_mission');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  filterMissions() {
    if (this.searchText === '') {
      // Si la recherche est vide, afficher toutes les missions
      this.filterMission = [...this.missions];  // Affiche toutes les missions
    } else {
      // Si une recherche est effectuée, filtrer les missions
      this.filterMission = this.missions.filter(mission => {
        const libelle = mission.libelle ? mission.libelle.toLowerCase() : '';
        return libelle.includes(this.searchText.toLowerCase());
      });
    }
  }



  // Méthode de fermeture du modal
  closeModal(): void {
    const modal = document.getElementById('add_mission');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Méthode de soumission du formulaire
  onSubmit(): void {
    if (this.missionForm.valid) {
      const mission = new FormData();
      console.log('Données du formulaire :', this.missionForm.value);

      const libelle = this.missionForm.value.libelle;
      const objectif = this.missionForm.value.objectif;
      const user = this.missionForm.value.user;
      const definition_objectif_specifique = this.missionForm.value.definition_objectif_specifique;
      const date_debut = this.missionForm.value.date_debut;
      const statut = this.missionForm.value.statut;
      const site = this.missionForm.value.site;
      const activite = this.missionForm.value.activite;
      const programme = this.programme_id();

      mission.append('objectif', objectif ? objectif.toString() : '');
      mission.append('libelle', libelle ? libelle.toString() : '');
      mission.append('definition_objectif_specifique', definition_objectif_specifique ? definition_objectif_specifique.toString() : '');
      mission.append('date_debut', date_debut ? date_debut.toString() : '');
      mission.append('statut', statut ? statut.toString() : '');
      mission.append('activite', activite ? parseInt(activite).toString() : '');
      mission.append('user', user ? parseInt(user).toString() : '');
      mission.append('site', site ? parseInt(site).toString() : '');
      mission.append('programme', this.programme_id().toString());

      // Envoi de la requête pour créer une mission
      this.missionService.createMission(mission).subscribe(
        (data) => {
          // Afficher le message de succès

          this.successMessage = 'Mission enregistrée avec succès!';
          this.closeModal();
          // Masquer le message après 5 secondes
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
          console.log(data);
          this.loadMissions()        },
        (error) => {
          console.log("Erreur lors de l'insertion de l'impact", error);
        }
      );
    }
  }



  // Classe CSS basée sur l'échéance
  getEcheanceClass(date_debut: string): string {
    const status = this.calculateEcheance(date_debut);
    if (status === 'A réaliser') {
      return 'text-success fw-bold';
    } else if (status === 'Bientôt') {
      return 'text-warning fw-bold';
    } else if (status === 'Retard') {
      return 'text-danger fw-bold';
    }
    return '';
  }



  // Calcul de l'échéance d'une mission
  calculateEcheance(date_debut: string): string {
    const today = new Date();
    const startDate = new Date(date_debut);
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays > 14) {
      return 'A réaliser';
    } else if (diffDays <= 14 && diffDays >= 0) {
      return 'Bientôt';
    } else {
      return 'Retard';
    }
  }



}
