import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import{CommoncontainerService} from './commoncontainer.service';

@Injectable({
  providedIn: 'root'
})
export class SearchingService {
  jsonFile : any;
required_url= '/enroll?';
autocomplete_url = '';
constructor(private _http: HttpClient, private commoncontainer: CommoncontainerService) { }

fetchCurrentLocation(){
return this._http.get<any>("http://ip-api.com/json");

}

makeanebaycall(_url1: string){
  this.jsonFile = this._http.get<any>(_url1);
  return this.jsonFile;

}
ebaySimilarProductsCall(similar_url: string){
  return this._http.get<any>(similar_url);
}
ebaySingleProductCall(single_url: string){
  return this._http.get<any>(single_url);
}
displayPhotosCall(photo_url: string){
  return this._http.get<any>(photo_url);
}






  

getPopulatedValues(zipcodes: string){
  this.autocomplete_url = '/autocomplete?zipcodes=' + zipcodes;
  return this._http.get<any>(this.autocomplete_url);


}


}
