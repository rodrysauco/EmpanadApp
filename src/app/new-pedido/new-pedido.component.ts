import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { ConnectionService } from '../Services/connection.service';

@Component({
  selector: 'app-new-pedido',
  templateUrl: './new-pedido.component.html',
  styleUrls: ['./new-pedido.component.css']
})
export class NewPedidoComponent implements OnInit {
  @Input() items : Object[];
  @Output() pedido = new EventEmitter();
  @Output() repeat = new EventEmitter();
  pedidoForm : FormGroup;
  total = 0;

  constructor(
    private fb: FormBuilder,
    public snack : MatSnackBar,
    private connection : ConnectionService
    ) { }

  ngOnInit() {
    this.pedidoForm = this.fb.group({
      total : 0,
      lineaDePedido : this.fb.array([])
    })
   }
  
  getTotal(){
    let pedidos = this.pedidoForm.value.lineaDePedido;
    for(let pedido of pedidos){
      this.pedidoForm.value.total += pedido.subtotal;
    }
  }

  getSubtotal(index){
    return this.pedidoForm.value.lineaDePedido[index].subtotal;
  }

  doSomething(index){
    let line = this.pedidoForm.value.lineaDePedido[index];
    if(line.cantidad > 0 && line.producto.precio !== undefined ){
      line.subtotal = line.cantidad * line.producto.precio;
    }
  }
  
  sendRequest(){
    if(this.pedidoForm.value.lineaDePedido.length > 0){
      for(let p of this.pedidoForm.value.lineaDePedido){
        if(p.cantidad > 100){
          p.cantidad = 100;
          p.subtotal = p.cantidad * p.producto.precio;
        }
      }
      this.getTotal();
      if(this.pedidoForm.value.total > 0){
        this.pedido.emit(this.pedidoForm.value);
        this.ngOnInit();
      }else{
        this.snack.open("Pedido vacio","Cerrar", {
          duration : 1500
        });  
      }
    }else{
      this.snack.open("Pedido vacio","Cerrar", {
        duration : 1500
      });
    }
  }

  repeatLast(){
    this.repeat.emit();
  }
  get empaForm(){
    return this.pedidoForm.get('lineaDePedido') as FormArray
  }
  
  addLine(){
    let LdP = this.fb.group({
      cantidad : 1,
      producto : {},
      subtotal : 0,
    })
    this.empaForm.push(LdP);
  }

  deleteLine(i){
    this.empaForm.removeAt(i);
  }

  


  
}
