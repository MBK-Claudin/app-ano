import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgrammeComponent } from './edit-programme.component';

describe('EditProgrammeComponent', () => {
  let component: EditProgrammeComponent;
  let fixture: ComponentFixture<EditProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProgrammeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
