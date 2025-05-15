import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private sessionSubject = new BehaviorSubject<Session | null>(null);
  session$ = this.sessionSubject.asObservable();

  constructor(supabase: SupabaseService) {
    
    // Obtener la sesión actual al cargar
    supabase.getClient().auth.getSession().then(({ data }) => {
      this.sessionSubject.next(data.session);
    });

    // Escuchar cambios en la sesión
    supabase.getClient().auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      this.sessionSubject.next(session);
    });
  }

  getUserId(): string {
    return this.sessionSubject.value?.user?.id ?? '';
  }
}