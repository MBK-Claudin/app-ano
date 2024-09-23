import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObjectifComponent } from './edit-objectif.component';

describe('EditObjectifComponent', () => {
  let component: EditObjectifComponent;
  let fixture: ComponentFixture<EditObjectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditObjectifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
