import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangerService {
  constructor(private http: HttpClient) { }

  getLatestList(): any {
    return this.http.get(`${environment.apiUrl}/latest`);
  }
  convert(data:any): any {
    return this.http.get(`${environment.apiUrl}/convert` , {
     params: data
    });
  }
  getLatestData(today:any , data:any): any {
    return this.http.get(`${environment.apiUrl}/${today}` , {
     params: data
    });
  }
  getTimeseries(data:any): any {
    return this.http.get(`${environment.apiUrl}/timeseries` , {
     params: data
    });
  }
  getSymbolsList(): any {
    return this.http.get(`${environment.apiUrl}/symbols`);
  }

}
