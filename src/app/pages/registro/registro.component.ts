import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  supabaseService = new DatabaseService();

  registroForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // name: new FormControl('', [Validators.required]),
    // surname: new FormControl('', [Validators.required]),
    // age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(150)])
  })

  ngOnInit(): void {
    this.registroForm.controls.repeatPassword.addValidators(ValidatorRepeatedPassword(this.registroForm.controls.password))
    this.registroForm.controls.repeatPassword.updateValueAndValidity();
  }
  
  onSubmit(){

    if(this.registroForm.valid){
      console.log("valido")

      console.log(this.registroForm.value.email)

      try {
        if (this.supabaseService.register(this.registroForm.value.email || "", this.registroForm.value.password || "")){
  
        } else {
  
        }
        
      } catch (error){
        console.log("Entro al catch")
        console.error("errrorrr", error)
      }

      
    } else {
      console.log("invalido")
      console.log(this.registroForm.errors)
    }
  }
}
