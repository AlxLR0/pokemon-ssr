import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { map, Observable } from 'rxjs';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';
import { Pokemon } from '../interfaces/pokemon.interface'; // 🔥 importar la interfaz correcta

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) {}

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0){
      --page;
    }

    page = Math.max(0, page);

    //esto es una llamada a la API de PokeAPI 
    // se obtiene una lista de pokemones
    return this.http.get<PokeAPIResponse>
    //este es el endpoint de la API que devuelve los pokemones
    (`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20`).pipe(
      map(resp => {
        const simplePokemons: SimplePokemon[] = resp.results.map(pokemon => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name
        }))

        return simplePokemons;
      }),
    )
  }

  // este metodo carga un pokemon por su id
  // se utiliza el id para obtener el pokemon de la API
  // se devuelve un observable de tipo Pokemon (ya no SimplePokemon)
  public loadPokemon(id: string){
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

}
