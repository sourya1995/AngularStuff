import { Component } from '@angular/core';
import { CocktailService } from './cocktail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  drinks = [];
  query = '';
  constructor(private cocktail: CocktailService){

  }
  search(query: string){

    this.query = query;
    
    this.cocktail.search(query).subscribe((response: any) => { //TODO 
      this.drinks = response; //response's drinks will be in our drinks 
    })
  }
}
