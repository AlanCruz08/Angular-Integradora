import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(private router: Router) { }

  redirectToComponent(componentName: string) {
    // Aquí rediriges al componente deseado en función del nombre recibido
    switch (componentName) {
      case 'temperatura':
        this.router.navigate(['/temperatura']); 
        break;
      
      case 'humedad':
        this.router.navigate(['/humedad']); 
        break;
      case 'humo':
        this.router.navigate(['/humo']); 
        break;
      case 'alcohol':
        this.router.navigate(['/alcohol']); 
        break;
      case 'pir':
        this.router.navigate(['/pir']); 
        break;
      case 'distancia':
        this.router.navigate(['/distancia']); 
        break;
    }
  }
}
