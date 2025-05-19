import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  resultado!: {success: boolean, error? : string};
  mensaje: string = "";

  constructor(private databaseService: DatabaseService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  async onSubmit(){

    if (this.loginForm.valid){
      
      try {
        const email = this.loginForm.value.email || "";
        const password = this.loginForm.value.password || "";

        this.resultado = await this.databaseService.login(email, password);

         if (this.resultado.success) {
          this.mensaje = "Login exitoso! Redireccionando..."
          this.router.navigate(['/bienvenida'])
        } else {
          this.mensaje = this.resultado.success ? "" : this.resultado.error || "Error desconocido";
        }

      } catch (error) {
        this.mensaje = `Error : ${error}`;
      }
    }
  }
}
