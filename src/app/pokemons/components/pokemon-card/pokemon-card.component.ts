import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>(); // aqui se espera recibir un pokemon simple

  // señal computada para generar la URL de la imagen del pokemon
  // se usa `computed` para que se actualice automáticamente si el pokemon cambia
  public readonly pokemonImage= computed(() =>{
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`;// la URL de la imagen del pokemon
  })
  // logEffect = effect(() => {
  //   console.log('pokemon:', this.pokemon());
    
  // });


}
