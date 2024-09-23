import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProgrammeComponent } from './details-programme.component';

describe('DetailsProgrammeComponent', () => {
  let component: DetailsProgrammeComponent;
  let fixture: ComponentFixture<DetailsProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsProgrammeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
