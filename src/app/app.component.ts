import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritoService } from './Services/favorito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  quantidadeFavoritos!: number;
  constructor( private router:Router, private favoritoService:FavoritoService) { }

  title = 'rick-project';
  
  
  
  ngOnInit(): void {
    
    this.favoritoService.contador$.subscribe(contador =>{
      this.quantidadeFavoritos = contador;
    })
  }
 

  irParaInicio(){
    this.router.navigate(['/dashboard']);
  }

  irParaFavoritos(){
    this.router.navigate(['/favoritos']);
  }

 
}
