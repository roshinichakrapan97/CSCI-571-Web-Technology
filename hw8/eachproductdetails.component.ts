import { Component, OnInit ,Input, Output, EventEmitter, HostListener} from '@angular/core';
import { Products } from '../products';
import { SearchingService } from '../searching.service';
import { SingleProduct } from '../single-product';
import { Similarproducts } from '../similarproducts';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { FormControl, FormGroup } from '@angular/forms';
import { encode } from 'punycode';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommoncontainerService } from '../commoncontainer.service';
import { delay } from 'q';


@Component({
  selector: 'app-eachproductdetails',
  templateUrl: './eachproductdetails.component.html',
  styleUrls: ['./eachproductdetails.component.css']
})
export class EachproductdetailsComponent implements OnInit {
  justification = 'end';
  @Output() results_emitted = new EventEmitter<PaneType>();
  single_item_url : string;
  singleitemJSON : any;
  similaritemJSON: any;
  similar_item_url :string;
  product: Products;
  show_progress1 : boolean= true;
  
  
  similaritems : Similarproducts;
  similaritem_content = [];
  similar_item_duplicate = [];
  showcount: number = 5;
  showbutton:string = 'Show More';
  showmore: boolean = true;
  cat_val = "0";
  sort_key="1";
  seller_details = [];
  photos = [];
  photos_url : string;
  photosLink: any;
  images=[];
  show_progress :boolean = true;
  is_mobilescreen = false;
  
  sing_product : SingleProduct = {
    productimages : [],
    subtitle: '',
    price: '',
    location: '',
    returnpolicy: '',
    itemspecifics:'',
    shipping_details:'',
    sellerName: '',
    feedbackScore: '',
    popularity:'',
    ratingStar: '',
    topRated: '',
    storeName:'',
    storeURL: '',
    seller_details:''


  };
 tabtext = '';
  @Input() 
  set prod(prod: Products) {
    this.product = prod;
    if(this.product){
      console.log(this.product);
    this.getalldetails();
    this.getSimilarProducts();
    this.getPhotos();
    }
  }

  @HostListener('window: resize',['$event'])
  onResize(event){
    if(event.target.innerWidth <= '726'){
      this.tabtext = 'Related';
    }
    else{
      this.tabtext = 'Similar Products';
    }
  }


  fblink = location.href;
  constructor(private _searchingService: SearchingService, private modalService: NgbModal, private commoncontainer: CommoncontainerService) { 
    if(!window['fbAsyncInit']){
window['fbAsyncInit'] = function(){
  window['FB'].init({
    appId: '318646445511859',
    autoLogAppEvents: true,
    xfbml:true,
    version:'v3.2'
  });

};

    }
    const fblink = 'http://connect.facebook.net/en_US/sdk.js';
    if(!document.querySelector(`script[src='${fblink} ']`)){
      var script = document.createElement('script');
      script.src = fblink;
      document.body.appendChild(script);
    }
  }


    categorySorting = new FormGroup({
      category_val: new FormControl('0'),
      sorting_val: new FormControl({value:'1',disabled:true})
    });
    get category_val(){
      return this.categorySorting.get('category_val');

    }
    get sorting_val(){
      return this.categorySorting.get('sorting_val');
    }
  
