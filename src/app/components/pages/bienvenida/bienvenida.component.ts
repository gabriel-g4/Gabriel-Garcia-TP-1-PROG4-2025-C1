import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChatComponent } from "../../chat/chat.component";

export interface Tile {
  text: string;
  img_url: string;
  url: string;
}

@Component({
  selector: 'app-bienvenida',
  imports: [MatGridListModule, RouterLink, RouterLinkActive, ChatComponent],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {


  tiles: Tile[] = [
    {text: 'Ahorcado', img_url: 'assets/images/juegoahorcado1.png', url: '/ahorcado'},
    {text: 'Mayor-menor', img_url: "assets/images/juegomayormenor1.png", url: '/mayor-menor'},
    {text: 'Preguntados', img_url: "assets/images/juegopreguntados1.png", url: '/preguntados'},
    {text: 'Juego propio', img_url: "assets/images/juegopropio.jpg", url: ''},
  ];


}
