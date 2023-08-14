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

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'inicio',component:InicioComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'equipo', component: EquipoComponent },


  //sensores
  {path: 'temperatura', component:TemperaturaComponent},
  {path: 'humedad', component:HumedadComponent},
  {path:'humo', component:HumoComponent},
  {path:'alcohol', component:AlcoholComponent},
  {path:'pir',component:PirComponent},
  {path:'distancia',component:DistanciaComponent},


  { path: '**', component:NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
