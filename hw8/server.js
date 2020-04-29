const express = require('express');
const request = require('request');



const PORT = 8080;
const app = express();

var path=require('path');
app.use(express.static(path.join(__dirname+'dist')));
const allowedExt = [
 '.js',
 '.ico',
 '.css',
 '.png',
 '.jpg',
 '.woff2',
 '.woff',
 '.ttf',
 '.svg',
];



app.get('/singleItem',function(req,res){
    var single_ebay_call = 'http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=RoshiniC-csci571r-PRD-816e2f5cf-84457621&siteid=0&version=967&ItemID=';
    single_ebay_call += encodeURI(req.query.itemidentifier);
    single_ebay_call += '&IncludeSelector=Description,Details,ItemSpecifics';
    console.log(single_ebay_call);
    request(single_ebay_call, function(err,response,body){
        if(!err && response.statusCode == 200)
    {
        res.status(200).send(JSON.parse(body));
    }

    });
})

app.get('/Photos',function(req,res){
    var photo = 'https://www.googleapis.com/customsearch/v1?q=';
    photo += encodeURI(req.query.que);
    photo +=  '&cx=010200887884968649373:aqfo38dfmqo&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyCysjRCqq35K1vyOMmjpFqkKvUCow4nomE ';
   
    console.log("photo");
    console.log(photo);
    request(photo, function(err,response,body){
        if(!err && response.statusCode == 200)
    {
        res.status(200).send(JSON.parse(body));
    }

    });
})

app.get('/similarItem',function(req,res){
    var similar_ebay_call = 'http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=RoshiniC-csci571r-PRD-816e2f5cf-84457621&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId=';
    similar_ebay_call += encodeURI(req.query.itemidentifier);
    similar_ebay_call += '&maxResults=20';
    console.log(similar_ebay_call);
    request(similar_ebay_call, function(err,response,body){
        if(!err && response.statusCode == 200)
    {
        res.status(200).send(JSON.parse(body));
    }

    });
})


app.get('/enroll', function(req,res){
    console.log("query:" + req.query);
    console.log("body" + req.body);
    
    var ebay_api_call="http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=RoshiniC-csci571r-PRD-816e2f5cf-84457621&RESPONSE-DATA-FORMAT=JSON&RESTPAYLOAD&paginationInput.entriesPerPage=50";
    ebay_api_call += "&keywords=" + encodeURI(req.query.keyw);
    if (req.query.catg != "0"){
        ebay_api_call += "&categoryId="+encodeURI(req.query.catg);

    }
    
    ebay_api_call += "&buyerPostalCode=" + encodeURI(req.query.zipcode);
    ebay_api_call += "&itemFilter(0).name=MaxDistance" ;

    ebay_api_call += "&itemFilter(0).value=" + encodeURI(req.query.miles);
    
    ebay_api_call += "&itemFilter(1).name=HideDuplicateItems" ;
    ebay_api_call += "&itemFilter(1).value=true";
   
    var iter = 2;
    var conds = [];
    if(req.query.new1== 'true'){
        conds.push('New');
    }
    if(req.query.used== 'true'){
        conds.push('Used');
    }
    if(req.query.unspecified== 'true'){
        conds.push('Unspecified');
    }
    if(conds.length>=1){
    ebay_api_call += "&itemFilter("+ iter+ ").name=Condition" ;
    for(var k =0; k< conds.length; k++){
        ebay_api_call += "&itemFilter("+iter+").value("+k+")=" + conds[k];

    }
    iter+=1
}

if(req.query.freeship == 'true'){
    ebay_api_call += "&itemFilter("+iter+").name=FreeShippingOnly" ;
    ebay_api_call += "&itemFilter("+iter+").value=" + encodeURI(req.query.freeship);
    iter += 1;


}
if(req.query.localpp == 'true'){
    ebay_api_call += "&itemFilter(iter).name=LocalPickupOnly" ;
    ebay_api_call += "&itemFilter(iter).value=" + encodeURI(req.query.localpp);
}

    ebay_api_call += "&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo";
    console.log(ebay_api_call);
    request(ebay_api_call, function(err,response,body){
        if(!err && response.statusCode == 200)
    {
        res.status(200).send(JSON.parse(body));
    }


    });

})
app.get('/autocomplete',async function(req,res){
    let zipcodes = req.query.zipcodes;

    populated_zipcodes = [];
    console.log(zipcodes);
    request('http://api.geonames.org/postalCodeSearchJSON?username=chakrapa&country=US&maxRows=5&postalcode_startsWith=' + zipcodes , function(error,response,body){
    if(!error && response.statusCode == 200)
    {
        
        resbody = JSON.parse(body).postalCodes;
        
        for(var item in resbody){
            if(resbody.hasOwnProperty(item)){
                
                populated_zipcodes.push(resbody[item].postalCode);
            }
        }

        res.status(200).send(populated_zipcodes);
        
    }
    
});
});

app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
      res.sendFile(path.resolve(`dist/${req.url}`));
    } else {
      res.sendFile(path.resolve('dist/index.html'));
    }
   });

app.listen(PORT, function(){
    console.log("Server running on localhost:"+ PORT);
});



