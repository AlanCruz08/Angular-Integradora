import { Component, OnInit } from '@angular/core';
import { SecureService } from 'src/app/services/secure.service';
import { Temperatura } from 'src/app/interface/sensores';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {

  temperaturas: Temperatura[] = [];

  constructor(
    private secureService: SecureService,
    private http: HttpClient,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.obtenerTemperaturas();
  }

  obtenerTemperaturas(): void {

  }
  
  

}
