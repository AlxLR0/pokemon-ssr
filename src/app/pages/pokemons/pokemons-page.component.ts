import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { Title, Meta } from '@angular/platform-browser';
import { title } from 'process';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  public isLoading = signal(true);
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  ngOnInit(): void {
    this.title.setTitle('Pokemons');
    this.meta.addTag({ name: 'description', content: 'This is the pokemon page' });

    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);

    this.loadPokemons();
  }

  //este metodo se encarga de cargar los pokemones
  public loadPokemons(Page = 0){
    this.pokemonsService.loadPage(Page)//esto es una llamada al servicio que se encarga de cargar los pokemones
    .subscribe(pokemons =>{
      // console.log('on init');
      this.pokemons.set(pokemons);//se setea el valor de los pokemones
      
    })
  }



}
