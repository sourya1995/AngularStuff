import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DashboardModule } from './dashboard.module';
import { AuthService } from '../services/auth/auth.service';
import { EventsService } from '../services/events/events.service';
import { Event } from '../services/events/event';
import { Router } from '@angular/router';

// src/app/dashboard/dashboard.component.spec.ts

class MockRouter {
  navigate(path) { }
}



const currentUser = {
  'username': 'myUser',
  '_id': '5a550ea739fbc4ca3ee0ce58'
};

const events: Array<Event> = [{
  '_id': '5a55135639fbc4ca3ee0ce5a',
  '_creator': '5a550ea739fbc4ca3ee0ce58',
  'title': 'My first event',
  'description': 'My first description',
  'city': 'Atlanta',
  'state': 'GA',
  'startTime': new Date().toISOString(),
  'endTime': new Date().toISOString(),
  '__v': 0,
  'suggestLocations': true,
  'members': [
    '5a550ea739fbc4ca3ee0ce58'
  ]
}];

class MockAuthService {
  currentUser = jasmine.createSpy('currentUser').and.callFake(() => currentUser);
}

class MockEventsService {
  getUserEvents = jasmine.createSpy('getUserEvents')
    .and.callFake(() => of(events));
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let eventsService: EventsService;
  let viewDateElement: DebugElement[];
  let calendarEventElement: DebugElement[];
  let eventLink: DebugElement[];
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        RouterTestingModule.withRoutes([
          { path: 'event', redirectTo: '/event' }
        ])
      ]
    })
      .overrideComponent(DashboardComponent, {
        set: {
          providers: [
            { provide: AuthService, useClass: MockAuthService },
            { provide: EventsService, useClass: MockEventsService },
            { provide: Router, useClass: MockRouter }
          ]
        }
      }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    authService = fixture.debugElement.injector.get(AuthService);
    eventsService = fixture.debugElement.injector.get(EventsService);
    router = fixture.debugElement.injector.get(Router);


    spyOn(component, 'addJSDate').and.callThrough();
    spyOn(component, 'addEventColors').and.callThrough();
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      viewDateElement = fixture.debugElement
        .queryAll(By.css('.toggle-view .btn-primary'));
      calendarEventElement = fixture.debugElement
        .queryAll(By.css('.cal-event'));
      eventLink = fixture.debugElement.queryAll(By.css('.cal-event-title'));
    });
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a call to get the current user\'s events', () => {
    expect(authService.currentUser).toHaveBeenCalled();
    expect(eventsService.getUserEvents)
      .toHaveBeenCalledWith('5a550ea739fbc4ca3ee0ce58');
    expect(component.addJSDate).toHaveBeenCalled();
    expect(component.addEventColors).toHaveBeenCalled();
    expect(component.events.length).toEqual(1);
  });

  it('should default the calendar to a week view', () => {
    expect(viewDateElement[0].classes.active).toBeFalsy(false);
    expect(viewDateElement[1].classes.active).toEqual(true);
    expect(viewDateElement[2].classes.active).toBeFalsy(false);
  });

  it('should display events within the current week in the calendar', () => {
    expect(calendarEventElement[0].nativeElement.textContent)
      .toContain('My first event');
  });

  it('should navigate to the event view when an event is clicked', () => {
    spyOn(router, 'navigate');
    eventLink[0].nativeElement.click();
    expect(router.navigate)
      .toHaveBeenCalledWith(['/event/' + '5a55135639fbc4ca3ee0ce5a']);
  });

  describe('addJSDate', () => {
    it('should add a "start" and "end" property to an event', () => {
      const result = component.addJSDate(events);
      expect(result[0].start).toEqual(jasmine.any(Date));
      expect(result[0].end).toEqual(jasmine.any(Date));
    });
  });

  describe('addEventColors', () => {
    it('should add a color property to an event', () => {
      const result = component.addEventColors(events);
      expect(result[0].color).toBeDefined();
    });
  });


});