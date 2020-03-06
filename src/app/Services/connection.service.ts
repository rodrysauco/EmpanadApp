import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  urlBase = "//10.160.6.196:8080/";
  constructor(
    private http: HttpClient
  ) { }

  header = new HttpHeaders({
    "Content-Type": "application/json;charset=UTF-8"
  })
  /* Orders */
  getNewOrders() {
    return this.http.get(this.urlBase + "pedido/").toPromise();
  }

  changeOrderStatus(pedidos) {
    return this.http.put(this.urlBase + "pedido/", pedidos).toPromise();
  }

  getAllProducts() {
    return this.http.get(this.urlBase + "productos/").toPromise();
  }

  sendPedido(pedido, token) {
    return this.http.post(this.urlBase + "pedido/" + token, pedido, { headers: this.header }).toPromise();
  }

  repeatLastOrder (token : string){
    let header = new HttpHeaders({
      "token": token
    })
    return this.http.get(this.urlBase + "pedido/repeatLast/",{headers : header}).toPromise();
  }

  updatePedido(pedido, token) {
    for (let p of pedido.lineaDePedido) {
      if (p.producto.categoria == "Canasta") {
        p.producto.categoria = 1;
      } else {
        p.producto.categoria = 2;
      }
    }
    return this.http.put(this.urlBase + "pedido/" + token, pedido).toPromise();
  }
 /* Login and User */
  login(mail: string, pass: string) {
    let header = new HttpHeaders({
      "mail": mail,
      "password": btoa(pass)
    })
    return this.http.get(this.urlBase + "user/", { headers: header, responseType: "text" }).toPromise();
  }

  registerUser(nombre: string, mail: string, pass: string) {
    let ob = {
      "nombre": nombre,
      "mail": mail,
      "password": btoa(pass)
    }
    return this.http.post(this.urlBase + "user/", ob, { responseType: "text" }).toPromise();
  }

  getAllUsers() {
    return this.http.get(this.urlBase + "user/all").toPromise();
  }

  getUserInfo(token: string) {
    return this.http.get(this.urlBase + "user/" + token).toPromise();
  }

  makeAdmin(admin, newAdmin) {
    return this.http.put(this.urlBase + "user/" + admin, newAdmin).toPromise();
  }

  changePassRequest(mail) {
    let header = new HttpHeaders({
      "mail": mail
    });
    return this.http.get(this.urlBase + "user/auth", { headers: header }).toPromise();
  }

  changePassResponse(token, oldPass, newPass) {
    let header = new HttpHeaders({
      "oldPass": btoa(oldPass),
      "newPass": btoa(newPass),
      "token": token
    })
    return this.http.put(this.urlBase + "user/", null, { headers: header }).toPromise();
  }
}
