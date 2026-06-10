import { Routes } from '@angular/router';
import { Eins } from './eins/eins';
import { Zwei } from './zwei/zwei';

export const routes: Routes = [
  { path: 'eins', component: Eins },
  { path: 'zwei', component: Zwei }
];
