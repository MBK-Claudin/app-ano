import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JalonBudgetannuelComponent } from './jalon-budgetannuel.component';

describe('JalonBudgetannuelComponent', () => {
  let component: JalonBudgetannuelComponent;
  let fixture: ComponentFixture<JalonBudgetannuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JalonBudgetannuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JalonBudgetannuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
