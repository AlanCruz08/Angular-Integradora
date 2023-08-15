import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/secure/nav/nav.component';
import { DashboardComponent } from './components/secure/dashboard/dashboard.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegistrerComponent } from './components/public/registrer/registrer.component';
import { FooterComponent } from './components/secure/footer/footer.component';
import { NavInitComponent } from './components/secure/nav-init/nav-init.component';
import { InicioComponent } from './components/secure/inicio/inicio.component';
import { EquipoComponent } from './components/secure/equipo/equipo.component';
import { NavLoginComponent } from './components/secure/nav-login/nav-login.component';
import { TemperaturaComponent } from './components/sensores/temperatura/temperatura.component';
import { HumedadComponent } from './components/sensores/humedad/humedad.component';
import { DistanciaComponent } from './components/sensores/distancia/distancia.component';
import { PirComponent } from './components/sensores/pir/pir.component';
import { AlcoholComponent } from './components/sensores/alcohol/alcohol.component';
import { HumoComponent } from './components/sensores/humo/humo.component';
import { NotFoundComponent } from './components/public/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http'; 





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    LoginComponent,
    RegistrerComponent,
    FooterComponent,
    NavInitComponent,
    InicioComponent,
    EquipoComponent,
    NavLoginComponent,
    TemperaturaComponent,
    HumedadComponent,
    DistanciaComponent,
    PirComponent,
    AlcoholComponent,
    HumoComponent,
    NotFoundComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
