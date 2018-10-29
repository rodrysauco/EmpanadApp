import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pedidos-history',
  templateUrl: './pedidos-history.component.html',
  styleUrls: ['./pedidos-history.component.css']
})
export class PedidosHistoryComponent implements OnInit {
  @Input() history = Array();
  @Output() edit = new EventEmitter();
  initialized = false;
  columnsToDisplay = ["Gusto","Cantidad","P.Unitario","Subtotal"];
  
  replaceIt(){
    for(let pedido of this.history){
      let array = pedido.fecha.split("-")
      let year = array[0];
      let month = array[1];
      let day = array[2];
      pedido.fecha = day + "/" + month + "/" + year;
      for(let ldp of pedido.lineaDePedido){
        if(ldp.producto.categoria === 1){
          ldp.producto.categoria = "Canasta";
        }else{
          ldp.producto.categoria = "Empanada";
        }
      }
    }
    this.initialized = true;
  }
  editar(id:number){
    this.edit.emit(id);
  }
  constructor() { }
  ngOnChanges(){
    if(this.initialized){
      this.replaceIt();
      console.log("Actualizando");
    }
  }
  ngOnInit() {
    this.replaceIt();
  }

}
