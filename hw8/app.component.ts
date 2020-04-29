import { Component, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Products} from './products';
import {SearchingService} from './searching.service';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';
import{CommoncontainerService} from './commoncontainer.service';

import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { delay } from 'q';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slide1', [
      state('resultslist', style({ transform: 'translateX(0)' })),
      state('eachprod', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
  ])]
})
export class AppComponent {
  @Input() resultsshowed: boolean;
  @Input() wishlistshowed: boolean;
  @Input() resultLight: boolean=true;
  @Input() wishLight: boolean = false;
  contentspage: string;
  codes: string[] = [];
  conds: string[] = [];
  shipps:string[] = [];
  geo_location: string = '';
  required_url= '';
  myJSONFile : any;
  JSONFILE:any;
  showresult:boolean = false;
  changedComponent:any={};
  entire_products = [];
  single_item_url = '';
  norecordstable = false;
  show_progress = true;
  show_progress1 = true;
  flag = true;

  hidewish = true;
  contentspage1 : string;
  prod: Products;
  activated_div : string = 'results';




  


get keyw()
{
  return this.productSearch.get('keyw');
}  
get zipcode()
{
  return this.productSearch.get('zipcode');
}

get catg(){
  return this.productSearch.get('catg');
}

get new1(){
  return this.productSearch.get('new1');
}

get used(){
  return this.productSearch.get('used');
}

get unspecified(){
  return this.productSearch.get('unspecified');
}

get localpp(){
  return this.productSearch.get('localpp');
}

get freeship(){
  return this.productSearch.get('freeship');
}

get dist(){
  return this.productSearch.get('dist');
}

get miles(){
  return this.productSearch.get('miles');
}
async autocompletenesscall(){
  var autocompletezipcode: any = [];
var variables = [];
  autocompletezipcode = await this._searchingService.getPopulatedValues(this.zipcode.value).toPromise(); 
  console.log(this.autocompletenesscall);
  console.log(this.autocompletenesscall);
  console.log(this.autocompletenesscall);
  console.log(this.autocompletenesscall);

  
  for (var i=0; i< autocompletezipcode.length;i++)
  {
    variables.push(autocompletezipcode[i]);

  }
  console.log(variables);
  
  this.codes= variables;

  console.log(this.codes);
  this.geo_location = '';
  variables = [];
  
//http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=900&username=chakrapa&country=US&maxRows=5

}
zipcodes_populate(){
  if(this.zipcode.value.trim().length>=3){
    this.autocompletenesscall();
  }
    else{
      this.codes = [];

    }
  }


resultsDetails()
{
  this.resultsshowed= true;
  this.wishlistshowed=false;
  this.wishLight = true;
  this.resultLight = false;

}
wishListContent()
{
  this.resultsshowed= false;
  this.wishlistshowed=true;
  this.wishLight = false;
  this.resultLight = true;
  
}

onEmission(cont: PaneType){
  console.log(cont);
  if(cont == 'resultslist')
    this.contentspage1 = cont;
  else {
    this.contentspage1 = 'eachprod';
    this.prod = cont;
  }
}

async sliding_content(divstring: string){
  this.activated_div = divstring;
  this.hidewish = true;
  this.contentspage1 = 'resultslist';

    this.wishLight = true;
  this.resultLight = false
  //this.showresult = true;

  if(this.flag)  {
   // this.showresult = true;
  this.show_progress1 = false;
  this.flag = true;

  await delay(1000);
  this.show_progress1 = true;
  
  }
}

  
  async sliding_content1(divstring: string){
    this.activated_div = divstring;
    this.contentspage1 = 'resultslist';

    console.log("active div" , this.activated_div)
    this.hidewish = false;
    //this.showresult=true;
    this.wishLight = false;
    this.resultLight = true;



  await delay(500);
  this.show_progress1 = true;


}

  constructor(private _searchingService: SearchingService,private commoncontainer: CommoncontainerService) {}

  current_location: any;
  title = 'homework8';
  productSearch = new FormGroup({
    keyw: new FormControl('', Validators.required),
    catg: new FormControl('0'),
    new1: new FormControl(''),
    used: new FormControl(''),
    unspecified: new FormControl(''),
    freeship: new FormControl(''),
    localpp: new FormControl(''),
    dist: new FormControl(''),
    miles: new FormControl('currentloc'),
    zipcode: new FormControl({value:'',disabled:true})
    
  
  });

