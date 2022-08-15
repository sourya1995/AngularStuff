import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'john doe';
  todaysDate = new Date();
  cost = 2000;
  temperature = 27.25;
  DBZ = {
    characterName: 'Goku',
    powers: ['Kamehameha', 'Kaioken', 'Genki-Dama', 'Ryuken', 'Susanoo', 'Shunkan Ido']
  };
}
