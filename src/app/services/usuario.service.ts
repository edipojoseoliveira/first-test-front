import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  salvar(usuario: any): Observable<any> {
    return this.http.post<any>(this.url, usuario);
  }

}
