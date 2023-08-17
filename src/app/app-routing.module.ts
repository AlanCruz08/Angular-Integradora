import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/secure/inicio/inicio.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegistrerComponent } from './components/public/registrer/registrer.component';
import { DashboardComponent } from './components/secure/dashboard/dashboard.component';
import { EquipoComponent } from './components/secure/equipo/equipo.component';
import { TemperaturaComponent } from './components/sensores/temperatura/temperatura.component';
import { HumedadComponent } from './components/sensores/humedad/humedad.component';
import { HumoComponent } from './components/sensores/humo/humo.component';
import { AlcoholComponent } from './components/sensores/alcohol/alcohol.component';
import { PirComponent } from './components/sensores/pir/pir.component';
import { DistanciaComponent } from './components/sensores/distancia/distancia.component';
import { NotFoundComponent } from './components/public/not-found/not-found.component';
import { validateGuard } from './validate/validate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {path: 'inicio',component:InicioComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrerComponent },
  { path: 'dashboard', component: DashboardComponent/* ,canActivate: [validateGuard] */ },
  { path: 'equipo', component: EquipoComponent/* ,canActivate: [validateGuard] */ },


  //sensores
  {path: 'temperatura', component:TemperaturaComponent/* ,canActivate: [validateGuard] */},
  {path: 'humedad', component:HumedadComponent/* ,canActivate: [validateGuard] */},
  {path:'humo', component:HumoComponent/* ,canActivate: [validateGuard] */},
  {path:'alcohol', component:AlcoholComponent/* ,canActivate: [validateGuard] */},
  {path:'pir',component:PirComponent,/* canActivate: [validateGuard] */},
  {path:'distancia',component:DistanciaComponent/* ,canActivate: [validateGuard] */},


  { path: '**', component:NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
