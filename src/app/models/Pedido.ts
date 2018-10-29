import { LineaPedido } from "./LineaPedido";

export class Pedido {
  id : number;
  total : number;
  lineaDePedido : LineaPedido[];
  fecha : Date;

  constructor () {
    this.lineaDePedido = [];
    this.total = 0;
  }
}