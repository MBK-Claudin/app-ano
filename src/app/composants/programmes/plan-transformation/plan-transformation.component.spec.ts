import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTransformationComponent } from './plan-transformation.component';

describe('PlanTransformationComponent', () => {
  let component: PlanTransformationComponent;
  let fixture: ComponentFixture<PlanTransformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanTransformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanTransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
