import { Routes } from '@angular/router';
import { BienvenidaComponent} from '../app/pages/bienvenida/bienvenida.component';
import { LoginComponent} from '../app/pages/login/login.component';
import { SobreMiComponent} from '../app/pages/sobre-mi/sobre-mi.component';
import { RegistroComponent} from '../app/pages/registro/registro.component';

export const routes: Routes = [
    { path: "", redirectTo: "/bienvenida" , pathMatch: "full" },
    { path: "bienvenida", component: BienvenidaComponent},
    { path: "login", component: LoginComponent},
    { path: "sobre-mi", component: SobreMiComponent},
    { path: "registro", component: RegistroComponent}
];
