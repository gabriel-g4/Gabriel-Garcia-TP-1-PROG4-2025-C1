import { Routes } from '@angular/router';
import { BienvenidaComponent} from '../app/pages/bienvenida/bienvenida.component';
import { LoginComponent} from '../app/pages/login/login.component';
import { QuienSoyComponent} from './pages/quien-soy/quien-soy.component';
import { RegistroComponent} from '../app/pages/registro/registro.component';

export const routes: Routes = [
    { path: "", redirectTo: "/bienvenida" , pathMatch: "full" },
    { path: "bienvenida", component: BienvenidaComponent},
    { path: "login", component: LoginComponent},
    { path: "quien-soy", component: QuienSoyComponent},
    { path: "registro", component: RegistroComponent},
    { path: "**", redirectTo: "/bienvenida", pathMatch: "full"}
];
