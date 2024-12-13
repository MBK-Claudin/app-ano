import { routes } from '../app.routes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-detail-mission',
  templateUrl: './detail-mission.component.html',
  styleUrls: ['./detail-mission.component.css'],
  standalone: true
})
export class DetailMissionComponent implements OnInit {
  id: string | null = null;
  mission: any = {};
  loading: boolean = true;
  programmeId: any;

  constructor(
    private route: ActivatedRoute,
    private missionService: MissionService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getMissionDetails(this.id);
    }
  }

  getMissionDetails(id: string): void {
    this.missionService.getdetailMission(id).subscribe(data => {
      this.mission = data;
      this.loading = false;
    }, error => {
      console.error('Erreur lors du chargement : ', error);
      this.loading = false;
    });
  }
}

