import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnoBudgetannuelComponent } from './ano-budgetannuel.component';

describe('AnoBudgetannuelComponent', () => {
  let component: AnoBudgetannuelComponent;
  let fixture: ComponentFixture<AnoBudgetannuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnoBudgetannuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnoBudgetannuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
