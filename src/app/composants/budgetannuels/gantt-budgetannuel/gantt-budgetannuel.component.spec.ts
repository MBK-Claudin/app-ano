import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttBudgetannuelComponent } from './gantt-budgetannuel.component';

describe('GanttBudgetannuelComponent', () => {
  let component: GanttBudgetannuelComponent;
  let fixture: ComponentFixture<GanttBudgetannuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttBudgetannuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GanttBudgetannuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
