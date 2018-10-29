import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from '../Services/connection.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+')
    ]),
    'mail': new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
  });
  get name() { return this.registerForm.get('name'); }
  get mail() { return this.registerForm.get('mail'); }
  get pass() { return this.registerForm.get('password'); }

  constructor(
    private router : Router,
    public snack: MatSnackBar,
    private conn: ConnectionService
  ) { }

  doRegister(){
    this.conn.registerUser(this.name.value,this.mail.value,this.pass.value)
      .then(data=>console.log(data),error=>this.handleError(error));
  }

  handleError(error){
    if(error.status == 0){
      this.snack.open("En este momento el sistema se encuentra sin funcionar", "Cerrar");
    } else {
      let e = JSON.parse(error.error);
      this.snack.open(e.message, "Cerrar");
    }
  }
  goLogin(){
    this.router.navigate(['/login']);
  }
  ngOnDestroy(){
    this.snack.dismiss();
  }
  ngOnInit() {
  }

}
