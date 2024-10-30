import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSignsComponent } from './new-signs.component';

describe('NewSignsComponent', () => {
  let component: NewSignsComponent;
  let fixture: ComponentFixture<NewSignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
