import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'pokemons',
        loadComponent: () => import('./pages/pokemons/pokemons-page.component').then(m => m.PokemonsPageComponent)
    },
    {
        path: 'pokemon/:id',
        loadComponent: () => import('./pages/pokemon/pokemon-page.component').then(m => m.PokemonPageComponent),
        data: {
            renderMode: 'server' // 👈 esto evita el error de Vercel
        }
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about-page/about-page.component').then(m => m.AboutPageComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact-page/contact-page.component').then(m => m.contactPageComponent)
    },
    {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing-page/pricing-page.component').then(m => m.pricingPageComponent)
    },
    {
        path: '**',
        redirectTo: 'pokemons'
    }
];
