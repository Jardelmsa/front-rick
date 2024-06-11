import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { DashboardService } from './Services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoritoService } from './Services/favorito.service';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FavoritosComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule ,
    ReactiveFormsModule
  ],
  providers: [
    DashboardService,
    FavoritoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
