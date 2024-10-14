import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnoProgrammeComponent } from './ano-programme.component';

describe('AnoProgrammeComponent', () => {
  let component: AnoProgrammeComponent;
  let fixture: ComponentFixture<AnoProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnoProgrammeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnoProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
