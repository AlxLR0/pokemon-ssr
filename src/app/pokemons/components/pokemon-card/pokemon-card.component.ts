import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>(); // aqui se espera recibir un pokemon simple

  // logEffect = effect(() => {
  //   console.log('pokemon:', this.pokemon());
    
  // });

  
}
