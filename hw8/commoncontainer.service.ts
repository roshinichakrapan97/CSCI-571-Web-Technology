import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class CommoncontainerService {
  private messenger = new BehaviorSubject({});
  myJSONFile1 = this.messenger.asObservable();

  private singleProduct = new BehaviorSubject<Products>(null);
  myProduct = this.singleProduct.asObservable();

  private displayTable =  new BehaviorSubject([]);
  myTable = this.displayTable.asObservable();

wish_list=[]
private wish_source =  new BehaviorSubject(this.wish_list);
  wish_observe = this.wish_source.asObservable();


  constructor() { }


sendSingleProduct(changedProduct: Products){
  this.singleProduct.next(changedProduct);
}

  alterComponent(changedComponent: any){
    this.messenger.next(changedComponent);    
  }

  add_wish(prod){
    this.wish_list.push(prod)
    this.wish_source.next(this.wish_list)
    localStorage.setItem('chakrapa_web_list',JSON.stringify(this.wish_list))
  }

  delete_wish(prod){
    this.wish_list=this.wish_list.filter(x=>x.itemidentifier!=prod.itemidentifier)
    this.wish_source.next(this.wish_list)
    localStorage.setItem('chakrapa_web_list',JSON.stringify(this.wish_list))
  }

  init_wish(){
   
    //localStorage.removeItem('web_list')
    console.log(localStorage.getItem('chakrapa_web_list'))
    this.wish_list=JSON.parse(localStorage.getItem('chakrapa_web_list'))
    if(this.wish_list == null){
      this.wish_list = [];
    }
    this.wish_source.next(this.wish_list)
  }

  contains_wish(prod){
 
    return this.wish_list.filter(x=>x.itemidentifier==prod.itemidentifier).length>0? true: false;
  }


  alterTable(changeTable: any)
  {
    this.displayTable.next(changeTable);
  }

}
