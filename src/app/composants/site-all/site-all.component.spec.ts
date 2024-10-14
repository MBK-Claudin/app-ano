import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAllComponent } from './site-all.component';

describe('SiteAllComponent', () => {
  let component: SiteAllComponent;
  let fixture: ComponentFixture<SiteAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