  enablezipcode()
  {
    this.zipcode.enable();
    

  }
  disablezipcode()
{
  this.zipcode.disable();
  this.zipcode.setValue('');
  this.zipcode.markAsUntouched();

}
  

async ngOnInit(){
  this.resultLight=false;
  this.wishLight = true;
  this.flag = true;

  this.commoncontainer.init_wish();

}
onClear(){
  
  this.productSearch.patchValue({keyw:'',catg:'0',new1:'',used:'',unspecified:'',freeship:'',localpp:'',dist:'',miles:'currentloc',zipcode:''})
  this.keyw.markAsUntouched();
  this.zipcode.markAsUntouched();
  this.zipcode.disable();

  console.log(this.productSearch.value);
  this.showresult=false;
  //this.hidewish = true;
  this.resultsDetails();
  //this.activated_div = 'results';
  this.sliding_content("results");

  // if(this.contentspage == 'wishlistcont'){
  //   this.flag = false;
  //   this.sliding_content('resultcontent');
  // }

}
async createURL(){
  this.required_url = '/enroll?';
  this.required_url += 'keyw=';
    this.required_url += this.keyw.value;
    this.required_url += '&catg=';
    this.required_url += this.catg.value;
    
    if (this.new1.value == true ){
      
    this.required_url += '&new1=true';

    }
    else{
      this.required_url += '&new1=false';

    }
    if (this.used.value == true ){
      
      this.required_url += '&used=true';

    }
    else{
      this.required_url += '&used=false';
    }

    if(this.unspecified.value == true)
    {
      this.required_url += '&unspecified=true';
    }
    else{
      this.required_url += '&unspecified=false';
    }

  
if(this.localpp.value == true){
  this.required_url += '&localpp=true';

}
else{
  this.required_url += '&localpp=false';
}
if(this.freeship.value == true){
  this.required_url += '&freeship=true';

}
else{
  this.required_url += '&freeship=false';
}



if(this.miles.value == 'currentloc'){
  this.required_url += '&zipcode=';
  this.required_url += this.current_location;

}
else{
  this.required_url += '&zipcode=';
  this.required_url += this.zipcode.value;

}

if(this.dist.value === '')
{
  this.required_url += '&miles=';
  this.required_url += '10';
}
else{
  this.required_url += '&miles=';
  this.required_url += this.dist.value;

}
console.log(this.required_url);
this.JSONFILE = await this._searchingService.makeanebaycall(this.required_url).toPromise();
// .subscribe(
//       response => {this.createJSONFile(response);console.log('Success!',response);} ,
//       error =>  console.error('Error!', error)

//     );
  //console.log("hiiiii");
  //  console.log(this.myJSONFile);
  //this.commoncontainer.alterComponent(this.JSONFILE);
  //this.showresult=true;
  this.changedComponent = this.JSONFILE;
  this.displayJSONFile();

}

async createSingleItemURL(){
  this.single_item_url = '/singleitem?';

}

displayJSONFile(){
  if(this.changedComponent.findItemsAdvancedResponse[0].ack[0]=="Success")
  {
    console.log("ACK: SUCCESS");
    console.log(this.changedComponent.findItemsAdvancedResponse[0]);
    let inter_result = this.changedComponent.findItemsAdvancedResponse[0].searchResult[0];
    let count_products = inter_result["@count"];
    let allproducts = inter_result.item;
    console.log("count")
    console.log(count_products);
    
if(count_products != "0"){


    for(var i=0;i<count_products;i++){
      let ship_array :[string, string][]= [];
    let sell_array :[string, string][]= [];
      let prod = allproducts[i];
      let prodid = prod.itemId[0];
      let ebaylink= prod.viewItemURL[0];
      let imageurl = prod.galleryURL[0];
      let title = prod.title[0];
      let cut_title = "";
      if(title.length>=35 ){
      if(title[34]==''){
        cut_title =title.slice(0,35);
        cut_title += " ..";
      }
      else{
        var ind = title.slice(0,35).lastIndexOf(' ');
        cut_title = title.slice(0,ind);
        cut_title += " ..";
      }
    }
     
      else{
        cut_title = title;
      }
      let price1 = prod.sellingStatus[0].currentPrice[0]["__value__"] 
      let currency = prod.sellingStatus[0].currentPrice[0]["@currencyId"];
      if(currency == "USD"){
        currency = "$";
      }
      let price = currency + price1;
      let seller = "N/A";

      let zip ="N/A";
      let shipping_stuff = "N/A"; //shippingcost
      let shippingLocation="N/A";
      let handlingTime  = "N/A";
      let expeditedShipping = "N/A";
      let oneDayShipping = "N/A";
      let returnAccepted = "N/A";
      // let feedbackScore = "N/A";
      // let popularity="N/A";
      // let ratingStar = "N/A";
      // let topRated = "N/A";
      // let storeName="N/A";
      // let storeURL = "N/A";


      if(prod.hasOwnProperty('postalCode')){
        zip = prod.postalCode[0];
      }
      if(prod.hasOwnProperty('shippingInfo')){

      
      if(prod.shippingInfo[0].hasOwnProperty('shippingServiceCost'))
      {
        if(prod.shippingInfo[0].shippingServiceCost[0]["__value__"] == "0.0")
        {
          shipping_stuff = "Free Shipping";

        }
        else{
          shipping_stuff = prod.shippingInfo[0].shippingServiceCost[0]["__value__"];
          if(prod.shippingInfo[0].shippingServiceCost[0]["@currencyId"] == "USD"){
            shipping_stuff = "$" + shipping_stuff;
        }
        else{
          shipping_stuff = prod.shippingInfo[0].shippingServiceCost[0]["@currencyId"] + shipping_stuff;
        }
      }
      ship_array.push(['Shipping Cost',shipping_stuff])
      
    }
    var shippingprod = prod.shippingInfo[0]
    if(shippingprod.hasOwnProperty('shipToLocations')){
      shippingLocation = shippingprod.shipToLocations[0];  

  ship_array.push(['Shipping Location',shippingLocation]);
    }
    

    if(shippingprod.hasOwnProperty('handlingTime')){
      handlingTime = shippingprod.handlingTime[0];
      if (handlingTime == "0" || handlingTime == "1")
      {
        handlingTime += " Day";
      }
      else{
        handlingTime += " Days";
      }
      ship_array.push(['Handling Time',handlingTime]);
    }
    if(shippingprod.hasOwnProperty('expeditedShipping')){
      expeditedShipping = shippingprod.expeditedShipping[0];
      ship_array.push(['Expedited Shipping',expeditedShipping]);
    }
    if(shippingprod.hasOwnProperty('oneDayShippingAvailable')){
      oneDayShipping = shippingprod.oneDayShippingAvailable[0];
       
  ship_array.push(['One Day Shipping',oneDayShipping]);
    }

    

  }
  if(prod.hasOwnProperty('returnsAccepted')){
    returnAccepted = prod.returnsAccepted;
    

    ship_array.push(['Return Accepted',returnAccepted]);
  }






  // if(prod.hasOwnProperty('sellerInfo')){
  //   var seller_prod = prod.sellerInfo[0];
  //   if(seller_prod.hasOwnProperty('feedbackScore'))
  //   {
  //     feedbackScore = seller_prod.feedbackScore[0];
  //     sell_array.push(['Feedback Score',feedbackScore]);

  //   }
  //   if(seller_prod.hasOwnProperty('positiveFeedbackPercent')){
  //     popularity = seller_prod.positiveFeedbackPercent[0];

  //     sell_array.push(['Popularity',popularity]);
  //   }

  //   if(seller_prod.hasOwnProperty('feedbackRatingStar')){
  //     ratingStar = seller_prod.feedbackRatingStar[0];
  //     sell_array.push(['Feedback Rating Star',ratingStar]);
  //   }
  //   if(seller_prod.hasOwnProperty('topRatedSeller')){
  //     topRated = seller_prod.topRatedSeller[0];
  //     sell_array.push(['Top Rated',topRated]);
  //   }
  //   if(seller_prod.hasOwnProperty('sellerUserName')){
  //   seller = prod.sellerInfo[0].sellerUserName[0];
  //   sell_array.push(['Seller Name', seller]);
  // }
  // }
  // if(prod.hasOwnProperty('storeInfo')){
  //   var store_prod = prod.storeInfo[0];
  //   if(store_prod.hasOwnProperty('storeName')){
  //     storeName = store_prod.storeName[0];

  // sell_array.push(['Store Name',storeName]);
  
  //   }
  //   if(prod.hasOwnProperty('storeURL'))
  //   {
  //     storeURL = store_prod.storeURL[0];
  //     sell_array.push(['Buy Product At', storeURL]);
  //   }

  // }
  if(prod.hasOwnProperty('sellerInfo')){

  
  if(prod.sellerInfo[0].hasOwnProperty('sellerUserName')){
      seller = prod.sellerInfo[0].sellerUserName[0];
      sell_array.push(['Seller Name', seller]);
    }
  }

  

  let wishlist : boolean = false;

  var eachproduct : Products = {
    itemidentifier: prodid,
    image : imageurl,
    title: title,
    cut_title:cut_title,
    price: price,
    shipping:shipping_stuff,
    zip:zip,
    seller:seller,
    wishlist:wishlist,
    shipping_details:ship_array,
    ebaylink: ebaylink
    





  }
  this.entire_products.push(eachproduct);
  
  }
  this.norecordstable = false;
  console.log("count ther");
  console.log(false);
}
else{
  this.norecordstable = true;
}
}
console.log(this.entire_products);
this.commoncontainer.alterTable(this.entire_products);

}

createJSONFile(data){
  this.myJSONFile = data;
}
  async onProductSearchSubmit(){
    this.show_progress = false;
    //this.activated_div = 'results';
    this.sliding_content("results");
   

    //this.hidewish = true;
    this.resultsDetails()
    // if(this.contentspage == 'wishlistcont'){
    //   this.flag = false;
    //   this.sliding_content('resultcontent');
    // }


    this.entire_products = [];
   

    if(this.miles.value=='currentloc'){
      this.current_location  = await this._searchingService.fetchCurrentLocation().toPromise();
      this.current_location = this.current_location.zip;
      console.log(this.current_location);
    }
   
console.log(this.productSearch.value);
    this.createURL();
    this.createSingleItemURL();
    await delay(300)
    this.show_progress = true;
console.log("pbar",this.show_progress)
this.showresult = true;
  }
}

type PaneType = 'resultslist' | Products;
