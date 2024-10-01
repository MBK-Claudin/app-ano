import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBudgetannuelComponent } from './details-budgetannuel.component';

describe('DetailsBudgetannuelComponent', () => {
  let component: DetailsBudgetannuelComponent;
  let fixture: ComponentFixture<DetailsBudgetannuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBudgetannuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsBudgetannuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
