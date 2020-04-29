<?php
    $full_url_page = "";
    $one_url_page = "";
    $same_url_page ="";
    if(isset($_POST["full_page"]))
    {
       
        function generate_full_url_page(){
            $API_Url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=RoshiniC-csci571r-PRD-816e2f5cf-84457621&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=20";
            $API_Url .= "&keywords=". urlencode($_POST["keyw"]);

            if($_POST["catg"]>0)
                $API_Url .= "&categoryId=" .$_POST["catg"];

            $cntr = 0;

            if(isset($_POST["area"]))
            {
                if($_POST["area"] != "")
                {

                $API_Url .= "&buyerPostalCode=".$_POST["area"];
                $API_Url .= "&itemFilter($cntr).name=MaxDistance&itemFilter($cntr).value=".$_POST["distancemiles"];
                $cntr+=1;
                }
        }


            $API_Url .= "&itemFilter($cntr).name=HideDuplicateItems&itemFilter($cntr).value=true";
            $cntr+=1;

            if($_POST["condition"]!="")
            {
                $API_Url.="&itemFilter($cntr).name=Condition";
                $children = explode(",",$_POST["condition"]);
                for($i=0; $i<count($children); $i++){
                    $API_Url .= "&itemFilter($cntr).value($i)=". $children[$i];
                }
                $cntr+=1;
            }
            if($_POST["shipping"] != "")
            {
                $children = explode(",",$_POST["shipping"]);
                for($i=0; $i<count($children); $i++){
                    $API_Url .= "&itemFilter($cntr).name=" .$children[$i];
                    $API_Url .= "&itemFilter($cntr).value=true";
                    $cntr+=1;

                }
            }
            return $API_Url;

        }
        $full_url_page = file_get_contents(generate_full_url_page());
        echo $full_url_page;
    }

    else if(isset($_POST["single_page_item"]))
    {
        function generate_single_page_item_url(){
            $single_page_item_url = "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=RoshiniC-csci571r-PRD-816e2f5cf-84457621&siteid=0&version=967&ItemID=";
            $single_page_item_url .= $_POST["item"]."&IncludeSelector=Description,Details,ItemSpecifics";
            return $single_page_item_url;
            
        }
        $one_url_page = file_get_contents(generate_single_page_item_url());
        echo $one_url_page;
    }
    else if(isset($_POST["same_page_item"]))
    {
        function generate_same_page_item_url(){
            $same_page_item_url = "http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=RoshiniC-csci571r-PRD-816e2f5cf-84457621&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId=";
            $same_page_item_url .= $_POST["iditem"]."&maxResults=8";
            return $same_page_item_url;

        }
        $same_url_page = file_get_contents(generate_same_page_item_url());
        echo $same_url_page;
    }
    else{
?>
<html>
<head >

    <style>
    .fullproductsearch{
        margin : 0 auto;
        align-self: center;
        height : 320px;
        width: 600px;
        border: 4px solid #C0C0C0;
        background-color: #F8F8F8;


    }
    .productsearch{
        padding-top: 2px;
        line-height: 45px;
        font-size: 34px;
        text-align: center;
    }
    hr.vertical {
        margin-top: 0;
        margin-bottom: 0;
        height:0; 
        width:96%;
        border:1px solid #C0C0C0;
    }
    
    .all-contents{
        margin-left: 20px;


    }
    .buttons{
        text-align: center;
        margin-bottom: 5px;
    }
    .enablesearchtable td{
        padding-right: 9px;
        padding-left: 0px;
        text-align: left;
    }
    #errorcode{
        padding-bottom: 5px;
        padding-top: 10px;
    }
    .innertable a:hover{
        opacity:0.5;

    }
    
    .innertable{
        margin: 0 auto;
        
        text-align:center;
    }
    .single-table{
        margin: 0 auto;
        text-align:left;


    }
    .itemdet{
        line-height:40px;
        font-size:39px;
        text-align:center;


    }
    .seller-message{
        text-align:center;
        padding-top:10px;
    }
    #same-items{
        margin:0 auto;
        width:75% ;
        border: 2px solid #D3D3D3;
            }
    
    #hitable{
        overflow-x: auto;
        text-align: center;
        table-layout: fixed;
        display: block;
    }

    #hitable td{
        padding-top: 10px;
        padding-bottom:10px;
        padding-left: 40px;
        padding-right: 40px;

    }
    #hitable a:hover{
        opacity:0.5;

    }
    #ifr{
        

        
       width:100%;
        margin:0 auto;
        

    }
    #iframe-items{


        
        margin:0 auto;
    }

