$(document).ready(function() {

  let vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids=1",
      $pages = $("#pages"),
      countryArr,
      jsonData,
      wantedData,
      i;

  $('body').on('load',getDefault());

  function getDefault(){
    $.getJSON(vinURL,
      function(data){
        var html = "";
        jsonData = data;
        console.log(data);
        var logo;

        data.forEach(function showItems(val){

          if(val.imageUrl !== null){
            logo = val.imageUrl;
          }else{
            logo ='./assets/img/placeholder.png';
          }

          if(val.product === "Rött vin"){
            $('#vinItem__category').addClass("vinItem__category--red");
          }else if(val.product === "Mousserande vin"){
            $('#vinItem__category').addClass("vinItem__category--blanc");
          }else if(val.product === "Rosévin"){
            $('#vinItem__category').addClass("vinItem__category--rose");
          }

          html += "<div class='vinItem'>";
          html += "<div class='vinItem__photo'>";
          html += "<img src='" + logo + "'>";
          html += "<p class='vinItem__id'>" + val.id + "</p>";
          html += "</div>";
          html += "<div class='vinItem__info'>";
          html += "<p>" + val.country + " / " + val.region + "</p>";
          html += "<p><h3>" + val.name + "</h3></p>";
          html += "<p><span id='vinItem__category'>" + val.product + "</span> | " + val.grapes + " | " + val.productionYear + "</p>";
          html += "<p class='vinItem__rate'> <i class='material-icons'>star_rate</i>Rate: " + val.rate + "</p>";
          html += "<div class='vinItem__small'><p >Sold Bottles: " + val.soldBottles + "   <a href='" + val.productUrl + "'>Product's Link</a></p>";
          html += "<p>Availability: " + val.availability + "    Ecological: " + val.ecological + "    Packaging: " + val.packaging + "</p></div>";
          html += "</div>";
          html += "<div  class='vinItem__price'><p>" + val.price + " kr </p>";
          html += "</div>";
          html += "</div>";
        });//end data.forEach
        $('#vin').html(html);
      }, "json");



  }//end getDefault
// on multiple select change
  $pages.on('change',function(){
    let selectedPages = [];

    $("#pages :selected").each(function(){
        selectedPages.push($(this).val());
    });
    vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids="+selectedPages;
    getDefault();

  });

//***** Menu buttons **********//




let selectedItem = $("#country :selected");
console.log("selectedItem: "+selectedItem);
  $('#country').on('change', function(){
    jsonData = jsonData.filter(function(i) {
      return i.country === selectedItem;
    });
    showJson();
   }
 );

// pobierz tablicę
// stwórz tablicę państw
// usuń powtarzające się państwa
// stwórz select z państwami
//


let sortOrder = 'asc';
  $('.sort__price').click(function(){
    $(this).find('i').toggleClass('fa-caret-down fa-caret-up');

    if(sortOrder === 'asc'){
      jsonData = jsonData.sort(function(a,b) { return a.price - b.price});
      sortOrder = 'desc';
    }else if(sortOrder === 'desc'){
      jsonData = jsonData.sort(function(a,b) { return b.price - a.price});
      sortOrder = 'asc';
    }
    showJson();
  });


  $('.sort__name').click(function(){
    $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
    if(sortOrder === 'asc'){
      jsonData = jsonData.sort(function(a,b) { return a.name.localeCompare(b.name)});
      sortOrder = 'desc';
    }else if(sortOrder === 'desc'){
      jsonData = jsonData.sort(function(a,b) { return b.name.localeCompare(a.name)});
      sortOrder = 'asc';
    }
    console.log(jsonData);
    showJson();
  });

  function showJson(){
    html = "";
    for(i in jsonData){
      itemLayout();
    }
    $('#vin').html(html);
  }

  function itemLayout(){
    if(jsonData[i].imageUrl !== null){
      logo = jsonData[i].imageUrl;
    }else{
      logo ='./assets/img/placeholder.png';
    }

    if(jsonData[i].product === "Rött vin"){
      $('#vinItem__category').addClass("vinItem__category--red");
    }else if(jsonData[i].product === "Mousserande vin"){
      $('#vinItem__category').addClass("vinItem__category--blanc");
    }else if(jsonData[i].product === "Rosévin"){
      $('#vinItem__category').addClass("vinItem__category--rose");
    }

    html += "<div class='vinItem'>";
    html += "<div class='vinItem__photo'>";
    html += "<img src='" + logo + "'>";
    html += "<p class='vinItem__id'>" + jsonData[i].id + "</p>";
    html += "</div>";
    html += "<div class='vinItem__info'>";
    html += "<p>" + jsonData[i].country + " / " + jsonData[i].region + "</p>";
    html += "<p><h3>" + jsonData[i].name + "</h3></p>";
    html += "<p><span id='vinItem__category'>" + jsonData[i].product + "</span> | " + jsonData[i].grapes + " | " + jsonData[i].productionYear + "</p>";
    html += "<p class='vinItem__rate'> <i class='material-icons'>star_rate</i>Rate: " + jsonData[i].rate + "</p>";
    html += "<div class='vinItem__small'><p >Sold Bottles: " + jsonData[i].soldBottles + "   <a href='" + jsonData[i].productUrl + "'>Product's Link</a></p>";
    html += "<p>Availability: " + jsonData[i].availability + "    Ecological: " + jsonData[i].ecological + "    Packaging: " + jsonData[i].packaging + "</p></div>";
    html += "</div>";
    html += "<div  class='vinItem__price'><p>" + jsonData[i].price + " kr </p>";
    html += "</div>";
    html += "</div>";
  }

});//ready
