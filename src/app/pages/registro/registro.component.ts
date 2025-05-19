import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

export const ValidatorRepeatedPassword = (password: FormControl): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return (password.value == control.value) ? null : { passworderror: "Las contraseñas no coinciden"};
  }
}


@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})


export class RegistroComponent implements OnInit{

  resultado!: {success: boolean, error? : string};
  mensaje: string = "";

  constructor(private databaseService: DatabaseService, private router: Router) {}

  registroForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  async ngOnInit() {
    this.registroForm.controls.repeatPassword.addValidators(ValidatorRepeatedPassword(this.registroForm.controls.password))
    this.registroForm.controls.repeatPassword.updateValueAndValidity();

    console.log(await this.databaseService.getUser())
  }
  
  async onSubmit(){

    if(this.registroForm.valid){


      try {
        this.resultado = await this.databaseService.register(this.registroForm.value.email || "", this.registroForm.value.password || "");

        if (this.resultado.success) {
          this.mensaje = "Registro exitoso! Redireccionando..."
          this.router.navigate(['/bienvenida'])
        } else {
          this.mensaje = this.resultado.success ? "" : this.resultado.error || "Error desconocido";
        }
        
      } catch (error){
        this.mensaje = `Error: ${error}`
      }

      
    }
  }
}
