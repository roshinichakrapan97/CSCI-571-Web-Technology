import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommoncontainerService } from '../commoncontainer.service';
import { Products } from '../products';
import { SearchingService } from '../searching.service';
import { delay } from 'q';
@Component({
  selector: 'app-entireresults',
  templateUrl: './entireresults.component.html',
  styleUrls: ['./entireresults.component.css']
})
export class EntireresultsComponent implements OnInit {
  
  @Output() results_emitted =  new EventEmitter<PaneType>();
  @Output() 
  contentspage1:string;
  changedComponent:any;
  details_enable:boolean=false;
  changeTable : any ;

  entire_products = [];
  page:number=1;
  singleitemJSON : any;
  pageSize:number=10;
  single_item_url: string;
  selectedObjects : Products;
  show_progress1: boolean = true;
  wisher=[];
  totalwishcost="";
  resultsvar: boolean = true;
  wishvar: boolean = true;
active_div : any;
  
  @Input()
  set activedivider(activedivder: string){
    this.active_div = activedivder
    if(activedivder == 'results')
    {
      this.resultsvar = true;
    }
    else{
      this.wishvar = true;
    }
  }
  
  @Input() showingvar: boolean;


async onHeadingClick(item: Products,from:string){

  this.details_enable = true;
  this.selectedObjects = item;
  if(from == 'fromwishlists'){
    this.wishvar = false;
  }
  else{
    this.resultsvar = false;
  }


  this.results_sliding();

//  this.single_item_url = "/singleItem?";
//   this.single_item_url += "itemidentifier="+ itemidentifier;
//   console.log(this.single_item_url);
//   this.singleitemJSON = await this._searchingService.ebaySingleProductCall(this.single_item_url).toPromise();
//   this.displaySingleItemJSON();


}
displaySingleItemJSON(){
  console.log(this.singleitemJSON);


  
}


wish_click(prod){
  //insert/delete
  if(this.commoncontainer.contains_wish(prod))
  this.commoncontainer.delete_wish(prod);
  else this.commoncontainer.add_wish(prod);
  this.calculateShipping();
  
}

wish_checker(prod){
  //Icon change
  return this.commoncontainer.contains_wish(prod)


  /**
   * 
   * 
   */
}

 async results_sliding(){
  this.show_progress1 = false;
  await delay(300);
  this.results_emitted.emit(this.selectedObjects);
  await delay(300);
    this.show_progress1 = true;
    
  

    //console.log(cont);
  }
  constructor(private commoncontainer: CommoncontainerService, private _searchingService: SearchingService ) { }

  async ngOnInit() {
    console.log("change table");
   console.log(this.changeTable)
    this.commoncontainer.wish_observe.subscribe(
      x=>{this.wisher=x;
        this.calculateShipping();})
    this.commoncontainer.myProduct.subscribe(changedProduct => { this.selectedObjects = changedProduct});
    
  
    this.commoncontainer.myJSONFile1.
    subscribe(changedComponent => { this.changedComponent = changedComponent; console.log(changedComponent)});
    //this.displayJSONFile();
    
    this.commoncontainer.myTable.
    subscribe(
      
      changeTable => {this.changeTable = changeTable,
      console.log("changed table", changeTable)}
    );
console.log("change table");
    console.log(this.changeTable)
    // await delay(400);
    // this.show_progress1 = true;
    

 
  }

  
  
  calculateShipping(){
    var wished_cost = 0;
    for(var i =0; i<this.wisher.length;i++)
    {
      wished_cost += parseFloat(this.wisher[i].price.substring(1,this.wisher[i].price.length));
    }
    console.log("wishlist Cost")
    console.log(wished_cost);
    
    this.totalwishcost = "$ " + String(wished_cost);
    
    var indi = this.totalwishcost.indexOf('.');
    console.log("index of .", indi);
    if (indi==-1){
      this.totalwishcost = this.totalwishcost + ".0";
    }
  
  
  }
 
}

type PaneType = 'resultslist' | Products;