    shareFbPage(){
      var text = 'Buy'+ this.product.title + ' at ' + this.product.price + ' from link below ';
      window['FB'].ui({
        method: 'share',
        display:'popup',
        quote: text,
        href: this.product.ebaylink
      });
    }
async list_sliding(){
  this.show_progress1 = false
  await delay(300)
    this.results_emitted.emit('resultslist');
    await delay(300)
    this.show_progress1 = true;
}


wish_click(prod){
  //insert/delete
  if(this.commoncontainer.contains_wish(prod))
  this.commoncontainer.delete_wish(prod);
  else this.commoncontainer.add_wish(prod);
  
}

wish_checker(prod){
  //console.log("product -- ");
  //console.log(prod);

  //Icon change
  return this.commoncontainer.contains_wish(prod)


  /**
   * 
   * 
   */
}
openVerticallyCenter(content){
  this.modalService.open(content,{centered:true});
}
async getPhotos() {
  this.photos = [];
  this.photos_url = "/Photos?";
  this.photos_url += "que="+ encodeURI(this.product.title);
  console.log("photo-link");
  console.log(this.photos_url)
  
  this.photosLink = await this._searchingService.displayPhotosCall(this.photos_url).toPromise();
  console.log("photos link");
  console.log(this.photosLink);
    for( var i = 0; i< this.photosLink.items.length;i++)
    
  this.photos.push(this.photosLink.items[i].link);
}

