import { Pedido } from "./Pedido";

export class User {
  nombre : string;
  pedidos : Pedido [];
  isAdmin : boolean;
  token : string;

  constructor (){
    this.pedidos = [];
  }
}