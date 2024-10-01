import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnoComponent } from './add-ano.component';

describe('AddAnoComponent', () => {
  let component: AddAnoComponent;
  let fixture: ComponentFixture<AddAnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
