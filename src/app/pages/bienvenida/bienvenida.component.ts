import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface Tile {
  color: string;
  text: string;
  img_url: string;
  url: string;
}

@Component({
  selector: 'app-bienvenida',
  imports: [MatGridListModule, RouterLink, RouterLinkActive],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {


  tiles: Tile[] = [
    {text: 'Ahorcado', color: 'lightblue', img_url: '/juegoahorcado1.png', url: '/ahorcado'},
    {text: 'Mayor-menor', color: 'lightgreen', img_url: "/juegomayormenor1.png", url: '/mayor-menor'},
    {text: 'Preguntados', color: 'lightpink', img_url: "/juegopreguntados1.png", url: '/preguntados'},
    {text: 'Juego propio', color: '#DDBDF1', img_url: "/juegopropio.jpg", url: ''},
  ];


}
