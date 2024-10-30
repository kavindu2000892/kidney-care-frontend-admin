import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSummeryComponent } from './update-summery.component';

describe('UpdateSummeryComponent', () => {
  let component: UpdateSummeryComponent;
  let fixture: ComponentFixture<UpdateSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSummeryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
