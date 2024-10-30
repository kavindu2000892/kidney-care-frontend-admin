import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVisitsComponent } from './update-visits.component';

describe('UpdateVisitsComponent', () => {
  let component: UpdateVisitsComponent;
  let fixture: ComponentFixture<UpdateVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVisitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
