import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/User';
import { ConnectionService } from '../Services/connection.service';
import { Pedido } from '../models/Pedido';
import { LineaPedido } from '../models/LineaPedido';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-aproving-orders',
  templateUrl: './aproving-orders.component.html',
  styleUrls: ['./aproving-orders.component.css']
})
export class AprovingOrdersComponent implements OnInit {
  usuario: User;
  users: User[] = [];
  orders = [];
  total = 0;
  showMenus: boolean = false;

  columnsToDisplay = ["Gusto", "Cantidad"];

  constructor(
    private conn: ConnectionService,
    private router: Router,
    public snack: MatSnackBar,
    private cookie : CookieService
  ) { }
  ngOnInit() {
    this.checkStatus();
    this.bringOrders();
  }
  /*On init functions*/
  checkStatus() {
    let webToken = this.cookie.get("H0J41DR4D4");
    if (webToken === null || webToken === "") {
      this.router.navigate(['/login']);
    } else {
      this.conn.getUserInfo(webToken)
        .then((data) => this.displayUserInfo(data),
          (error) => this.handleError(error));
    }
  }
  displayUserInfo(data) {
    this.usuario = new User();
    this.usuario.isAdmin = data.admin;
    this.usuario.nombre = data.nombre;
    if (this.usuario.isAdmin !== true) {
      this.router.navigate(['/home']);
    }
  }
  bringOrders() {
    this.conn.getNewOrders()
      .then(data => this.displayOrders(data), err => this.handleError(err));
  }
  displayOrders(data) {
    for (let pedido of data) {
      let p = new Pedido();
      p.fecha = pedido.fecha;
      p.id = pedido.id;
      p.total = pedido.total;
      this.total += p.total;
      for (let linea of pedido.pedido) {
        let l = new LineaPedido();
        l.cantidad = linea.cantidad;
        l.producto = linea.producto;
        l.subtotal = linea.subtotal;
        p.lineaDePedido.push(l);
      }
      let user = new User();
      user.nombre = pedido.user.nombre;
      user.pedidos.push(p);
      this.users.push(user);
    }
    this.showOrders();
  }
  showOrders() {
    let canasta = new Array();
    let empanada = [];
    for (let user of this.users) {
      for (let pedido of user.pedidos[0].lineaDePedido) {
        if (pedido.producto.categoria === 2) {
          let aux = empanada.find(valor => valor.id === pedido.producto.id);
          if (aux !== undefined) {
            aux.cantidad += pedido.cantidad; 
          } else {
            let e = {
              name: pedido.producto.name,
              id: pedido.producto.id,
              cantidad: pedido.cantidad,
              cat: pedido.producto.categoria,
            }
            empanada.push(e);
          }
        } else {
          let aux = canasta.find(valor => valor.id === pedido.producto.id);
          if (aux !== undefined) {
            aux.cantidad += pedido.cantidad;
          } else {
            let e = {
              name: pedido.producto.name,
              id: pedido.producto.id,
              cantidad: pedido.cantidad,
              cat: pedido.producto.categoria,
            }
            canasta.push(e);
          }
        }
      }
    }
    this.orders.push(canasta);
    this.orders.push(empanada);
  }
  handleError(error) {
    console.log(error);
  }

  submitedOrder(){
    this.snack.open("Actualizando estado de ordenes...");
    let ids = [];
    for(let user of this.users){
      for(let pedido of user.pedidos){
        ids.push(pedido.id);
      }
    }
    this.conn.changeOrderStatus(ids)
      .then(()=>this.goHome(),error=>this.handleError(error));

  }

  /*Redirect functions*/
  toggle() {
    this.showMenus = !this.showMenus;
  }
  changeAdmin() {
    this.router.navigate(['changeAdmin']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  ngOnDestroy(){
    this.snack.dismiss();
  }

}
