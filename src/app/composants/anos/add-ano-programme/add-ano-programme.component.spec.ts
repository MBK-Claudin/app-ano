import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnoProgrammeComponent } from './add-ano-programme.component';

describe('AddAnoProgrammeComponent', () => {
  let component: AddAnoProgrammeComponent;
  let fixture: ComponentFixture<AddAnoProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAnoProgrammeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAnoProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
