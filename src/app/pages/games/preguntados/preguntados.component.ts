import { Component } from '@angular/core';
import { Pregunta } from '../../../models';
import { PreguntasService } from '../../../services/preguntas.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-preguntados',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  user: any;
  preguntas: Pregunta[] = [];
  preguntasVistas: Pregunta [] = [];
  preguntaActual: Pregunta | null = null;
  respuestaSeleccionada: string | null = null;
  esCorrecta: boolean = false;
  score: number = 0;
  contadorCorrectas : number = 0;
  topePreguntas: number = 10;
  gameOver: boolean = false;

  constructor(private preguntasService: PreguntasService, 
    private supabase: SupabaseService, 
    private authService: AuthService) {}

  ngOnInit() {
    this.preguntasService.getPreguntas().subscribe(data => {
      this.preguntas = data;
      this.siguiente();
    });

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

    obtenerPreguntaAleatoria(): Pregunta {
        let p: Pregunta;
        let pIndex: number;

        do {
            pIndex = Math.floor(Math.random() * this.preguntas.length);
            p = this.preguntas[pIndex]
        } while (this.preguntasVistas.includes(p))

        this.preguntasVistas.push(p);

        return p;
    }

    siguiente() {
        if (this.preguntasVistas.length == this.preguntas.length) {
            console.log("Ya viste todas las preguntas");
            this.preguntasVistas = [];
        }

        this.preguntaActual = this.obtenerPreguntaAleatoria();

        this.esCorrecta = false;
        this.respuestaSeleccionada = null;

    }

    respuesta(pregunta: Pregunta, opcionElegida: string) {
  
        if (pregunta.respuestaCorrecta === opcionElegida) {
            this.respuestaSeleccionada = opcionElegida;
            this.esCorrecta = true;
            this.score += 100;
            this.contadorCorrectas++;
        } else {
            this.respuestaSeleccionada = opcionElegida;
            this.esCorrecta = false;
        }

        if (this.preguntasVistas.length >= this.topePreguntas) {
            this.gameOver = true;
            this.saveGameResult();
        }

    }

    reiniciar() {
        this.preguntasVistas = [];
        this.preguntaActual = this.obtenerPreguntaAleatoria();
        this.respuestaSeleccionada = null;
        this.esCorrecta = false;
        this.score = 0;
        this.gameOver = false;
        this.contadorCorrectas = 0;
    }

    async saveGameResult(): Promise<void> {

        let vistas = this.preguntasVistas.map(pregunta => pregunta.pregunta)

      const { error } = await this.supabase.getClient()
        .from('preguntados')
        .insert([
          {
            email: this.user.email,
            puntos: this.score,
            respuestas_correctas: this.contadorCorrectas,
            contestadas: this.topePreguntas,
            preguntas: vistas,
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
