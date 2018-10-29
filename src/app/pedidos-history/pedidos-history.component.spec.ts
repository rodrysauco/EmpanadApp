import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosHistoryComponent } from './pedidos-history.component';

describe('PedidosHistoryComponent', () => {
  let component: PedidosHistoryComponent;
  let fixture: ComponentFixture<PedidosHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