</style>
</head>
<body>
<script type="text/javascript">
    function disabledistance(){
        var mil = document.getElementById("distancemiles");
        mil.style.opacity=0.5;
        distancemiles.value='';
        distancemiles.disabled = true;


    }
    function disablemilesfrom(){
        var milfrom = document.getElementById("milesfrom");
        milfrom.style.opacity=0.5;
    }
    function disablehere(){
        var her = document.getElementById("here");
        her.style.opacity=0.5;
        her.checked = true;
        her.disabled = true;

    }
    function disableheretag(){
        var hertag = document.getElementById("heretag");
        hertag.style.opacity=0.5;

    }
    function disablezip(){
        var zipradio = document.getElementById("zip");
        zipradio.style.opacity=0.5;
        zip.disabled = true;

    }
    function disablezipcode(){
        var zipcode_area = document.getElementById("zipcode");
        zipcode_area.value='';

        zipcode_area.disabled = true;
        zipcode_area.required = false;
    }
    function setOriginalData(){
        disabledistance();
        disablemilesfrom();
        disablehere();
        disableheretag();
        disablezip();
        disablezipcode();

        document.getElementById("errorcode").innerHTML ="";
        document.getElementById("full-content-page").innerHTML = "";
    

    }
    function enabledistance(){
        var mil = document.getElementById("distancemiles");
        mil.style.opacity=1;;
        distancemiles.disabled = false;

    }
    function enablemilesfrom(){
        var milfrom = document.getElementById("milesfrom");
        milfrom.style.opacity=1;

    }
    function enablehere(){
        var her = document.getElementById("here");
        her.style.opacity=1;
        her.checked = true;
        her.disabled = false;

    }
    function enableheretag(){
        var hertag = document.getElementById("heretag");
        hertag.style.opacity=1;

    }
    function enablezip(){
        var zipradio = document.getElementById("zip");
        zipradio.style.opacity=1;
        zip.disabled = false;
    }
    function enablezipcode(){
        var zipcode_area = document.getElementById("zipcode");
            zipcode_area.disabled = false;
            zipcode_area.required = true;
    }
    function enablesearchDisable(){
        var enablesearchid = document.getElementById("enablesearch")

        if (enablesearchid.checked)
        {

            enabledistance();
            enablemilesfrom();
            enablehere();
            enableheretag();
            enablezip();
            disablezipcode();
        
    }
    else{

        setOriginalData();
    }}

    function zipcodeDisable(){
        var her = document.getElementById("here");
        if (her.checked == true)
        {
        disablezipcode();   
        }
        var ziptag = document.getElementById("zip");
        if (ziptag.checked == true)
        {
        enablezipcode();
            }       
    }
    function getGeoLocationJSON(URL) {
            xmlreq = new XMLHttpRequest();  
            xmlreq.open("GET", URL, false);
            xmlreq.send();
            retjson = JSON.parse(xmlreq.responseText);
            return retjson;
        }

    function readData(data){
        //console.log(data);
        var xmlhttp = new XMLHttpRequest();
        var current_url = window.location.href;
        xmlhttp.open("POST", current_url, false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //xmlhttp.setRequestHeader("Content-length",data.length);
        xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){ 
            console.log(xmlhttp.responseText); 
    }

};
    xmlhttp.send(data);
    jsonObject = JSON.parse(xmlhttp.responseText);
    return jsonObject;
    
}

