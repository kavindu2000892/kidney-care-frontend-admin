import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSignsComponent } from './update-signs.component';

describe('UpdateSignsComponent', () => {
  let component: UpdateSignsComponent;
  let fixture: ComponentFixture<UpdateSignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
