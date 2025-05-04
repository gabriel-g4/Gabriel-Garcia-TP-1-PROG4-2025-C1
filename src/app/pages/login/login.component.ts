import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  msg: string = ""
  databaseService = new DatabaseService();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  onSubmit(){

    if (this.loginForm.valid){
      this.msg = "valido"
      
      try {
        this.databaseService.login(this.loginForm.value.email || "", this.loginForm.value.password || "")
      } catch (error){
        console.log("Entro al catch")
        console.error("eeerror", error)
      }
    } else {
      this.msg = "invalido"
    }
  }
}
