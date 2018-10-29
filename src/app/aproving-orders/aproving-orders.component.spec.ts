import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovingOrdersComponent } from './aproving-orders.component';

describe('AprovingOrdersComponent', () => {
  let component: AprovingOrdersComponent;
  let fixture: ComponentFixture<AprovingOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprovingOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprovingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
