import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  img_url: string
}

@Component({
  selector: 'app-bienvenida',
  imports: [MatGridListModule],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {
  tiles: Tile[] = [
    {text: 'Ahorcado', cols: 3, rows: 1, color: 'lightblue', img_url: '/juegoahorcado.png'},
    {text: 'Mayor-menor', cols: 1, rows: 2, color: 'lightgreen', img_url: "/juegomayoromenor.jpg"},
    {text: 'Preguntados', cols: 1, rows: 1, color: 'lightpink', img_url: "/juegopreguntados.png"},
    {text: 'Juego propio', cols: 2, rows: 1, color: '#DDBDF1', img_url: "/juegopropio.jpg"},
  ];
}
