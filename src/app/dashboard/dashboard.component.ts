import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';
import { FormControl } from '@angular/forms';
import { Caracters } from '../Models/Caracters';
import { Observable, Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FavoritoService } from '../Services/favorito.service';
import { LoadingComponent } from '../loading/loading.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentPage: number = 1;
  totalPages: number = 1;
  favoritos: string[] = [];
  totalFavoritos: any;
  loading: boolean = false;

 
  constructor(private dashboardService:DashboardService, private favoritoService: FavoritoService ) {

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if(term.trim() ==''){
        
          this.mostrarPaginaErro = false;
          this.loading =false;
          return this.dashboardService.getAllCharacters(this.currentPage);
          
        } else{
          return this.dashboardService.searchCharacterByName(term);
        }

      }))
    .subscribe((response) => {
        this.characters = response.results;
        if(response.results.length === 0){
          this.mostrarPaginaErro = true;
        }
    },(error =>{
      console.error(error);
      this.mostrarPaginaErro = false;
    }));


    this.favoritoService.favoritos$.subscribe(favorito =>{
      this.favoritos = favorito;
      this.totalFavoritos = this;this.favoritoService.contarFavoritos();
    })


   }

  searchControl: FormControl = new FormControl();
  mostrarPaginaErro :boolean =false;

  searchTerm: string = '';
  private searchTerms = new Subject<string>();
  characters: any[] = [];
  


  ngOnInit(): void {
  
    this.getAllCharacters(this.currentPage);

  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllCharacters(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllCharacters(this.currentPage);
    }
  }

  getAllCharacters(page:number){
    this.loading = true;
    this.dashboardService.getAllCharacters(page).subscribe((data =>{
      this.characters = data.results;
      this.loading = false;
      this.totalPages = data.info.pages;
      console.log(this.characters);
    }))
  }



  removerFavoritos(item:string){
    this.favoritoService.removerFavorito(item);
  }

  toggleFavorito(item:string){
    console.log('toggleFavorito');
    console.log(item);
    if(this.isfavorito(item)){
      this.favoritoService.removerFavorito(item);
    } else{
      this.favoritoService.adicionarFavorito(item);
    }
  }

  isfavorito(item:string){
    console.log('isfavorito');
    return this.favoritos.includes(item);
  }


  search(): void {
    if (this.searchTerm.trim() === '') { 
      this.searchTerms.next('');
    } else {
      this.searchTerms.next(this.searchTerm);
    }
  }

  
  
}
