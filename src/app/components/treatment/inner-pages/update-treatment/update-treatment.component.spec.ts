import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTreatmentComponent } from './update-treatment.component';

describe('UpdateTreatmentComponent', () => {
  let component: UpdateTreatmentComponent;
  let fixture: ComponentFixture<UpdateTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTreatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
