import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetannuelsComponent } from './budgetannuels.component';

describe('BudgetannuelsComponent', () => {
  let component: BudgetannuelsComponent;
  let fixture: ComponentFixture<BudgetannuelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetannuelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetannuelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
