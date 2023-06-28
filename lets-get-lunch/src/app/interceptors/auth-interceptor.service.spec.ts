import { TestBed } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthInterceptorService } from './auth-interceptor.service';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;
  let http: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptorService,
        multi: true
      }
    ]
    });
    http = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should append a token to the headers if a token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('sometoken');
    httpClient.get('/test').subscribe(res => {});
    const req = http.expectOne('/test');
    req.flush('ok');
    expect(req.request.headers.get('Authorization')).toEqual('sometoken');
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
