import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import supabase from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionSubject = new BehaviorSubject<Session | null>(null);
  session$ = this.sessionSubject.asObservable();

  constructor() {
    
    // Obtener la sesión actual al cargar
    supabase.auth.getSession().then(({ data }) => {
      this.sessionSubject.next(data.session);
    });

    // Escuchar cambios en la sesión
    supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      this.sessionSubject.next(session);
    });
  }
}