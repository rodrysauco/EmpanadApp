import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ConnectionService } from '../Services/connection.service';
import { CookieService } from 'ngx-cookie-service';
import { ERROR_COLLECTOR_TOKEN } from '@angular/platform-browser-dynamic/src/compiler_factory';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private conn: ConnectionService,
    private router: Router,
    public snack: MatSnackBar,
    private cockie: CookieService
  ) { }

  loginForm = new FormGroup({
    'mailForm': new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    'password': new FormControl('', [
      Validators.required
    ]),
  });
  get password() { return this.loginForm.get('password'); }

  get mailForm() { return this.loginForm.get('mailForm'); }

  catchToken(response) {
    this.cockie.set("H0J41DR4D4", response, 0.5);
    this.snack.dismiss();
    this.router.navigate(["/home"]);
  }
  handleError(error) {
    if (error.status == 0) {
      this.snack.open("En este momento el sistema se encuentra sin funcionar", "Cerrar");
    } else {
      let e = JSON.parse(error.error);
      this.snack.open(e.message, "Cerrar");
    }
  }

  doLogin() {
    if (this.mailForm.valid) {
      if (this.password.valid) {
        this.conn.login(this.mailForm.value, this.password.value)
          .then(data => this.catchToken(data), error => this.handleError(error));
      } else {
        this.snack.open("Introduzca una contraseña", "Cerrar", {
          duration: 1500
        });
      }
    } else {
      this.snack.open("Introduzca un mail", "Cerrar", {
        duration: 1500
      });
    }
  }
  register() {
    this.router.navigate(['/register']);
  }
  ngOnInit() {
    let token = localStorage.getItem("H0J41DR4D4");
    if (token !== null) {
      if (token !== "") {
        this.router.navigate(['/home'])
      }
    }
  }
  ngOnDestroy(){
    this.snack.dismiss();
  }

}
