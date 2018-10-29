import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatProgressBarModule, MatSnackBarModule, MatExpansionModule, MatTableModule, MatTooltipModule, MatListModule, MatProgressSpinnerModule} from "@angular/material"

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import { NewPedidoComponent } from './new-pedido/new-pedido.component';
import { PedidosHistoryComponent } from './pedidos-history/pedidos-history.component';
import { PedidoComponent } from './pedido/pedido.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AprovingOrdersComponent } from './aproving-orders/aproving-orders.component';
import { ChangePasswordComponent } from './change-password/change-password.component'
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path : "", redirectTo : "/home", pathMatch: "full"},
  { path : "home", component : HomeComponent},
  { path : "login", component : LoginComponent},
  { path : "changeAdmin", component : AdminPanelComponent},
  { path : "todayOrders", component : AprovingOrdersComponent},
  { path : 'register', component: RegisterComponent},
  { path : 'chgPwd', component : ChangePasswordComponent},
  { path : 'chgPwd/:token', component : ChangePasswordComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NewPedidoComponent,
    PedidosHistoryComponent,
    PedidoComponent,
    AdminPanelComponent,
    AprovingOrdersComponent,
    ChangePasswordComponent,
    RegisterComponent
    ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTableModule,
    MatTooltipModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
