import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contribuyente } from '../models/Contribuyente';
import { IResponse } from '../models/IResponse';

@Injectable({
  providedIn: 'root',
})
export class TaxpayersService {
  BASE_API_URL = environment.BASE_API_URL;
  constructor(private http: HttpClient) {}

  getTaxpayers(): Observable<IResponse<Contribuyente>> {
    return this.http.get<IResponse<Contribuyente>>(
      `${this.BASE_API_URL}/ContribuyenteFiscal`
    );
  }

  setTaxpayers(contribuyente: Contribuyente): Observable<IResponse<string>> {
    return this.http.post<IResponse<string>>(
      `${this.BASE_API_URL}/ContribuyenteFiscal`,
      contribuyente
    );
  }

  putTaxpayers(contribuyente: Contribuyente): Observable<IResponse<string>> {
    return this.http.put<IResponse<string>>(
      `${this.BASE_API_URL}/ContribuyenteFiscal`,
      contribuyente
    );
  }
}
