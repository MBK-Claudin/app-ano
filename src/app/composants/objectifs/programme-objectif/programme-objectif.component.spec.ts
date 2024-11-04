import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeObjectifComponent } from './programme-objectif.component';

describe('ProgrammeObjectifComponent', () => {
  let component: ProgrammeObjectifComponent;
  let fixture: ComponentFixture<ProgrammeObjectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeObjectifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammeObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
