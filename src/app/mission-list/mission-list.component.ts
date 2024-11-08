import { Component, OnInit } from '@angular/core';
import { MissionService } from '../services/mission.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css'],
  standalone:true,
  imports:[
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    NgxDocViewerModule,
  ],
})
export class MissionListComponent implements OnInit {
  missions: any[] = [];
  filterMission: any;
  searchText: any;

  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.missionService.getMissions().subscribe(
      (data) => {
        this.missions = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des missions', error);
      }
    );
  }

  filterProgrammes() {
    this.filterMission = this.missions.filter(miss => {
        const objectif = miss.libelle ? miss.libelle.toLowerCase() : '';
        return objectif.includes(this.searchText.toLowerCase());
    });
  }
}
