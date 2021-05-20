import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmomentComponent } from './addmoment.component';

describe('AddmomentComponent', () => {
  let component: AddmomentComponent;
  let fixture: ComponentFixture<AddmomentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmomentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
