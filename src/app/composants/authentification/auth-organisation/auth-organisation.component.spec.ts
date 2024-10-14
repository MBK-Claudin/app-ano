import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOrganisationComponent } from './auth-organisation.component';

describe('AuthOrganisationComponent', () => {
  let component: AuthOrganisationComponent;
  let fixture: ComponentFixture<AuthOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthOrganisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
