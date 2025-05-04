import supabase from "./supabase.service";

export class DatabaseService {

    register(email: string, password: string): boolean {
      let success = false;
      supabase.auth.signUp({
        email: email,
        password: password
      }).then(({data, error}) => {
        if (error) {
          console.error("Error: ", error.message);
          success = false;
        } else {
          alert("registro exitoso")
          success = true;
        }
      })
  
      return success;
    }
    
   login (email: string, password: string) {
      supabase.auth.signInWithPassword({
          email: email,
          password: password
      }).then(({data, error})=>{
          if (error) {
              console.error("Error: ", error.message)
          } else {
              alert("Login exitoso")
          }
      })}
}
