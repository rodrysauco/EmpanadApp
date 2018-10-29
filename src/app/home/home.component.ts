import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionService } from '../Services/connection.service';
import { User } from '../models/User';
import { CookieService } from 'ngx-cookie-service';
import { Pedido } from '../models/Pedido';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  circle: boolean;
  userToken: string;
  showMenus: boolean = false;
  @Output() items: Object;
  @Output() usuario: User;
  @Output() editPedido : Pedido;

  constructor(
    private conn: ConnectionService,
    private router: Router,
    private cockie: CookieService
  ) { }

  toggle() {
    this.showMenus = !this.showMenus;
  }
  displayUserInfo(data) {
    this.usuario = new User();
    this.usuario.isAdmin = data.admin;
    this.usuario.nombre = data.nombre;
    this.usuario.pedidos = data.pedidos;
  }
  goToOrder() {
    this.router.navigate(['todayOrders']);
  }
  selectAdm() {
    this.router.navigate(['/changeAdmin']);
  }
  handleError(error) {
    this.circle = false;
    console.log(error);
  }

  redirectSucces(data) {
    this.circle = false;
    this.ngOnInit();
  }
  
  makeThePedido(event) {
    this.circle = true;
    this.conn.sendPedido(event, this.userToken)
      .then(data => this.redirectSucces(data), error => this.handleError(error));
  }
  edition(id){
    let p = this.usuario.pedidos.filter((pedido)=>pedido.id === id);
    this.editPedido = p[0];
  }
  closeModal(){
    this.editPedido = undefined;
  }
  updatePedido(event){
    let pedido = event;
    pedido.id = this.editPedido.id;
    this.conn.updatePedido(pedido,this.userToken)
      .then(()=>{ 
        this.ngOnInit();
        this.closeModal(); },(error)=>this.handleError(error))
  }
  checkStatus() {
    let webToken = this.cockie.get("H0J41DR4D4");
    if (webToken === null || webToken === "") {
      this.router.navigate(['/login']);
    } else {
      this.userToken = webToken;
      this.conn.getUserInfo(this.userToken)
        .then((data) => this.displayUserInfo(data),
          (error) => this.handleError(error));
      this.bringAllProducts();
    }
  }

  receivingProducts(response) {
    let canastas = response.filter(data => data.categoria === 1);
    let empanadas = response.filter(data => data.categoria !== 1);
    this.items = [
      {
        name: "Canastas",
        producto: canastas
      }, {
        name: "Empanadas",
        producto: empanadas
      }

    ];
  }

  bringAllProducts() {
    this.conn.getAllProducts()
      .then(data => this.receivingProducts(data), error => this.handleError(error));
  }

  ngOnInit() {
    this.circle = false;
    console.log("Que miras?? ⊙﹏⊙");
    this.checkStatus();
  }

}
