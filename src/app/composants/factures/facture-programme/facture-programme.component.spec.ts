import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureProgrammeComponent } from './facture-programme.component';

describe('FactureProgrammeComponent', () => {
  let component: FactureProgrammeComponent;
  let fixture: ComponentFixture<FactureProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureProgrammeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactureProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
