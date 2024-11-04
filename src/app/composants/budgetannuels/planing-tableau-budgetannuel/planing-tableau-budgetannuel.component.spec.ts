import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningTableauBudgetannuelComponent } from './planing-tableau-budgetannuel.component';

describe('PlaningTableauBudgetannuelComponent', () => {
  let component: PlaningTableauBudgetannuelComponent;
  let fixture: ComponentFixture<PlaningTableauBudgetannuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaningTableauBudgetannuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaningTableauBudgetannuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
