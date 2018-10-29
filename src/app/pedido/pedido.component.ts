import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Pedido } from '../models/Pedido';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Producto } from '../models/Producto';
import { identifierModuleUrl } from '@angular/compiler';
import { KeyEventsPlugin } from '@angular/platform-browser/src/dom/events/key_events';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  @Input() items: Array<Producto>;
  @Input() pedido: Pedido;
  @Output() close = new EventEmitter();
  @Output() doIt = new EventEmitter();
  @HostListener('window:keyup',['$event'])
  keyEvents(event:KeyboardEvent){
    if(event.keyCode === 13){
      if(this.pedidoForm.touched){
        this.sendEdited();
      }
    }
    if(event.keyCode === 27){
      this.cancelar();
    }
  }
  pedidoForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.pedidoForm = this.fb.group({
      total: this.pedido.total,
      lineaDePedido: this.fb.array([])
    })
    for (let p of this.pedido.lineaDePedido) {
      this.addLine(p.id || 0, p.cantidad, p.producto, p.subtotal);
    }
  }
  get empaForm() {
    return this.pedidoForm.get('lineaDePedido') as FormArray
  }
  getSubtotal(index) {
    return this.pedidoForm.value.lineaDePedido[index].subtotal;
  }
  addLine(id,qtt, prod, sub) {
    let LdP = this.fb.group({
      id: id,
      cantidad: qtt || 1,
      producto: prod || {},
      subtotal: sub || 0,
    })
    this.empaForm.push(LdP);
  }
  getTotal() {
    this.pedidoForm.value.total = 0;
    let pedidos = this.pedidoForm.value.lineaDePedido;
    for (let pedido of pedidos) {
      this.pedidoForm.value.total += pedido.subtotal;
    }
  }
  doSomething(index) {
    let line = this.pedidoForm.value.lineaDePedido[index];
    if (line.cantidad > 0 && line.producto.precio !== undefined) {
      line.subtotal = line.cantidad * line.producto.precio;
    } else {
      line.subtotal = 0;
    }
  }
  sendEdited() {
    for(let p of this.pedidoForm.value.lineaDePedido){
      if(p.cantidad > 100){
        p.cantidad = 100;
        p.subtotal = p.cantidad*p.producto.precio;
      }
    }
    this.getTotal();
    this.doIt.emit(this.pedidoForm.value);
  }
  cancelar() {
    this.close.emit();
  }
}
