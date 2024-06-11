import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  private favoritos: string[] = [];
  private favoritosSubject = new BehaviorSubject<string[]>(this.favoritos);
  private contadorSubject = new BehaviorSubject<number>(this.favoritos.length);

  favoritos$ = this.favoritosSubject.asObservable();
  contador$ = this.contadorSubject.asObservable();

  constructor() { 
    this.carregarFavoritos();
  }

   carregarFavoritos() {
    try {
      const favoritos = localStorage.getItem('favoritos');
      if (favoritos) {
        this.favoritos = JSON.parse(favoritos);
      }
    } catch (e) {
      console.error('Erro ao carregar favoritos do localStorage', e);
      this.favoritos = [];
    }
    this.favoritosSubject.next(this.favoritos);
  }

   salvarFavoritos() {
    try {
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    } catch (e) {
      console.error('Erro ao salvar favoritos no localStorage', e);
    }
  }

  adicionarFavorito(item: string) {
    if (!this.favoritos.includes(item)) {
      this.favoritos.push(item);
      this.salvarFavoritos();
      this.favoritosSubject.next(this.favoritos);
      this.contadorSubject.next(this.favoritos.length); 
    }
  }

  removerFavorito(item: string) {
    this.favoritos = this.favoritos.filter(fav => fav !== item);
    this.salvarFavoritos();
    this.favoritosSubject.next(this.favoritos);
    this.contadorSubject.next(this.favoritos.length); 
  }
  contarFavoritos(): number {
    return this.favoritos.length;
  }
}
