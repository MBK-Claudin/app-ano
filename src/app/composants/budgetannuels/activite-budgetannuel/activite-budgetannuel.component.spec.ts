import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteBudgetannuelComponent } from './activite-budgetannuel.component';

describe('ActiviteBudgetannuelComponent', () => {
  let component: ActiviteBudgetannuelComponent;
  let fixture: ComponentFixture<ActiviteBudgetannuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiviteBudgetannuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiviteBudgetannuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
