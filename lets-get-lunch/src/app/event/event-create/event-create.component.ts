import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MapsAPILoader } from '@agm/core/public-api';
import { EventsService } from 'src/app/services/events/events.service';
import { AuthService } from 'src/app/services/auth/auth.service';

declare var google: any;


@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  eventForm: FormGroup;
  location: any;
  error: string;
  success: string;
  @ViewChild('city', { static: false }) citySearch: ElementRef;

  constructor(private fb: FormBuilder, private gmaps: MapsAPILoader, private ngZone: NgZone, private eventsService: EventsService, private authService: AuthService) {

  }
  ngOnInit(): void {
      this.createForm();
      this.gmaps.load().then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.citySearch.nativeElement,{
          types: ['(cities)'],
          componentRestrictions: {'country' : 'us'}

        });
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            this.location = autocomplete.getPlace();
          });
        });
      });
  }

  createForm() {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      suggestLocation: [false, Validators.required]
    });
  }

  onSubmit() {
    this.error = '';
    this.success = '';

    const user = this.authService.currentUser();
    const event: Event = {
      _creator: user._id,
      title: this.eventForm.value.title,
      description: this.eventForm.value.description,
      startTime: this.eventForm.value.startTime,
      endTime: this.eventForm.value.endTime,
      city: this.location.address_components[0].long_name,
      state: this.location.address_components[2].short_name,
      suggestLocations: this.eventForm.value.suggestLocations
    };

    this.eventsService.create(event).subscribe(res => {
      this.success = 'Your event has been created';
    }, err =>{
      this.error = err.error.message;
    })


}
