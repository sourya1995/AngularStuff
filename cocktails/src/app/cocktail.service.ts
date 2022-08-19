import { Injectable } from '@angular/core'; //this class is meant to be injected, we don't have to instantiate it anywhere
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' //register for usage
})
export class CocktailService {

  constructor(private http: HttpClient) {

   }

   public search(query: string){
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', {
      params: {
        s: query, //query parameters, this returns an object from where we can grab data
      }
    })
   }
}
