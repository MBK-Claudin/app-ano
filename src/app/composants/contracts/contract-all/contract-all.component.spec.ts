import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAllComponent } from './contract-all.component';

describe('ContractAllComponent', () => {
  let component: ContractAllComponent;
  let fixture: ComponentFixture<ContractAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
