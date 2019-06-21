import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardsComponent } from './boards/boards.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ProtectedGuard, PublicGuard } from '@app/core';

const routes: Routes = [
  { path: '', component: HomeComponent,  pathMatch: 'full', data: { title: 'Login' }, canActivate: [PublicGuard] },
  { path: 'login', component: LoginComponent,  pathMatch: 'full', data: { title: 'Iniciar Sesión' }, canActivate: [PublicGuard] },
  { path: 'create_account', component: UsersComponent,  pathMatch: 'full', data: { title: 'Crear Cuenta' }, canActivate: [PublicGuard] },
  { path: 'boards', component: BoardsComponent,  pathMatch: 'full', data: { title: 'Tableros' }, canActivate: [ProtectedGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
