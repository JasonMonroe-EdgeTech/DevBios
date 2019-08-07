import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CanActivate, CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate,CanDeactivate<CanComponentDeactivate> {

  private authResponse = new BehaviorSubject(false); 
  authenticated = this.authResponse.asObservable();

  constructor() { }

  login(){
    return new Observable((observer)=>{
      setTimeout(()=>{
        observer.next(true);
        this.authResponse.next(true);
      }, 1000);
      setTimeout(()=>{
        observer.complete();
      },2000);
    });
  }

  logout(){
    this.authResponse.next(false);
  }

  canActivate() {
    return this.authenticated;
  }

  canDeactivate(component:CanComponentDeactivate){
    return component.canDeactivate?component.canDeactivate():true;
  }

}
