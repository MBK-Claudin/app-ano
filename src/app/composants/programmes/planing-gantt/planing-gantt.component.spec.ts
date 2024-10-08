import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningGanttComponent } from './planing-gantt.component';

describe('PlaningGanttComponent', () => {
  let component: PlaningGanttComponent;
  let fixture: ComponentFixture<PlaningGanttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaningGanttComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaningGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
