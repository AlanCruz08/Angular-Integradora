import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/secure/nav/nav.component';
import { DashboardComponent } from './components/secure/dashboard/dashboard.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegistrerComponent } from './components/public/registrer/registrer.component';
import { FooterComponent } from './components/secure/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    LoginComponent,
    RegistrerComponent,
    FooterComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
