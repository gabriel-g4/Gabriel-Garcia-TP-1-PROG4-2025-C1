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
        loadComponent: ()=> import('./components/pages/bienvenida/bienvenida.component').then(c => c.BienvenidaComponent)
    },
    {
        path: "chat",
        loadComponent: ()=> import('../app/components/chat/chat.component').then(c => c.ChatComponent),
        canActivate: [authGuard]
    },
    { 
        path: "login", 
        loadComponent: ()=> import('./components/pages/login/login.component').then(c => c.LoginComponent),
        canActivate: [noAuthGuard]
    },
    { 
        path: "quien-soy", 
        loadComponent: ()=> import('./components/pages/quien-soy/quien-soy.component').then(c => c.QuienSoyComponent) 
    },
    { 
        path: "registro", 
        loadComponent: ()=> import('./components/pages/registro/registro.component').then(c => c.RegistroComponent), 
        canActivate: [noAuthGuard]
    },
    { 
        path: "ahorcado", 
        loadComponent: ()=> import('./components/games/ahorcado/ahorcado.component').then(c => c.AhorcadoComponent),
        canActivate: [authGuard]

    },
    { 
        path: "mayor-menor", 
        loadComponent: ()=> import('./components/games/mayor-menor/mayor-menor.component').then(c => c.MayorMenorComponent),
        canActivate: [authGuard]

    },
    { 
        path: "preguntados", 
        loadComponent: ()=> import('./components/games/preguntados/preguntados.component').then(c => c.PreguntadosComponent),
        canActivate: [authGuard]

    },
    {
        path: "resultados",
        loadComponent: ()=> import('./components/pages/resultados/resultados.component').then(c => c.ResultadosComponent),
        canActivate: [authGuard]
    },
    { 
        path: "**", 
        redirectTo: "/bienvenida", 
        pathMatch: "full"

    }
];
