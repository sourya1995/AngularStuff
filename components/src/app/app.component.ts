import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts = [
    {
      img: 'assets/image1.jpg',
      author: 'John',
      title: 'Title #1'
    },
    {
      img: 'assets/image2.jpg',
      author: 'Mike',
      title: 'Title #2'
    },
    {
      img: 'assets/image3.jpg',
      author: 'Jane',
      title: 'Title #3'
    }
  ]
}
