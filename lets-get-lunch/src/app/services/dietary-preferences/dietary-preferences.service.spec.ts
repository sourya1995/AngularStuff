import { TestBed } from '@angular/core/testing';

import { DietaryPreferencesService } from './dietary-preferences.service';

const dietPreferences = [
  { name: 'BBQ', checked: false },
  { name: 'Burger', checked: false },
  { name: 'Chinese', checked: false },
  { name: 'Deli', checked: false },
  { name: 'Fast Food', checked: false },
  { name: 'Italian', checked: false },
  { name: 'Japanese', checked: false },
  { name: 'Mexican', checked: false },
  { name: 'Pizza', checked: false }
];

describe('DietaryPreferencesService', () => {
  let service: DietaryPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietaryPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('.getDietaryPreferences() should return an array of dietary Preferences', () => {
    expect(service.getDietaryPreferences()).toEqual(dietPreferences);
  });
});
