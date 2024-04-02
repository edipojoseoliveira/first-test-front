import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnInit {

  usuarioForm!: FormGroup;
  erros: string[] = [];

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm(): void {
    this.erros = [];
    this.usuarioForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmacaoSenha: new FormControl('', [Validators.required, this.matchValues()])
    });
  }

  get nome() {
    return this.usuarioForm.get('nome')!;
  }

  get email() {
    return this.usuarioForm.get('email')!;
  }

  get senha() {
    return this.usuarioForm.get('senha')!;
  }

  get confirmacaoSenha() {
    return this.usuarioForm.get('confirmacaoSenha')!;
  }

  matchValues(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const parent = control.parent;
      return parent && parent.controls && control.value === this.senha.value ? null : { 'notMatch': true };
    };
  }

  registrar() {
    if (this.usuarioForm.invalid) {
      return;
    }
    this.usuarioService.salvar(this.usuarioForm.value).subscribe({
      next: () => {
        this.iniciarForm();
      },
      error: (e) => {
        this.exibirErros(e.error);
      }
    });
  }

  exibirErros(error: any) {
    this.erros = [];
    for (const chave in error) {
      if (error.hasOwnProperty(chave)) {
        const valor = error[chave];
        this.erros.push(valor);
      }
    }
  }

}
