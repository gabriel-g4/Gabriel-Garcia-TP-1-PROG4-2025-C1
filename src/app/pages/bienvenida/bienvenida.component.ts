import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Juego } from '../../models';



@Component({
  selector: 'app-bienvenida',
  imports: [MatGridListModule, RouterLink, RouterLinkActive],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {


  juegos: Juego[] = [
    {text: 'Ahorcado', img_url: 'assets/images/ahorcado-portada.png', url: '/ahorcado'},
    {text: 'Mayor-menor', img_url: "assets/images/mayor-menor-portada.png", url: '/mayor-menor'},
    {text: 'Preguntados', img_url: "assets/images/preguntados-portada.png", url: '/preguntados'},
    {text: 'Juego propio', img_url: "assets/images/juego-propio-portada.png", url: '/juego-propio'},
  ];


}
