import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../../services/database.service';
import { RouterLink, RouterLinkActive, Router, Data } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private databaseService: DatabaseService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  onSubmit(){

    if (this.loginForm.valid){
      
      try {
        this.databaseService.login(this.loginForm.value.email || "", this.loginForm.value.password || "")
        this.router.navigate(["/bienvenida"])
      } catch (error){
        console.log("Entro al catch")
        console.error("eeerror", error)
      }
    } else {
      
    }
  }
}
