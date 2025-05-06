import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  changeTheme() {

    const html = document.documentElement;

    if (html.getAttribute('data-theme') == 'dark' || (html.getAttribute('data-theme') == undefined && window.matchMedia('(prefers-color-scheme: dark)').matches)) {//== ) {
      html.setAttribute('data-theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
    }
  }
}
