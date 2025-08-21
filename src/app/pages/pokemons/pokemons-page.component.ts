import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { Title, Meta } from '@angular/platform-browser'; 
import {toSignal} from '@angular/core/rxjs-interop';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';

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

  private route = inject(ActivatedRoute); 
  private router = inject(Router);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page)=>(isNaN(+page)?1 :+page)), // Convierte el valor a número, si no es un número, devuelve 1
      map((page)=>Math.max(1,page)) // Asegura que el valor sea al menos 1
    )
  )

  ngOnInit(): void {
    this.title.setTitle('Pokemons');
    this.meta.addTag({ name: 'description', content: 'This is the pokemon page' });

    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);

    this.loadPokemons();
  }

  //este metodo se encarga de cargar los pokemones
public loadPokemons(page = 0) {
  // Calcula la página a cargar en base a la actual + el offset recibido (page)
  const pageToLoad = this.currentPage()! + page;

  // Evita que la página sea menor a 1
  if (pageToLoad < 1) return;

  this.isLoading.set(true); // Inicia la carga

  this.pokemonsService.loadPage(pageToLoad) //esto es una llamada al servicio que se encarga de cargar los pokemones
    .pipe(
      tap(() =>
        // 👇 para la nevegacion
         this.router.navigate([], { queryParams: { page: pageToLoad } })
      ),
      tap(()=> this.title.setTitle(`Pokedex Page ${pageToLoad}`)), // Cambia el título de la página
    )
    .subscribe(pokemons => {
      // console.log('on init');
      this.pokemons.set(pokemons); //se setea el valor de los pokemones
      this.isLoading.set(false); // Termina la carga
    });
}



}
