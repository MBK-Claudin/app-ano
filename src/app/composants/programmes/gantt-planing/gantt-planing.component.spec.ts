import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttPlaningComponent } from './gantt-planing.component';

describe('GanttPlaningComponent', () => {
  let component: GanttPlaningComponent;
  let fixture: ComponentFixture<GanttPlaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttPlaningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GanttPlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
