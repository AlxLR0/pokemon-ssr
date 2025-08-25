import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  // señal reactiva que guarda el pokemon
  public pokemon = signal<Pokemon | null>(null); 
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    // obtener el pokemon desde el servicio
    this.pokemonsService.loadPokemon(id).subscribe(p => this.pokemon.set(p));
  } 
}
