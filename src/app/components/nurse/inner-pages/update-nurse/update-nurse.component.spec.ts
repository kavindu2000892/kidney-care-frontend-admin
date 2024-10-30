import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNurseComponent } from './update-nurse.component';

describe('UpdateNurseComponent', () => {
  let component: UpdateNurseComponent;
  let fixture: ComponentFixture<UpdateNurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateNurseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
