import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormComponent } from './usuario-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('UsuarioFormComponent', () => {
  let component: UsuarioFormComponent;
  let fixture: ComponentFixture<UsuarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioFormComponent, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('nome deve ser inválido ao informar um nome com mais de 50 caracteres', () => {
    const nomeInput = component.usuarioForm.controls['nome'];
    nomeInput.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

    expect(nomeInput.valid).toBeFalsy();
  });

  it('nome deve ser inválido ao informar um nome com menos de 3 caracteres', () => {
    const nomeInput = component.usuarioForm.controls['nome'];
    nomeInput.setValue('Lo');

    expect(nomeInput.valid).toBeFalsy();
  });

  it('email deve ser inválido ao informar um email fora do padrão', () => {
    const emailInput = component.usuarioForm.controls['email'];
    emailInput.setValue('loremipsum');

    expect(emailInput.valid).toBeFalsy();
  });

  it('senha deve ser inválida ao informar uma senha com menos de 6 dígitos', () => {
    const senhaInput = component.usuarioForm.controls['senha'];
    senhaInput.setValue('12345');

    expect(senhaInput.valid).toBeFalsy();
  });

  it('comfirmação de senha deve ser inválida ao informar um valor diferente da senha', () => {
    const senhaInput = component.usuarioForm.controls['senha'];
    const confirmacaoSenhaInput = component.usuarioForm.controls['confirmacaoSenha'];
    senhaInput.setValue('123456');
    confirmacaoSenhaInput.setValue('123465');

    expect(confirmacaoSenhaInput.valid).toBeFalsy();
  });

  it('deve desabilitar o botão de envio quando o valor do input nome é inválido', () => {
    const nomeInput = component.usuarioForm.controls['nome'];
    nomeInput.setValue('Lo');
    
    fixture.detectChanges();

    const btnEnviar = fixture.nativeElement.querySelector('#btnEnviar');
    expect(btnEnviar.disabled).toBeTruthy();
  });

  it('deve habilitar o botão de envio quando o formulário estiver válido', () => {
    fixture.detectChanges();
    const btnEnviar = fixture.nativeElement.querySelector('#btnEnviar');
    expect(btnEnviar.disabled).toBeTruthy();

    const nomeInput = component.usuarioForm.controls['nome'];
    nomeInput.setValue('First');

    const emailInput = component.usuarioForm.controls['email'];
    emailInput.setValue('first@domain.com');

    const senhaInput = component.usuarioForm.controls['senha'];
    senhaInput.setValue('123456');

    const confirmacaoSenhaInput = component.usuarioForm.controls['confirmacaoSenha'];
    confirmacaoSenhaInput.setValue('123456');

    fixture.detectChanges();
    expect(btnEnviar.disabled).toBeFalsy();
  });
});
