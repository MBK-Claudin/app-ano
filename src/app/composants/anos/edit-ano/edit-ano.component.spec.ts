import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnoComponent } from './edit-ano.component';

describe('EditAnoComponent', () => {
  let component: EditAnoComponent;
  let fixture: ComponentFixture<EditAnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
