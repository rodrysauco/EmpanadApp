import { Producto } from "./Producto";

export class LineaPedido {
  id: number;
  cantidad: number;
  producto: Producto;
  subtotal: number;

  constructor() { }
}