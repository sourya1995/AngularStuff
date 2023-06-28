import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event';
import format from 'date-fns/format';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  create(event: Event): Observable<Event>{
    return this.http.post<Event>('http://api.endpoint:3000/api/events', event);
  }

  getUserEvents(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`http://api.endpoint:3000/api/events/user'/${userId}`); 
  }

  get(id: string): Observable<Event> {
    return this.http.get<Event>('http://api.endpoint:3000/api/events/' + id).pipe(map((res: Event) => this.formatDateTime(res)));
  }

  formatDateTime(event: Event): Event{
    event.displayStart = format(event.startTime, 'dddd MMM, Do - H:mm');
    event.displayEnd = format(event.endTime, 'dddd MMM, Do - H:mm');
    return event;
  }

  all(): Observable<Event[]> {
    return this.http.get<Event[]>('http://api.endpoint:3000/api/events');
  }
}
