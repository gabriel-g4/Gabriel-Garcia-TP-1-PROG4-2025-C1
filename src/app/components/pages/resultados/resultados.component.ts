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
  juegos = ['ahorcado', 'mayor-menor', 'preguntados', 'sokoban'];
  juegoSeleccionado = 'ahorcado';
  columnasPropios: string[] = []
  columnasTop: string[] = []

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
    }
  }

  async cargarResultados(){
    this.cargarResultadosPropios();
    this.cargarTop();
  }

  async cargarResultadosPropios() {
    if (!this.userId) return;

    const tabla = this.juegoSeleccionado;

    const { data, error } = await this.supabase.getClient()
      .from(tabla)
      .select('*')
      .eq('user_id', this.userId)
      .order('created_at', { ascending: false });

    if (!error) {
      if (data.length > 0) {
        this.columnasPropios = Object.keys(data[0]);
      }
      this.resultados = data;
    }
  }

  async cargarTop() {
    const tabla = this.juegoSeleccionado;

    const { data, error } = await this.supabase.getClient()
      .from(tabla)
      .select('*')
      .order('puntos', { ascending: false})
      .limit(10);
    
    if (!error) {
      this.top = data;
      if (data.length > 0) {
        this.columnasTop = Object.keys(data[0]);
      }
    }
    if (error) throw error;
  }
}
