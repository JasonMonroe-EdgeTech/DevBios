import { Injectable } from '@angular/core';
import { Developer } from './developer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  devs:Developer[];
  postHeader =  {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  private baseURL: string = "https://developer-service-overspeedy-celebratedness.cfapps.io/";

  constructor(private httpClient:HttpClient) { }

  getAllDevelopers():Observable<Developer[]>{
    return this.httpClient.get<Developer[]>(this.baseURL+"developers")
      .pipe(
        map(response=>{
          this.devs = response;
          return response;
        }),
        catchError(this.handleError<any>())
      );
  }

  
  addDeveloper(developer:Developer): boolean {
    this.httpClient.post<Developer>(this.baseURL+"developer", 
          developer, this.postHeader)
      .subscribe(res => {
      }, (err) => {
        console.log(err);
      });
    return true;
  }
  
  private handleError<T>( result?: T) {
    return (error: any): Observable<T> => {
      console.log('An Error occured' + error);
      return null;
    }
  }

  getDeveloperByID(devId:number):Developer{
    return this.devs.find(dev => dev.id == devId);
  }


}
