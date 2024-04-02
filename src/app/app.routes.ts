import { Routes } from '@angular/router';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/usuario', pathMatch: 'full' },
    { path: 'usuario', component: UsuarioFormComponent }
];
