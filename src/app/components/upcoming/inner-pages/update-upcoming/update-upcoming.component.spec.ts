import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUpcomingComponent } from './update-upcoming.component';

describe('UpdateUpcomingComponent', () => {
  let component: UpdateUpcomingComponent;
  let fixture: ComponentFixture<UpdateUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUpcomingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
