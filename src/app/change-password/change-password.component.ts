import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ConnectionService } from '../Services/connection.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  circle : boolean;
  input : string;
  icon : string;
  token : string;
  flag = false;
  constructor(
    private router : Router,
    private route : ActivatedRoute,
    public snack: MatSnackBar,
    private conn: ConnectionService
  ) { }

  mailPart = new FormGroup({
    'mail': new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });
  
  passPart = new FormGroup({
    "oldPass": new FormControl("", [
      Validators.required
    ]),
    "newPass": new FormControl("", [
      Validators.required
    ]),
  })
  get mail() { return this.mailPart.get('mail'); };
  get old() { return this.passPart.get("oldPass"); };
  get new() { return this.passPart.get("newPass"); };

  showPass(){
    if(this.input === "password"){
      this.input = "text";
      this.icon = "visibility_off"
    }else{
      this.input = "password";
      this.icon = "visibility";
    }
  }
  return(){
    this.router.navigate(['/login']);
  }
  handleError(error){
    this.circle = false;
    if(error.status == 0){
      this.snack.open("En este momento el sistema se encuentra sin funcionar", "Cerrar");
    }else{
      this.snack.open(error.error.message, "Cerrar");
    }
  }
  succes(i){
    this.circle = false;
    if(i === 1){
      this.snack.open("Mail enviado","Cerrar");
    }else{
      this.snack.open("Contraseña actualizada","Cerrar");
    }
  }
  makeRequest(){
    if(this.mail.valid){
      this.circle = true;
      this.conn.changePassRequest(this.mail.value)
      .then(()=>this.succes(1),(error)=>this.handleError(error));
    }
  }

  changePass(){
    if(this.old.value != "" && this.new.value != ""){
      this.circle = true;
      this.conn.changePassResponse(this.token,this.old.value,this.new.value)
      .then((data)=>this.succes(0),(error)=>this.handleError(error));
    }
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");
    this.circle = false;
    if(this.token){
      this.input = "password";
      this.icon ="visibility";
      this.flag = true;
    }
  }

  ngOnDestroy(){
    this.snack.dismiss();
  }

}
