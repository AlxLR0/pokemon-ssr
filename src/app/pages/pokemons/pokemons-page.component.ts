import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { Title, Meta } from '@angular/platform-browser';
import { title } from 'process';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";

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

  ngOnInit(): void {
    this.title.setTitle('Pokemons');
    this.meta.addTag({ name: 'description', content: 'This is the pokemon page' });

    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }



}