function displaySimilarItems()
{

var checker = document.getElementById('same-items');
var iframcheck = document.getElementById('iframe-items');
if(checker.style.display == "none")
{
checker.style.display = "block";
iframcheck.style.display = "none";
//checker.style.width = "75%";
document.getElementById('arrow-1').src= "http://csci571.com/hw/hw6/images/arrow_down.png";

document.getElementById('arrow-2').src= "http://csci571.com/hw/hw6/images/arrow_up.png";
document.getElementById('seller-hide-text').innerHTML = "click to show seller message";
document.getElementById('similar-text').innerHTML = "click to hide similar items";

}

else{
    document.getElementById('similar-text').innerHTML = "click to show similar items";

    checker.style.display = "none";
    document.getElementById('arrow-2').src= "http://csci571.com/hw/hw6/images/arrow_down.png";

}




}


function printcontent(framei){
    //var framei = document.getElementById("ifr");
    //console.log(framei.clientHeight);
    //console.log(framei.clientWidth);
    //console.log(framei.offsetHeight);
    //console.log(framei.offsetWidth)
    //console.log(framei.contentWindow.document.body.offsetHeight);
    //console.log(framei.contentWindow.document.body.offsetWidth);
    framei.style.height = framei.contentWindow.document.body.offsetHeight + 50 + "px";
    //console.log(framei.contentWindow.document.body.offsetHeight);
    //console.log(framei.contentWindow.document.body.offsetWidth);
    //framei.style.width = framei.contentWindow.document.body.offsetWidth + 10 + "px";




}
function showIframe(){
var iframe_checker = document.getElementById('iframe-items');
var similar_checker = document.getElementById('same-items');


if(iframe_checker.style.display == "none")
{
iframe_checker.style.display = "block";
similar_checker.style.display = "none";
document.getElementById('seller-hide-text').innerHTML = "click to hide seller message";
document.getElementById('similar-text').innerHTML = "click to show similar items";

document.getElementById('arrow-2').src= "http://csci571.com/hw/hw6/images/arrow_down.png";



//iframe_checker.style.width = "75%";
document.getElementById('arrow-1').src= "http://csci571.com/hw/hw6/images/arrow_up.png";

var framei = document.getElementById("ifr");

printcontent(framei);




    


}

else{
    document.getElementById('seller-hide-text').innerHTML = "click to show seller message";

    iframe_checker.style.display = "none";
    document.getElementById('arrow-1').src= "http://csci571.com/hw/hw6/images/arrow_down.png";

}
//loadiframe();

}


    function singleItemTable(itemid) {
        
        var display_text = "";
    var jsonObject_single_item = readData("single_page_item=yes&item="+itemid);
    var json_similar = readData("same_page_item=yes&iditem="+itemid);

    

    



    ack = jsonObject_single_item.Ack;


    
    jsonitem = jsonObject_single_item.Item;

    
    if (ack == "Success")
    {          
        display_text = "<p class='itemdet'> <b>Item Details </b></p>";
      display_text += "<table class = 'single-table' border = '1'>";

        if(jsonitem.hasOwnProperty("PictureURL")){
            var picurl = Object(jsonitem.PictureURL);
            display_text += "<tr><td> <b>Photo</b> </td>\<td>"; 
            display_text +=  "<img src = \"" + picurl[0] +"\" height=\"160\"width=\"125\">";

            // for(i=0;i<picurl.length;i++)
            // {
            //     display_text +=  "<img src = \"" + picurl[i] +"\" height=\"154\"width=\"100\">";

            // }
            display_text += "</td></tr>";


}
    if(jsonitem.hasOwnProperty("Title")){
      display_text += "<tr><td><b> Title </b></td>" + "<td>" + jsonitem.Title + "</td></tr>";

    }
    if(jsonitem.hasOwnProperty("Subtitle")){
       display_text += "<tr><td><b> Subtitle </b></td>" + "<td>" + jsonitem.Subtitle+ "</td></tr>";
    }
    if(jsonitem.hasOwnProperty("CurrentPrice"))
    {
        display_text += "<tr><td><b> Current Price </b></td>" + "<td>" + jsonitem.CurrentPrice.Value + " " + jsonitem.CurrentPrice.CurrencyID  + "</td></tr>";
    }
    var loca = "";
    if(jsonitem.hasOwnProperty("Location")){
        loca = jsonitem.Location + ",";

    }
    var postal = "";
    if(jsonitem.hasOwnProperty("PostalCode"))
    {
        postal = jsonitem.PostalCode;
    }

    var address = loca + postal;

       display_text += "<tr><td><b> Location </b></td>" + "<td>" + address + "</td></tr>";

    if(jsonitem.hasOwnProperty("Seller")){
        if(jsonitem.Seller.hasOwnProperty("UserID"))
        {
            display_text += "<tr><td><b> Seller </b></td>" + "<td>" + jsonitem.Seller.UserID + "</td></tr>";

        }
    }
//}
    var retaccept = "";
    var retwithin = "";

    if(jsonitem.hasOwnProperty("ReturnPolicy")){
        if(jsonitem.ReturnPolicy.hasOwnProperty("ReturnsAccepted"))
        {
            retaccept = jsonitem.ReturnPolicy.ReturnsAccepted;

            if(jsonitem.ReturnPolicy.hasOwnProperty("ReturnsWithin"))
            {
                retwithin = " within " + jsonitem.ReturnPolicy.ReturnsWithin;
            }


            display_text += "<tr><td><b> Return Policy(US) </b></td>" + "<td>" + retaccept + " "+ retwithin +  "</td></tr>";

        }
    }


    if(jsonitem.hasOwnProperty("ItemSpecifics"))
    {
    var all_item_specifics = jsonitem.ItemSpecifics.NameValueList;
    var each_specific = Object(all_item_specifics);

    for (i=0;i<each_specific.length;i++){
        var somename = each_specific[i].Name;
        var somevalue = each_specific[i].Value[0];
        display_text +="<tr><td><b>" + somename + "</b></td>" + "<td>" + somevalue + "</td></tr>";


    }
}
display_text += "</table>";

    display_text += "<a href= 'javascript:showIframe()' style= 'text-decoration:None'>";
    display_text += "<div  class='seller-message'><p id='seller-hide-text' style = 'font-size:16px; color:grey'> click to show seller message </p>";
    display_text += "<img id='arrow-1' src = 'http://csci571.com/hw/hw6/images/arrow_down.png' width='20px' height='12px'></a></div><br>";
    display_text += "<center><div id = 'iframe-items' style='display:none'>";

    display_text += "<iframe   frameBorder = '0' id ='ifr' srcdoc=\'";
    if(jsonitem.hasOwnProperty("Description"))
    {
        var descrip = jsonitem.Description;
         descrip = descrip.replace(/'/g,"\"");
        display_text+=descrip;
    }
    else{

        display_text += "<div style=\"border:2px solid #C0C0C0;  width:70%; background-color:#D0D0D0; text-align:center; margin:0 auto; padding-top:5px;padding-bottom:5px;\">"
        display_text += "<p style=\"font-size:15px; font-weight:bold; margin:0 auto;color:black; text-align:center;vertical-align:middle;\">No Seller Message found.</p>";
        display_text += "</div>"; 


        //var descrip = "<html><body><p> No Message from Seller</p></body></html>";
        //display_text += descrip;
    }

     display_text += "\'> </iframe>";
     //loadiframe();
    display_text += "</div></center>";



    //display_text += "<div id = 'seller-msg'></div>"
    display_text += "<a href= 'javascript:displaySimilarItems()' style= 'text-decoration:None' >";

    display_text += "<div id = 'similar-item' class='seller-message'><p id = 'similar-text' style = 'font-size:16px; color:grey'> click to show similar items</p>";
    display_text += "<img id='arrow-2' src = 'http://csci571.com/hw/hw6/images/arrow_down.png'width='20px' height='12px'></div><br>";
    display_text += "<center><div id = 'same-items' style='display:none'>";
   
   
    json_similar = json_similar.getSimilarItemsResponse.itemRecommendations.item;
    if (json_similar.length > 0){
     display_text += "<table id = 'hitable'>";
    

    var jssim = json_similar;
    //console.log(jssim);
    
    //jssim = jssim.getSimilarItemsResponse[0]itemRecommendations.item;



    display_text += "<tr>";
    for (i=0; i < jssim.length;i++)
    {
        display_text += "<td><img src = \"" + jssim[i].imageURL +"\" height='180'width='150'></td>";


    }
display_text += "</tr><tr>";

    for (i=0; i < jssim.length;i++)
    {
        display_text += "<td><a href=\"javascript:singleItemTable("+ jssim[i].itemId +  ") \" style='text-decoration:none; color:black'> "+ jssim[i].title + "</a></td> ";


    }
    display_text += "</tr><tr>";
     for (i=0; i < jssim.length;i++)
    {
        display_text += "<td><b>"+ " $ " + jssim[i].buyItNowPrice["__value__"] + "</b></td> ";


    }
    display_text += "</tr>";
    display_text +="</table>"
}
else{

    display_text += "<div style=\"border:2px solid #C0C0C0;  width:70%; background-color:#D0D0D0; text-align:center; margin:0 auto; padding-top:5px;padding-bottom:5px;\">"
    display_text += "<p style=\"font-size:15px; font-weight:bold; color:black; margin:0 auto; text-align:center;vertical-align:middle;\">No Similar Item found</p>";
    display_text += "</div>";

}

   

    display_text += "</div></center>";

    //document.getElementById("same-items").innerHTML = display_text;
    




    document.getElementById("full-content-page").innerHTML = display_text;
    

    
    }
    else{
    display_text += "<div style=\"border:2px solid #C0C0C0;  width:70%; background-color:#D0D0D0; text-align:center; margin:0 auto; padding-top:5px;padding-bottom:5px;\">"
    display_text += "<p style=\"font-size:15px; font-weight:bold; color:black; margin:0 auto; text-align:center;vertical-align:middle;\">No Detailed Information for the Item on the Server</p>";
    display_text += "</div>";
    display_text += "</table>";

    display_text += "<a href= 'javascript:showIframe()' style= 'text-decoration:None'>";
    display_text += "<div  class='seller-message'><p id='seller-hide-text' style = 'font-size:16px; color:grey'> click to show seller message </p>";
    display_text += "<img id='arrow-1' src = 'http://csci571.com/hw/hw6/images/arrow_down.png' width='20px' height='12px'></a></div><br>";
    display_text += "<center><div id = 'iframe-items' style='display:none'>";

    display_text += "<iframe onload='printcontent(this)'  frameBorder = '0' id ='ifr' srcdoc=\'";
    if(jsonObject_single_item.hasOwnProperty("Item") && jsonObject_single_item.Item.hasOwnProperty("Description"))
    {
        var descrip = jsonObject_single_item.Item.Description;
         descrip = descrip.replace(/'/g,"\"");
        display_text+=descrip;
    }
    else{

        display_text += "<div style=\"border:2px solid #C0C0C0;  width:70%; background-color:#D0D0D0; text-align:center; margin:0 auto; padding-top:5px;padding-bottom:5px;\">"
        display_text += "<p style=\"font-size:15px; font-weight:bold; margin:0 auto;color:black; text-align:center;vertical-align:middle;\">No Seller Message found.</p>";
        display_text += "</div>"; 

        //var descrip = "<html><body><p> No Message from Seller</p></body></html>";
        //display_text += descrip;
    }

     display_text += "\'> </iframe>";
     //loadiframe();
    display_text += "</div></center>";



    //display_text += "<div id = 'seller-msg'></div>"
    display_text += "<a href= 'javascript:displaySimilarItems()' style= 'text-decoration:None' >";

    display_text += "<div id = 'similar-item' class='seller-message'><p id = 'similar-text' style = 'font-size:16px; color:grey'> click to show similar items</p>";
    display_text += "<img id='arrow-2' src = 'http://csci571.com/hw/hw6/images/arrow_down.png'width='20px' height='12px'></div><br>";
    display_text += "<center><div id = 'same-items' style='display:none'>";
   
   
    json_similar = json_similar.getSimilarItemsResponse.itemRecommendations.item;
    if (json_similar.length > 0){
     display_text += "<table id = 'hitable'>";
    

    var jssim = json_similar;
    //console.log(jssim);
    
    //jssim = jssim.getSimilarItemsResponse[0]itemRecommendations.item;



    display_text += "<tr>";
    for (i=0; i < jssim.length;i++)
    {
        display_text += "<td><a href=\"javascript:singleItemTable("+ jssim[i].itemId +  ") \"><img src = \"" + jssim[i].imageURL +"\" height='180'width='150'></td>";


    }
display_text += "</tr><tr>";

    for (i=0; i < jssim.length;i++)
    {
        display_text += "<td><a href=\"javascript:singleItemTable("+ jssim[i].itemId +  ") \" style='text-decoration:none; color:black'> "+ jssim[i].title + "</td> ";


    }
    display_text += "</tr><tr>";
     for (i=0; i < jssim.length;i++)
    {
        display_text += "<td><b>"+ " $ " + jssim[i].buyItNowPrice["__value__"] + "</b></td> ";


    }
    display_text += "</tr>";
    display_text +="</table>"
}
else{

    display_text += "<div style=\"border:2px solid #C0C0C0;  width:70%; background-color:#D0D0D0; text-align:center; margin:0 auto; padding-top:5px;padding-bottom:5px;\">"
    display_text += "<p style=\"font-size:15px; font-weight:bold; color:black; margin:0 auto; text-align:center;vertical-align:middle;\">No Similar Item found</p>";
    display_text += "</div>";

}

   

    display_text += "</div></center>";

    //document.getElementById("same-items").innerHTML = display_text;
    




    //document.getElementById("full-content-page").innerHTML = display_text;
    

    
     document.getElementById("full-content-page").innerHTML = display_text;

    }
}

    function setFullPage(jsonObject){

        var acknowledge = jsonObject.findItemsAdvancedResponse[0].ack;
        //console.log(acknowledge);
        var display_text = "";
        if (acknowledge == "Success")

        {
            

            var item_count = jsonObject.findItemsAdvancedResponse[0].searchResult[0];
            item_count = item_count["@count"];
            //console.log(item_count);
            var complete_items = jsonObject.findItemsAdvancedResponse[0].searchResult[0].item;
            if (item_count>0){
                
            display_text += "<table class='innertable' border='1'  ><tr><th>Index</th><th>Photo</th><th>Name</th><th> Price</th><th>Zip Code</th><th>Condition</th><th>Shipping Option</th></tr>";
        
            var allitems = Object(complete_items);
            for(i=0;i<allitems.length;i++)
            {
                display_text +="<tr><td>" + (i+1) + "</td>"
                display_text += "<td><img src =\"" + allitems[i].galleryURL +"\" height=\"160\"width=\"120\"></td>";
                display_text +="<td> <a href = \" javascript:singleItemTable(" + allitems[i].itemId + ")" +  "\" style= \"text-decoration:None;color:black\" >" + allitems[i].title + "</a></td>";
                var price_ = allitems[i].sellingStatus[0].currentPrice[0];
                var currency_id = price_["@currencyId"];
                price_ = price_["__value__"];
                //console.log("PRICE" + price_);
                
                if (currency_id == "USD")
                {
                    currency_id = "$";
                }
                display_text += "<td>" + currency_id + " " + price_  + "</td>";


                if(allitems[i].hasOwnProperty("postalCode")){
                    display_text += "<td>" + allitems[i].postalCode + "</td>";

                }
                else{
                    display_text += "<td>N/A</td>";

                }

                
                if (allitems[i].hasOwnProperty("condition")){
                    display_text += "<td>" + allitems[i].condition[0].conditionDisplayName + "</td>";

                }
                else{
                    display_text += "<td>N/A</td>";
                }
                
                if(allitems[i].shippingInfo[0].hasOwnProperty("shippingServiceCost")){
                    var value = allitems[i].shippingInfo[0].shippingServiceCost[0];
                    value= value["__value__"];
                    var currency = allitems[i].shippingInfo[0].shippingServiceCost[0];
                    currency = currency["@currencyId"];
                    //console.log(value);
                    if (value == "0.0"){
                        shipping_value = "Free Shipping";

                    }
                    else{
                        if (currency == "USD")
                        {
                            currency = "$";
                        }
                    shipping_value =  currency + " " + value;
                }
                    display_text += "<td>" + shipping_value + "</td>";
                
                }
                else
                {
                    display_text += "<td>N/A</td>";
                }
                display_text += "</tr>";

            }
            display_text +="<table>";
        }
        else{
            


                display_text += "<div style=\"border:2px solid #C0C0C0;  width:70%; background-color:#D0D0D0; text-align:center; margin:0 auto; padding-top:5px;padding-bottom:5px;\">"
                display_text += "<p style=\"font-size:15px; color:black;font-weight:bold; margin:0 auto; text-align:center;vertical-align:middle;\">No Records has been found</p>";
                display_text += "</div>";

        
    }
}

else{
        display_text +=  "<div style=\"border:2px solid #C0C0C0;  width:70%; background-color:#D0D0D0; text-align:center; margin:0 auto; padding-top:5px;padding-bottom:5px;\">"
        display_text += "<p style=\"font-size:15px; font-weight:bold; color: black; margin:0 auto; text-align:center;vertical-align:middle;\"> Requested Data Not Found in Server</p>";
        display_text += "</div><br>";
}



    document.getElementById("full-content-page").innerHTML = display_text;
       


    }




    function validateForm(){
        //
        
        var return_text = "full_page=yes";
        var keyword_text = document.getElementById("keyword").value;
        return_text += "&keyw=";
        return_text += keyword_text;

        
        var category_text = document.getElementById("category").value;
        return_text += "&catg=";
        return_text += category_text;

        
        var condition="";
        var checkboxes = document.getElementsByName("condition[]");
        for (i = 0; i< checkboxes.length;i++)
        {
            if (checkboxes[i].checked == true)
            {
                condition += checkboxes[i].value + ",";
            }
        }
        if (condition[condition.length - 1] == ","){
            condition = condition.substring(0,condition.length-1);

        }
        return_text += "&condition=";
        return_text += condition;

        var shippingoption="";
        var shipping_checking = document.getElementsByName("shipping[]");
        for (i=0;i<shipping_checking.length ;i++)
        {
            if(shipping_checking[i].checked == true)
            {
                shippingoption += shipping_checking[i].value + ",";
            }
        }

        if (shipping_checking[shipping_checking.length - 1] == ","){
            shipping_checking = shipping_checking.substring(0,shipping_checking.length - 1);

        }

        return_text += "&shipping=";
        return_text += shippingoption;
        
        
html_text="";
        if(document.getElementById("enablesearch").checked)
        {
            var regex =  /^\d{5}$/;
            var regex_miles = /^\d*$/;
            var miles_distance = document.getElementById("distancemiles").value;
            
        if(miles_distance == ""){
            miles_distance=10;
            return_text+="&distancemiles=";
            return_text += miles_distance;
            

        }
        else if (regex_miles.test(miles_distance) == false)
            {
                html_text += "<div style=\"border:2px solid #C0C0C0;  width:70%; background-color:#D0D0D0; text-align:center; margin:0 auto; padding-top:5px;padding-bottom:5px;\">"
                html_text += "<p style=\"font-size:15px; font-weight:bold; color:black;margin:0 auto; text-align:center;vertical-align:middle;\">Miles is Invalid</p>";
                html_text += "</div><br>";

                //document.getElementById("errorcode").innerHTML = html_text;

            }
        else{
            //document.getElementById("errorcode").innerHTML = html_text;
            return_text+="&distancemiles=";
            return_text += miles_distance;


        }


        

        if (document.getElementById("here").checked)
        {

            var geolocation = getGeoLocationJSON("http://ip-api.com/json");
            return_text += "&area=";
            return_text += geolocation.zip;

        }

        else if(document.getElementById("zip").checked) {

            var zipcode_area = document.getElementById("zipcode").value;
            
            if (zipcode_area == ""){
                
            }
            else if (regex.test(zipcode_area) == false)
            {
                html_text += "<div style=\"border:2px solid #C0C0C0;  width:70%; background-color:#D0D0D0; text-align:center; margin:0 auto; padding-top:5px;padding-bottom:5px;\">"
                html_text += "<p style=\"font-size:15px; font-weight:bold; margin:0 auto; text-align:center;vertical-align:middle;\">Zipcode is Invalid</p>";
                html_text += "</div>";

                //document.getElementById("errorcode").innerHTML = html_text;

            }
            else{
                //document.getElementById("errorcode").innerHTML = html_text;
                return_text += "&area=";
                return_text += zipcode_area;
            }


        }

        

    }

    document.getElementById("errorcode").innerHTML = html_text;
    document.getElementById("full-content-page").innerHTML = "";

    //console.log("hi" + document.getElementById("errorcode").innerHTML + "hi");
    if(document.getElementById("errorcode").innerHTML == "")
    {
        
    var requested_text = readData(return_text);
    setFullPage(requested_text);

        //console.log(return_text);
        //alert(return_text);
        
        //return return_text;
        }
    }

</script>
    <div class = "fullproductsearch">
        <div class ="productsearch">
                <i>Product Search</i>

        </div>
        <hr class="vertical">
        
        <div class = "contents"> 
            <form action="" id = "myForm" method="POST" name="myForm" onsubmit="validateForm(); return false;">

            <div class="all-contents">
            
            <p>
            <label for="keyword"> <b> Keyword </b> </label>
            <input type="text"  name = "keyword" id = "keyword" value="" required>
            </p>
            <p>
                <label for = "catgory"> <b> Category </b> </label>
                <select name="category" id = "category">
                    <option name="All Categories" value="0"> All Categories</option>
                    <option name = "Art" value ="550"> Art </option>
                    <option name = "Baby" value ="2984"> Baby </option>
                    <option name = "Books" value ="267"> Books </option>
                    <option name = "Clothing, Shoes & Accessories" value="11450"> Clothing, Shoes & Accessories </option>
                    <option name = "Computers/Tablets & Networking" value ="58058"> Computers/Tablets & Networking </option>
                    <option name = "Health & Beauty" value ="26395"> Health & Beauty</option>
                    <option name = "Music" value ="11233"> Music </option>
                    <option name = "Video Games & Consoles" value ="1249"> Video Games & Consoles </option>


                </select>
            </p>
            <p>
                <b> Condition </b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp   
                <input type="checkbox" name="condition[]" id="newcondition" value="New"> New  &nbsp&nbsp
                <input type="checkbox" name="condition[]" id="usedcondition" value="Used"> Used &nbsp&nbsp
                <input type="checkbox" name="condition[]" id="unspecifiedcondition" value="Unspecified"> Unspecified 
            </p>
            <p>
                <b> Shipping Options </b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 
                <input type="checkbox" name="shipping[]" id="localpp" value="LocalPickupOnly"> Local Pickup &nbsp&nbsp
                <input type="checkbox" name="shipping[]" id="freeship" value="FreeShippingOnly"> Free Shipping
            
            </p>
            <table class = "enablesearchtable">
                <tr>
                <td><input type="checkbox" name="enablesearch" id ="enablesearch" onchange="enablesearchDisable()"><label for="enablesearch"> <b>Enable NearBy Search</b> </label>  </td>   

                <td><input style="opacity:0.5" type="text" name="distancemiles" size="10" id="distancemiles" placeholder="10" disabled></td><td> <span id="milesfrom" style="opacity: 0.5"><label for ="distancemiles" > <b> miles from </b></label></span></td>
                
                <td><input type = "radio" id="here" name = "area[]" value="here" onchange = "zipcodeDisable()" checked disabled><span id="heretag"style="opacity: 0.5" > <label for="here" > Here</label></span></td></tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>

                <td><input type="radio" name="area[]" id = "zip" value="" onchange="zipcodeDisable()"disabled> 
                    <input type="text" name="zipcode" id="zipcode" size="7" placeholder ="zip code" disabled ></td>
            </tr>
            </table>
            
        </div>
        <br>
        <div class="buttons">
            <button type="submit" name="search" id="search"  > Search </button>
            <button type="reset" name="clear" id="clear" onclick="setOriginalData()"> Clear</button>
        </div>

        </form>

        
        </div>

    </div>
    <div id = "errorcode">
    </div>
    <div id = "full-content-page">
    </div>
    



</body>
</html>
<?php 
}
?>

