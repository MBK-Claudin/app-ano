import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjectifComponent } from './add-objectif.component';

describe('AddObjectifComponent', () => {
  let component: AddObjectifComponent;
  let fixture: ComponentFixture<AddObjectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddObjectifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
