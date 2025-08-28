import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pricing',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Server   // 🚨 importante: NO prerender, solo SSR dinámico
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
// Nota: la ruta 'pokemons' se prerenderiza, pero internamente hace fetch a la API
// para obtener los pokemons de la primera página (1-20). Las páginas siguientes