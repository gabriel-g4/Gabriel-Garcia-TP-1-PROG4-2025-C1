import { Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";


@Injectable({
  providedIn: 'root',
})

export class DatabaseService {



  constructor(private supabase: SupabaseService) {}

    register(email: string, password: string): boolean {
      let success = false;
      this.supabase.getClient().auth.signUp({
        email: email,
        password: password
      }).then(({data, error}) => {
        if (error) {
          console.error("Error: ", error.message);
        } else {
          console.log(data)
          alert("registro exitoso")
          success = true;
        }
      })
  
      return success;
    }
    
   login (email: string, password: string): boolean {
      let success = false;
      this.supabase.getClient().auth.signInWithPassword({
          email: email,
          password: password
      }).then(({data, error})=>{
          console.log(data)
          if (error) {
              console.error("Error: ", error.message)
          } else {
              success = true;
          }
      })
      return success
    }

    getUser () {
      return this.supabase.getClient().auth.getUser()
    }

    signOut() {
      this.supabase.getClient().auth.signOut();
    }

}
