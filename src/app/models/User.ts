import { Pedido } from "./Pedido";

export class User {
  nombre: string;
  pedidos: Pedido[];
  isAdmin: boolean;
  availability: boolean;
  token: string;

  constructor() {
    this.pedidos = [];
  }
}