import { UserServiceService } from './../../../services/user-service.service';
import { Component } from '@angular/core';
import { Teste } from '../../../interfaces/teste';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.css'
})
export class TachesComponent {

  // Messages simulés avec titres de projets et statuts en tant que badge
  messages: Teste[] = [
    { id: 1, subject: 'Traitement ANO', badge: 'en retard', description: 'Projet Gestion des ANO', hasAttachment: true, date: '12.14.2023 14:45', unread: true },
    { id: 2, subject: 'Livrables', badge: 'à traiter', description: 'Projet Suivi des Livrables', hasAttachment: false, date: '12.14.2023 14:45', unread: true },
    { id: 3, subject: 'Traitement ANO', badge: 'tâche urgente', description: 'Projet Migration Cloud', hasAttachment: false, date: '12.14.2023 14:45', unread: false },
    { id: 4, subject: 'Traitement ANO', badge: 'à traiter', description: 'Projet Amélioration des Performances', hasAttachment: false, date: '12.14.2023 14:45', unread: false },
    { id: 5, subject: 'Livrables', badge: 'en retard', description: 'Projet Intégration de SharePoint', hasAttachment: false, date: '12.14.2023 14:45', unread: false },
    { id: 6, subject: 'Livrables', badge: 'tâche urgente', description: 'Projet Déploiement ERP', hasAttachment: true, date: '12.14.2023 14:45', unread: false },
    { id: 7, subject: 'Mission suivi Evaluation', badge: 'à traiter', description: 'Projet Suivi de l\'évaluation des équipes', hasAttachment: true, date: '12.14.2023 14:45', unread: false },
    { id: 8, subject: 'Mission suivi Evaluation', badge: 'en retard', description: 'Projet Refactoring du code', hasAttachment: false, date: '12.14.2023 14:45', unread: false },
    { id: 9, subject: 'Traitement ANO', badge: 'à traiter', description: 'Projet Automatisation des tests', hasAttachment: false, date: '12.14.2023 14:45', unread: false },
    { id: 10, subject: 'Mission suivi Evaluation', badge: 'tâche urgente', description: 'Projet Sécurisation des Données', hasAttachment: true, date: '12.14.2023 14:45', unread: false },
  ];

  userid: any;
  taches: any[] = [];
  events: any[] = [];
  anos: any[] = [];
  livrables: any[] = [];
  activites: any[] = [];

  constructor(
    private UserService: UserServiceService
  ){}

  ngOnInit(){
    this.getTaches();
  }

  getTaches(){
    this.userid = localStorage.getItem('user_id');
    this.UserService.getTaches(this.userid).subscribe(
      data => {
        this.taches = data;
        this.anos = data.ano;
        this.activites = data.jalon;
        this.livrables = data.livrable
        console.log(this.taches);
      }, error => {
        console.error(error);
      }
    )
  }

  

}
