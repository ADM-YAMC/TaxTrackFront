import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/IResponse';
import { TipoContribuyente } from '../models/TipoContribuyente';

@Injectable({
  providedIn: 'root',
})
export class TypeTaxpayersService {
  BASE_API_URL = environment.BASE_API_URL;
  constructor(private http: HttpClient) {}

  getTypeTaxpayers(): Observable<IResponse<TipoContribuyente>> {
    return this.http.get<IResponse<TipoContribuyente>>(
      `${this.BASE_API_URL}/TipoContribuyente`
    );
  }
  setTypeTaxpayers(
    tipoContribuyente: TipoContribuyente
  ): Observable<IResponse<string>> {
    return this.http.post<IResponse<string>>(
      `${this.BASE_API_URL}/TipoContribuyente`,
      tipoContribuyente
    );
  }

  putTypeTaxpayers(
    tipoContribuyente: TipoContribuyente
  ): Observable<IResponse<string>> {
    return this.http.put<IResponse<string>>(
      `${this.BASE_API_URL}/TipoContribuyente`,
      tipoContribuyente
    );
  }
}
