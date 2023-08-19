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
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { VerifyComponent } from './components/public/verify/verify.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
