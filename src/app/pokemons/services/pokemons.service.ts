import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { map, Observable, tap } from 'rxjs';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';

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
    (`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=20`).pipe(//esto es un pipe que permite transformar la respuesta de la API
      map(resp => {//esto es un map que permite transformar la respuesta de la API
        const simplePokemons: SimplePokemon[] = resp.results.map(pokemon => ({//esto es un map que permite transformar la respuesta de la API
          //se obtiene el id del pokemon a partir de la url
          //la url tiene el formato https://pokeapi.co/api/v2/pokemon/1
          //por lo tanto, se puede obtener el id del pokemon a partir de la url
          //se utiliza el método split para dividir la url en partes y se obtiene la penúltima parte
          //esto es porque la última parte es el nombre del pokemon
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name//esto es el nombre del pokemon
        }))

        return simplePokemons;
      }),
      // tap(console.log)
    )
  }

}
