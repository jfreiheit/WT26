import { Routes } from '@angular/router';
import { Eins } from './eins/eins';
import { Zwei } from './zwei/zwei';
import { Home } from './home/home';

export const routes: Routes = [
  { path: 'eins', component: Eins },
  { path: 'zwei', component: Zwei },
  { path: 'home', component: Home },
  { path: 'home/:id', component: Home }
];

