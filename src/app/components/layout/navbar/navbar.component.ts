import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user: any;
  response: any
  isLogged = false;
  email = ''

  constructor(private authService: AuthService, 
    private databaseService: DatabaseService,
    private router: Router
  ) {}

    
  
  async ngOnInit() {
    this.response = await this.databaseService.getUser();
    
    this.authService.session$.subscribe(async session => {
      this.isLogged = !!session;

      if (session) {
        this.user = (await this.databaseService.getUser()).data.user;
        this.email = this.user?.email ?? '';
      } else {
        this.user = null;
        this.email = '';
      }
    });
  }

  changeTheme() {

    const html = document.documentElement;

    if (html.getAttribute('data-theme') == 'dark' || (html.getAttribute('data-theme') == undefined && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.setAttribute('data-theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
    }
  }

  signOut () {
    this.databaseService.signOut()
    this.router.navigate(['/bienvenida'])
  }
}