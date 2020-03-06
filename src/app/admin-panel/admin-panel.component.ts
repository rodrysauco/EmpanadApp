import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/User';
import { ConnectionService } from '../Services/connection.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  usuario: User;
  users: User[];
  showMenus: boolean = false;

  constructor(
    private conn: ConnectionService,
    private router: Router,
    public snack: MatSnackBar,
    private cookie: CookieService
  ) { }

  displayUserInfo(data) {
    this.usuario = new User();
    this.usuario.isAdmin = data.admin;
    this.usuario.nombre = data.nombre;
    this.usuario.token = data.token;
    if (this.usuario.isAdmin !== true) {
      this.router.navigate(['/home']);
    }
  }

  succes(data) {
    this.snack.dismiss();
    this.router.navigate(['/home']);
  }

  makeAdmin(token) {
    this.snack.open("Realizando el cambio, en breve seras redirigido");
    this.conn.makeAdmin(this.usuario.token, token)
      .then(data => this.succes(data), error => this.handleError(error));
  }
  bringAllUsers() {
    this.conn.getAllUsers()
      .then(data => this.displayUsers(data), error => this.handleError(error));
  }

  displayUsers(data) {
    this.users = [];
    for (let row of data) {
      if (row.token != this.usuario.token) {
        let user = new User();
        user.isAdmin = row.admin;
        user.nombre = row.nombre;
        user.token = row.token;
        user.availability = row.availability;
        this.users.push(user);
      }
    }
  }

  handleError(error) {
    console.log(error);
  }

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
  ngOnInit() {
    this.checkStatus();
    this.bringAllUsers();
  }

  toggle() {
    this.showMenus = !this.showMenus;
  }
  goToOrder() {
    this.router.navigate(['todayOrders']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
