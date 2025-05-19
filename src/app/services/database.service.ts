import { Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";


@Injectable({
  providedIn: 'root',
})

export class DatabaseService {



  constructor(private supabase: SupabaseService) {}

    async register(email: string, password: string): Promise<{ success: boolean; error?: string }> {
      try {
        const { data, error } = await this.supabase.getClient().auth.signUp({
          email,
          password,
        });

        if (error) {
          console.error("Error al registrarse:", error.message);
          return { success: false, error: error.message };
        }

        console.log("Registro exitoso", data);
        return { success: true };
      } catch (err) {
        console.error("Error inesperado:", err);
        return { success: false, error: 'Error inesperado al registrarse' };
      }
    }

    async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
      try {
        const { data, error } = await this.supabase.getClient().auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Error al iniciar sesión:", error.message);
          return { success: false, error: error.message };
        }

        return { success: true };
      } catch (err) {
        console.error("Error inesperado al iniciar sesión:", err);
        return { success: false, error: "Error inesperado al iniciar sesión" };
      }
    }

    getUser () {
      return this.supabase.getClient().auth.getUser()
    }

    signOut() {
      this.supabase.getClient().auth.signOut();
    }

}
