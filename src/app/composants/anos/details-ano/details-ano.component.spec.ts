import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAnoComponent } from './details-ano.component';

describe('DetailsAnoComponent', () => {
  let component: DetailsAnoComponent;
  let fixture: ComponentFixture<DetailsAnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsAnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
