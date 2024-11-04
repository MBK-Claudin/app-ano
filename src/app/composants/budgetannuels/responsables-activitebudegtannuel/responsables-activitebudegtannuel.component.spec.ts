import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablesActivitebudegtannuelComponent } from './responsables-activitebudegtannuel.component';

describe('ResponsablesActivitebudegtannuelComponent', () => {
  let component: ResponsablesActivitebudegtannuelComponent;
  let fixture: ComponentFixture<ResponsablesActivitebudegtannuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsablesActivitebudegtannuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsablesActivitebudegtannuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
