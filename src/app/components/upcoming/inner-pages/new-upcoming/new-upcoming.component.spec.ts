import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpcomingComponent } from './new-upcoming.component';

describe('NewUpcomingComponent', () => {
  let component: NewUpcomingComponent;
  let fixture: ComponentFixture<NewUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUpcomingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
