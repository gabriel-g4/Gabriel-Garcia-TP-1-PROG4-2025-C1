import { Routes } from '@angular/router';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { 
        path: "", 
        redirectTo: "/bienvenida" , 
        pathMatch: "full" 
    },
    { 
        path: "bienvenida", 
        loadComponent: ()=> import('../app/pages/bienvenida/bienvenida.component').then(c => c.BienvenidaComponent)
    },
    { 
        path: "login", 
        loadComponent: ()=> import('../app/pages/login/login.component').then(c => c.LoginComponent),
        canActivate: [noAuthGuard]
    },
    { 
        path: "quien-soy", 
        loadComponent: ()=> import('../app/pages/quien-soy/quien-soy.component').then(c => c.QuienSoyComponent) 
    },
    { 
        path: "registro", 
        loadComponent: ()=> import('../app/pages/registro/registro.component').then(c => c.RegistroComponent), 
        canActivate: [noAuthGuard]
    },
    { 
        path: "ahorcado", 
        loadComponent: ()=> import('../app/games/ahorcado/ahorcado.component').then(c => c.AhorcadoComponent),
        canActivate: [authGuard]

    },
    { 
        path: "mayor-menor", 
        loadComponent: ()=> import('../app/games/mayor-menor/mayor-menor.component').then(c => c.MayorMenorComponent),
        canActivate: [authGuard]

    },
    { 
        path: "preguntados", 
        loadComponent: ()=> import('../app/games/preguntados/preguntados.component').then(c => c.PreguntadosComponent),
        canActivate: [authGuard]

    },
    { 
        path: "**", 
        redirectTo: "/bienvenida", 
        pathMatch: "full"

    }
];
