import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnoComponent } from './ano.component';

describe('AnoComponent', () => {
  let component: AnoComponent;
  let fixture: ComponentFixture<AnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
