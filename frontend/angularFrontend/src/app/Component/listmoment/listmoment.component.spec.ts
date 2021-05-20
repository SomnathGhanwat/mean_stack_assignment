import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmomentComponent } from './listmoment.component';

describe('ListmomentComponent', () => {
  let component: ListmomentComponent;
  let fixture: ComponentFixture<ListmomentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmomentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
