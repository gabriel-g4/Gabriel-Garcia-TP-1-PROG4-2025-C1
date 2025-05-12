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
      supabase.auth.signInWithPassword({
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
      return supabase.auth.getUser()
    }

    signOut() {
      supabase.auth.signOut();
    }

}