  async getalldetails() {

    this.single_item_url = "/singleItem?";
    this.single_item_url += "itemidentifier="+ this.product.itemidentifier;
    this.sing_product = null;
    console.log(this.single_item_url);
    this.commoncontainer.sendSingleProduct(this.product);
    this.singleitemJSON = await this._searchingService.ebaySingleProductCall(this.single_item_url).toPromise();
    this.displaySingleItemJSON();
   
  }
  async getSimilarProducts(){
    this.similar_item_url = "/similarItem?";
    this.similar_item_url += "itemidentifier="+ this.product.itemidentifier;
    console.log("similar url");
    console.log(this.similar_item_url);
    this.similaritemJSON = await this._searchingService.ebaySimilarProductsCall(this.similar_item_url).toPromise();
    console.log("in here");
    this.displaySimilarItemsJSON();

  }
  showContents(){
    if(this.showmore){
      this.showmore = false;
    }
    else if(!this.showmore){  
      this.showmore = true;
    }
  }

  


 
displaySimilarItemsJSON(){
  console.log("similar");
  console.log(this.similaritemJSON);
 
  this.similaritem_content = [];
  if(this.similaritemJSON.getSimilarItemsResponse.ack =="Success"){
    var similar_item = this.similaritemJSON.getSimilarItemsResponse.itemRecommendations.item;
   
    for (var i =0;i<similar_item.length;i++)
    {
      console.log("for - in");
      var productname = "N/A";
      var viewURL = "N/A";
      var price="N/A";
      var curid = "";
      var shippingcost = "N/A";
      var shipcurid = "";
      var daysleft="N/A";
      var imageURL = "";
      

      var current_item = similar_item[i]
      if(current_item.hasOwnProperty('title')){
        productname = current_item.title;
      }
      if(current_item.hasOwnProperty('viewItemURL')){
        viewURL = current_item.viewItemURL;
      }
      
      if(current_item.hasOwnProperty('buyItNowPrice')){
        if(current_item.buyItNowPrice.hasOwnProperty('__value__')){
          price = current_item.buyItNowPrice["__value__"]
          if(current_item.buyItNowPrice.hasOwnProperty('@currencyId')){
            if(current_item.buyItNowPrice["@currencyId"]=="USD"){
              curid = "$";
            }
            else{
              curid = current_item.buyItNowPrice["@currencyId"];
            }

          }
            price= curid + price;
        
        }
      }

      if(current_item.hasOwnProperty('shippingCost')){
        if(current_item.shippingCost.hasOwnProperty('__value__')){
          shippingcost = current_item.shippingCost["__value__"]
          if(current_item.shippingCost.hasOwnProperty('@currencyId')){
            if(current_item.shippingCost["@currencyId"]=="USD"){
              shipcurid = "$";
            }
            else{
              shipcurid = current_item.shippingCost["@currencyId"];
            }

          }

          if(shippingcost =="0.0"){
            shippingcost="Free Shipping";
          }
          else{
            shippingcost= shipcurid + shippingcost;
          }
        }
      }
      
      if(current_item.hasOwnProperty('timeLeft')){
        daysleft = current_item.timeLeft;
        daysleft = daysleft.substring(daysleft.lastIndexOf('P') + 1, daysleft.lastIndexOf('D'));

      }

      if(current_item.hasOwnProperty('imageURL')){
        imageURL = current_item.imageURL;
      }

      this.similaritems = {
        productname : productname,
        viewURL: viewURL,
        price: price,
        shippingcost: shippingcost,
        daysleft: daysleft,
        imageURL: imageURL

    // viewURL: string;
    // price: string;
    // shippingcost: string;
    // daysleft:string;
    // imageURL:string;


      }
      this.similaritem_content.push(this.similaritems);

      // this.similar_item_duplicate.push(this.similaritems);
      // console.log("similar-item-assignment");
      // console.log(this.similar_item_duplicate);

    }
    this.similar_item_duplicate = this.similaritem_content.slice(0);
  
  }

}



onSorting(){
   console.log("Sorting- going in");
  var category = parseInt(this.category_val.value);
  var sorting_order = parseInt(this.sorting_val.value);
  this.sorting_val.enable();
  switch(category){
    case 1:
    this.similaritem_content = this.similaritem_content.slice(0).sort((a,b)=>{
      var sa = a.productname.toLowerCase();
      var sb = b.productname.toLowerCase();
      if(sa<sb)
        return -1* sorting_order;
      else if(sa>sb)
        return sorting_order;
      else
        return 0;

    });
    break;
   
    case 2:
    this.similaritem_content = this.similaritem_content.slice(0).sort((a,b)=>{
    
      var ind_a = a.price.search(/\d/);
      var ind_b = b.price.search(/\d/);

      return (a.price.slice(ind_a,) - b.price.slice(ind_b,))*sorting_order;

    });
    break;
    case 3:
    this.similaritem_content = this.similaritem_content.slice(0).sort((a,b)=>{
      var ind_a = a.shippingcost.search(/\d/);
      var ind_b = b.shippingcost.search(/\d/);
      return (a.shippingcost.slice(ind_a,) - b.shippingcost.slice(ind_b,))*sorting_order;
      

    });
    break;
    case 4:
   
    this.similaritem_content = this.similaritem_content.slice(0).sort((a,b)=>{
      
      return(a.daysleft - b.daysleft)*sorting_order;
    });

    break;
    default:
    this.sorting_val.setValue('1');
    this.sorting_val.disable();
    console.log("similar-item-default-assignment");
  
    console.log(this.similar_item_duplicate)
    this.similaritem_content = this.similar_item_duplicate;
    break;  
  }
}
  displaySingleItemJSON(){
    console.log(this.singleitemJSON);
    console.log("hiiiii");
    console.log(this.product.shipping_details);
    console.log("seller-info");
    

    
    if(this.singleitemJSON.Ack == 'Success'){

      var cur_item = this.singleitemJSON.Item
      
      var subtitle="N/A";
      var price="N/A";
      var location = "N/A";
      let feedbackScore = "N/A";
      let popularity="N/A";
      let ratingStar = "N/A";
      let topRated = "N/A";
      let storeName="N/A";
      let storeURL = "N/A";
      let seller="N/A";
      //let ship_array :[string, string][]= [];
      // let zip ="N/A";
      // let shipping_stuff = "N/A"; //shippingcost
      // let shippingLocation="N/A";
      // let handlingTime  = "N/A";
      // let expeditedShipping = "N/A";
      // let oneDayShipping = "N/A";
      // let returnAccepted = "N/A";

      if(cur_item.hasOwnProperty('PictureURL')){
        this.images = cur_item.PictureURL;
      }
        console.log("images-url")
        console.log(this.images);


      var len_images = this.images.length;
      if(len_images > 0){
        if(len_images>=3)
        this.snakeChange(1,3);
        if(len_images>=6)
        this.snakeChange(2,6);
        if(len_images>=7)
        this.snakeChange(5,7)
        while(this.images.length<8)
        this.images.push('')


      }



      
      if(cur_item.hasOwnProperty('Subtitle')){
        subtitle = cur_item.Subtitle;
      }
      if(cur_item.hasOwnProperty('Subtitle')){
      price = cur_item.CurrentPrice.Value;
      var currencyid = cur_item.CurrentPrice.CurrencyID;
      if (currencyid == "USD"){
        price = "$" + price;
      }
      else{
        price = currencyid + price;
      }
      }
      if(cur_item.hasOwnProperty('Location'))
      {
        location = cur_item.Location;
      }
      var return_policy = "N/A";
      if(cur_item.hasOwnProperty('ReturnPolicy')){
        if(cur_item.ReturnPolicy.ReturnsAccepted=="Returns Accepted"){
        return_policy = cur_item.ReturnPolicy.ReturnsAccepted + " "+ cur_item.ReturnPolicy.ReturnsWithin;
        }
        else{

return_policy = cur_item.ReturnPolicy.ReturnsAccepted
        }

      }
      if(cur_item.hasOwnProperty('ItemSpecifics')){
        var tmp = cur_item.ItemSpecifics.NameValueList;
        var item_specifics_content : [string, string][] = [];
        for (var k=0; k<tmp.length;k++){
          var key = tmp[k].Name;
          var value = tmp[k].Value;
          item_specifics_content.push([key,value]);
        }
      }

    if(cur_item.hasOwnProperty('Seller')){
    var seller_prod = cur_item.Seller;
    console.log("seller");
    console.log(seller_prod);
    if(seller_prod.hasOwnProperty('FeedbackScore'))
    {
      feedbackScore = seller_prod.FeedbackScore;
      console.log(feedbackScore);
      this.seller_details.push(feedbackScore);
      

    }
    if(seller_prod.hasOwnProperty('PositiveFeedbackPercent')){
      popularity = seller_prod.PositiveFeedbackPercent;
      this.seller_details.push(popularity);

  
    }

    if(seller_prod.hasOwnProperty('FeedbackRatingStar')){
      ratingStar = seller_prod.FeedbackRatingStar;
      this.seller_details.push(ratingStar);
     
    }
    if(seller_prod.hasOwnProperty('TopRatedSeller')){
      topRated = seller_prod.TopRatedSeller;
      this.seller_details.push(topRated);

    }
    if(seller_prod.hasOwnProperty('UserID')){
    seller = seller_prod.UserID;
    this.seller_details.push(seller);
   
    }
    }
    if(cur_item.hasOwnProperty('Storefront')){
    var store_prod = cur_item.Storefront;
    if(store_prod.hasOwnProperty('StoreName')){
      storeName = store_prod.StoreName;
      this.seller_details.push(storeName);
  
    }
    if(store_prod.hasOwnProperty('StoreURL'))
    {
      storeURL = store_prod.StoreURL;
      this.seller_details.push(storeURL);

    }


  }
 
      this.sing_product = {
        productimages : this.images,
        subtitle : subtitle,
        price: price,
        location: location,
        returnpolicy: return_policy,
        itemspecifics: item_specifics_content,
        shipping_details : this.product.shipping_details,
        seller_details: this.seller_details,
        sellerName: seller,
    feedbackScore: feedbackScore,
    popularity: popularity,
    ratingStar: ratingStar,
    topRated: topRated,
    storeName:storeName,
    storeURL: storeURL

      }
      


    }
    console.log("Single prod");
    console.log(this.sing_product);


  }
  snakeChange(a,b){
    var temp = this.images[a];
    this.images[a] = this.images[b];
    this.images[b] = temp;


  }

  async ngOnInit() {
    this.show_progress1 = true;

    if(window.screen.width === 500){
      this.is_mobilescreen = true;
    }
    if(this.is_mobilescreen){
      this.tabtext = "Related";
    }
    else{
      this.tabtext = "Similar Products"
    }
    

    
  }

}

type PaneType = 'resultslist' | Products;