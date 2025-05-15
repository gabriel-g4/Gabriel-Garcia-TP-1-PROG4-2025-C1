
// src/app/services/chat.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages$ = new BehaviorSubject<any[]>([]);


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private supabase: SupabaseService) {
    if (isPlatformBrowser(this.platformId)) {
      this.listenToMessages();
      this.loadInitialMessages();
    }
  }

  getMessages() {
    return this.messages$.asObservable();
  }

  // Cargar mensajes existentes ordenados por fecha
  private async loadInitialMessages() {
    const { data, error } = await this.supabase.getClient()
      .from('mensajes')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (!error) {
      this.messages$.next(data || []);
    }

  }

  // Escuchar en tiempo real nuevos mensajes insertados
  private listenToMessages() {
    this.supabase.getClient()
      .channel('messages_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensajes' },
        (payload) => {
          const current = this.messages$.value;
          this.messages$.next([...current, payload.new]);
        }
      )
      .subscribe();
  }

  // Enviar mensaje nuevo
  async sendMessage(id: string, message: string, email: string) {
    const { error } = await this.supabase.getClient()
      .from('mensajes')
      .insert({ mensaje: message, id_usuario: id, email});

    if (error) {
      console.error('Error sending message:', error);
    }
  }
}
