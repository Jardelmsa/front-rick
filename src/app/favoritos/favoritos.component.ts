import { Component, OnInit } from '@angular/core';
import { FavoritoService } from '../Services/favorito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
 
  favoritos:any;
  mostrarPaginaErro :boolean =false;

  constructor(private favoritoService:FavoritoService, private router:Router) { 

    

  }

  ngOnInit(): void {
    this.carregarFavoritos();
  }

 

  carregarFavoritos(){
    this.favoritoService.favoritos$.subscribe(favorito =>{
      this.favoritos = favorito;
    });
  }

  removerFavoritos(item:string){
    this.favoritoService.removerFavorito(item);
  }

  irParaPaginaInicial(){
    this.router.navigate(['/dashboard']);
  }

}
