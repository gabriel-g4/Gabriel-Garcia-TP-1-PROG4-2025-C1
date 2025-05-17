import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { AuthService } from '../../../services/auth.service';


interface Carta {
    imagen_url: string,
    valor: number
}

@Component({
  selector: 'app-mayor-menor',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})




export class MayorMenorComponent {

    user: any;
    cartas: Carta[] = [
  { imagen_url: "assets/images/cartas/A_of_clubs.png", valor: 13 },
  { imagen_url: "assets/images/cartas/K_of_clubs.png", valor: 12 },
  { imagen_url: "assets/images/cartas/Q_of_clubs.png", valor: 11 },
  { imagen_url: "assets/images/cartas/J_of_clubs.png", valor: 10 },
  { imagen_url: "assets/images/cartas/10_of_clubs.png", valor: 9 },
  { imagen_url: "assets/images/cartas/9_of_clubs.png", valor: 8 },
  { imagen_url: "assets/images/cartas/8_of_clubs.png", valor: 7 },
  { imagen_url: "assets/images/cartas/7_of_clubs.png", valor: 6 },
  { imagen_url: "assets/images/cartas/6_of_clubs.png", valor: 5 },
  { imagen_url: "assets/images/cartas/5_of_clubs.png", valor: 4 },
  { imagen_url: "assets/images/cartas/4_of_clubs.png", valor: 3 },
  { imagen_url: "assets/images/cartas/3_of_clubs.png", valor: 2 },
  { imagen_url: "assets/images/cartas/2_of_clubs.png", valor: 1 },

  { imagen_url: "assets/images/cartas/A_of_diamonds.png", valor: 13 },
  { imagen_url: "assets/images/cartas/K_of_diamonds.png", valor: 12 },
  { imagen_url: "assets/images/cartas/Q_of_diamonds.png", valor: 11 },
  { imagen_url: "assets/images/cartas/J_of_diamonds.png", valor: 10 },
  { imagen_url: "assets/images/cartas/10_of_diamonds.png", valor: 9 },
  { imagen_url: "assets/images/cartas/9_of_diamonds.png", valor: 8 },
  { imagen_url: "assets/images/cartas/8_of_diamonds.png", valor: 7 },
  { imagen_url: "assets/images/cartas/7_of_diamonds.png", valor: 6 },
  { imagen_url: "assets/images/cartas/6_of_diamonds.png", valor: 5 },
  { imagen_url: "assets/images/cartas/5_of_diamonds.png", valor: 4 },
  { imagen_url: "assets/images/cartas/4_of_diamonds.png", valor: 3 },
  { imagen_url: "assets/images/cartas/3_of_diamonds.png", valor: 2 },
  { imagen_url: "assets/images/cartas/2_of_diamonds.png", valor: 1 },

  { imagen_url: "assets/images/cartas/A_of_hearts.png", valor: 13 },
  { imagen_url: "assets/images/cartas/K_of_hearts.png", valor: 12 },
  { imagen_url: "assets/images/cartas/Q_of_hearts.png", valor: 11 },
  { imagen_url: "assets/images/cartas/J_of_hearts.png", valor: 10 },
  { imagen_url: "assets/images/cartas/10_of_hearts.png", valor: 9 },
  { imagen_url: "assets/images/cartas/9_of_hearts.png", valor: 8 },
  { imagen_url: "assets/images/cartas/8_of_hearts.png", valor: 7 },
  { imagen_url: "assets/images/cartas/7_of_hearts.png", valor: 6 },
  { imagen_url: "assets/images/cartas/6_of_hearts.png", valor: 5 },
  { imagen_url: "assets/images/cartas/5_of_hearts.png", valor: 4 },
  { imagen_url: "assets/images/cartas/4_of_hearts.png", valor: 3 },
  { imagen_url: "assets/images/cartas/3_of_hearts.png", valor: 2 },
  { imagen_url: "assets/images/cartas/2_of_hearts.png", valor: 1 },

  { imagen_url: "assets/images/cartas/A_of_spades.png", valor: 13 },
  { imagen_url: "assets/images/cartas/K_of_spades.png", valor: 12 },
  { imagen_url: "assets/images/cartas/Q_of_spades.png", valor: 11 },
  { imagen_url: "assets/images/cartas/J_of_spades.png", valor: 10 },
  { imagen_url: "assets/images/cartas/10_of_spades.png", valor: 9 },
  { imagen_url: "assets/images/cartas/9_of_spades.png", valor: 8 },
  { imagen_url: "assets/images/cartas/8_of_spades.png", valor: 7 },
  { imagen_url: "assets/images/cartas/7_of_spades.png", valor: 6 },
  { imagen_url: "assets/images/cartas/6_of_spades.png", valor: 5 },
  { imagen_url: "assets/images/cartas/5_of_spades.png", valor: 4 },
  { imagen_url: "assets/images/cartas/4_of_spades.png", valor: 3 },
  { imagen_url: "assets/images/cartas/3_of_spades.png", valor: 2 },
  { imagen_url: "assets/images/cartas/2_of_spades.png", valor: 1 }
    ];
    cartasUsadas: Carta[] = []
    cartaActual: Carta = this.obtenerCartaUnica();
    cartaOculta: Carta = this.obtenerCartaUnica();
    score = 0;
    streak = 0;
    gameOver = false;

    constructor(private supabase: SupabaseService, private authService: AuthService) {
        this.authService.session$.subscribe(session => {
        if (session?.user) {
            // Asignamos el usuario autenticado
            this.user = session.user;
            console.log('Usuario autenticado:', this.user);
        } else {
            console.log('Usuario no autenticado');
        }
        });
    }

    obtenerCartaUnica() : Carta {

        if (this.cartasUsadas.length === this.cartas.length) {
            console.log("Ya se usaron todas las cartas.");
            this.cartasUsadas = [];
        }

        let carta : Carta;

        do {
            carta = this.cartas[Math.floor(Math.random() * this.cartas.length)];
        } while (this.cartasUsadas.includes(carta));

        this.cartasUsadas.push(carta);
        return carta;
    }

    mayor() {
        if (this.cartaOculta.valor >= this.cartaActual.valor) {
            this.acierto()
        } else {
            this.fallo()
        }
    }

    menor() {
        if (this.cartaOculta.valor <= this.cartaActual.valor) {
            this.acierto()
        } else {
            this.fallo()
        }
    }

    acierto() {
        this.streak++;
        this.score += 100 * this.streak;

        this.cartaActual = this.cartaOculta;
        this.cartaOculta = this.obtenerCartaUnica();
    }

    fallo() {
        this.gameOver = true;
        this.saveGameResult()
    }

    reiniciarJuego() {
        this.cartasUsadas = []
        this.cartaActual = this.obtenerCartaUnica();
        this.cartaOculta = this.obtenerCartaUnica();
        this.score = 0;
        this.streak = 0;
        this.gameOver = false;
    }


    async saveGameResult(): Promise<void> {
      const { error } = await this.supabase.getClient()
        .from('mayor-menor')
        .insert([
          {
            email: this.user.email,
            puntos: this.score,
            racha: this.streak,
            user_id: this.user.id, 
          }
        ]);

      if (error) {
        console.error('Error al guardar el juego:', error);
      } else {
        console.log('Juego guardado con éxito');
      }
  }

}
