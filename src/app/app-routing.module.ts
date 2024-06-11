import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

const routes: Routes = [
 {path:'', redirectTo:'dashboard', pathMatch:'full'},
 {path:'dashboard', component:DashboardComponent},
 {path:'favoritos', component:FavoritosComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
