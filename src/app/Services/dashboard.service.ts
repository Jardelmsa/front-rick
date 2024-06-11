import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Caracters } from '../Models/Caracters';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl ='https://rickandmortyapi.com/api/character/';

  constructor( private http:HttpClient) { }

  getAllCharacters(page:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição:', error);
        return of({ results: [] }); // Retorna um valor vazio em caso de erro
      })
    );
  }

  searchCharacterByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?name=${name}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição:', error);
        return of({ results: [] }); // Retorna um valor vazio em caso de erro
      })
    );
  }
}
