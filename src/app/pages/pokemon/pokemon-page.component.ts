import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPageComponent implements OnInit {
  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  // señal reactiva que guarda el pokemon
  public pokemon = signal<Pokemon | null>(null); 
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    // obtener el pokemon desde el servicio
    this.pokemonsService.loadPokemon(id)
    .pipe(
      tap( ({name, id}) => {
        const pageTitle = `#${id} - ${name}`;// esto es para el título de la página y el nombre del pokemon
        const pageDescription = `Información sobre ${name}`; // esto es para la descripción de la página
        // SEO: actualizar el título y las meta etiquetas
        //esto sirve para que cada página de pokemon tenga su propio título y descripción en los motores de búsqueda
        this.title.setTitle(pageTitle); // Título de la página
        this.meta.updateTag({ name: 'description', content: pageDescription });// Descripción
        this.meta.updateTag({ name: 'og:title', content: pageTitle}); // Open Graph título
        this.meta.updateTag({ name: 'og:description', content: pageDescription}); // Open Graph descripción
        this.meta.updateTag({ name: 'og:image', content: 
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`, // Open Graph imagen
        });// Open Graph imagen
      })
    )
    .subscribe(p => this.pokemon.set(p));
  } 
}
