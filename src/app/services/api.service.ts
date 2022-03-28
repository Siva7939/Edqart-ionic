import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { API_ORDER, API_PAYMENT } from '../constants/api-endpoints';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    accessToken = '';
    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    get(url: string, urlType?: string): Observable<any> {
        url = this.urlGenerate(url, urlType);
        return this.http.get<any>(url, httpOptions).pipe(map(data => {
            return data;
        }));
    }

    post(url: any, obj: any, urlType?: string): Observable<any> {
        url = this.urlGenerate(url, urlType);
        return this.http.post(url, JSON.stringify(obj), httpOptions).pipe(map(data => {
            return data;
        }));
    }

    postWithoutHeaders(url: any, obj: any, urlType?: string): Observable<any> {
        url = this.urlGenerate(url, urlType);
        return this.http.post(url, obj).pipe(map(data => {
            return data;
        }));
    }

    put(url: any, Obj: any, urlType?: string): Observable<any> {
        url = this.urlGenerate(url, urlType);
        return this.http.put(url, JSON.stringify(Obj), httpOptions).pipe(map(data => {
            return data;
        }));
    }

    delete(url: any, urlType?: string): Observable<any> {
        url = this.urlGenerate(url, urlType);
        return this.http.delete<any>(url, httpOptions).pipe(map(data => {
            return data;
        }));
    }

    checkPinCode(pin: any) {
        return this.http.get('https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=0&limit=10&filters[pincode]=' + pin).pipe(
            tap((product: any) => console.log()),
            catchError(this.handleError<any>('checkPinCode'))
        );
    }

    filePost(url: any, obj: any, urlType?: string): Observable<any> {
        url = this.urlGenerate(url, urlType);
        return this.http.post(url, obj).pipe(map(data => {
            return data;
        }));
    }

    // If token is reqired URL generating with token
    setUrl(url: any, accessToken: any) {
        if (accessToken) {
            url = `${environment.baseUrl}` + url + '?access_token=' + this.accessToken;
        } else {
            url = `${environment.baseUrl}` + url;
        }
        return url;
    }

    // Dynamic URL generating 
    urlGenerate(url: any, urlType?: string) {
        if (url.indexOf('https://') > -1 || url.indexOf('http://') > -1 || url.indexOf('/assets/') > -1) { // Third party URL's
            url = url;
        } else {
            url = urlType ? `${environment[urlType]}${url}` : `${environment.baseUrl}${url}`
        }
        return url;
    }

    captureRazorPayOrder(data) {
        return this.http.post(`${environment.baseUrl}` + API_PAYMENT.razorpay, data);
    }

    createOrder(order): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}` + API_ORDER.createOrder, order, httpOptions).pipe(
            tap((product: any) => console.log()),
            catchError(this.handleError<any>('createOrder'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        console.error(result);
        /*return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          // return of(result as T);
          if (error) {
            return of(error);
          } else if (result) {
            return of(error as T);
          }
    
        };*/
        return result;
    }
}
