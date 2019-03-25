import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContactService {
  constructor(private http: HttpClient) {}

  submitContactForm(contactForm) {
    const apiHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('/contact', contactForm, {headers: apiHeaders});
  }
  
}