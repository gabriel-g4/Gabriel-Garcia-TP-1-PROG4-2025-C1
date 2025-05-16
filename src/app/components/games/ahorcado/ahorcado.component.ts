import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})

export class AhorcadoComponent implements OnInit {
  user: any
  numero_imagen = 1
  word: string = '';
  guessedLetters: string[] = [];
  wrongLetters: string[] = [];
  wrongGuesses: number = 0;
  maxGuesses: number = 7;
  displayWord: string[] = [];
  score = 777;
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  words: string[] = [
  "variable",
  "funcion",
  "clase",
  "objeto",
  "array",
  "bucles",
  "typescript",
  "angular",
  "framework",
  "backend",
  "frontend",
  "compilar",
  "debug",
  "algoritmo",
  "condicional",
  "api",
  "promise",
  "callback",
  "modulo",
  "interfaz",
  "recursion",
  "iteracion",
  "constante",
  "evento",
  "json"];

  constructor(private supabase: SupabaseService, private authService: AuthService) {}

  ngOnInit(): void {
    this.resetGame();
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

  guess(letter: string): void {
    if (this.guessedLetters.includes(letter)) return;
    this.guessedLetters.push(letter);

    if (this.word.includes(letter)) {
      [...this.word].forEach((char, i) => {
        if (char === letter) {
          this.displayWord[i] = letter;
        }
      });
    } else {
      this.numero_imagen++;
      this.score -= 111;
      this.wrongLetters.push(letter)
      this.wrongGuesses++;
    }

    if(this.isGameOver){
      this.saveGameResult();
    }
  }

  resetGame(): void {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.numero_imagen = 1;
    this.score = 777;
    this.word = this.words[randomIndex];
    this.guessedLetters = [];
    this.wrongGuesses = 0;
    this.wrongLetters = [];
    this.displayWord = Array(this.word.length).fill('_');
  }

  
    async saveGameResult(): Promise<void> {
      const { error } = await this.supabase.getClient()
        .from('ahorcado')
        .insert([
          {
            user_id: this.user.id, 
            email: this.user.email,
            puntos: this.score,
            palabra: this.word,
            errores: this.wrongGuesses,
            gano: this.isWinner
          }
        ]);

      if (error) {
        console.error('Error al guardar el juego:', error);
      } else {
        console.log('Juego guardado con éxito');
      }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    if (this.alphabet.includes(key) && !this.isGameOver) {
      this.guess(key);
    }
  }

  get isGameOver(): boolean {
    return this.wrongGuesses >= this.maxGuesses || this.isWinner;
  }

  get isWinner(): boolean {
    return this.displayWord.join('') === this.word;
  }

  get imagen_url(): string {
  return `assets/images/ahorcado/${this.numero_imagen}.png`;
}
}
