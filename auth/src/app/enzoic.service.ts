import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import sha256 from 'crypto-js/sha256';

@Injectable({
  providedIn: 'root'
})
export class EnzoicService {

  constructor(private http: HttpClient) {

  }

  checkPassword(password: string) {
    const hash = sha256(password);
    return this.http.get('https://api.enzoic.com/passwords', {
      params: {
        partial_sha256: hash.toString(CryptoJS.enc.Hex).substring(0, 10)
      }
    });
  }
}
