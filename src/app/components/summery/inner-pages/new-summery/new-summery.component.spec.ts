import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSummeryComponent } from './new-summery.component';

describe('NewSummeryComponent', () => {
  let component: NewSummeryComponent;
  let fixture: ComponentFixture<NewSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSummeryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
