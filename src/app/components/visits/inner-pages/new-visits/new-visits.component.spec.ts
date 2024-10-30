import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVisitsComponent } from './new-visits.component';

describe('NewVisitsComponent', () => {
  let component: NewVisitsComponent;
  let fixture: ComponentFixture<NewVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVisitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
