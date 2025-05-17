// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-resultados',
//   imports: [],
//   templateUrl: './resultados.component.html',
//   styleUrl: './resultados.component.css'
// })
// export class ResultadosComponent {

// }

import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-resultados',
  imports: [CommonModule, FormsModule],
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})

export class ResultadosComponent implements OnInit {
  juegos = ['ahorcado', 'mayor-menor', 'preguntados'];
  juegoSeleccionado = 'ahorcado';
  columnas: any[] = []

  resultados: any[] = [];
  top: any[] = [];

  activeTab: number = 1;
  userId: string | null = null;

  constructor(private supabase: SupabaseService) {}


  setActiveTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  async ngOnInit() {
    const { data: { session } } = await this.supabase.getClient().auth.getSession();
    this.userId = session?.user?.id ?? null;
    if (this.userId) {
      this.cargarResultados();
      this.cargarTop();
    }
  }

  async cargarResultados() {
    if (!this.userId) return;

    const tabla = this.juegoSeleccionado;

    const { data, error } = await this.supabase.getClient()
      .from(tabla)
      .select('*')
      .eq('user_id', this.userId)
      .order('created_at', { ascending: false });

    if (!error) {
      console.log("DATA")
      console.log(data)
      if (data.length > 0) {
        this.columnas = Object.keys(data[0]);
        console.log("COLUMNAS")
        console.log(this.columnas)
      }
      this.resultados = data;
      this.top = [];
    }
  }

  async cargarTop() {
    const tabla = this.juegoSeleccionado;

    let query = this.supabase.getClient()
      .from(tabla)
      .select('*')
      .order('puntos', { ascending: false})
      .limit(10);

    // Personalizamos el ranking por juego
    

    const { data, error } = await query;
    if (!error) {
      this.top = data;
      console.log("TOP")
      console.log(data)
      if (data.length > 0) {
        this.columnas = Object.keys(data[0]);
        console.log("COLUMNAS")
        console.log(this.columnas)
      }
    }
    if (error) throw error;
  }
}
