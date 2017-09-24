$(document).ready(function() {

  let vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids=1",
      $pages = $("#pages"),
      nameArr =[],
      priceArr = [],
      countryArr = [],
      jsonData;

  $('body').on('load',getDefault());

  function getDefault(){
    $.getJSON(vinURL,
      function(data){
        var html = "";
        jsonData = data;

        data.forEach(function showItems(val){

          html += "<div class='vinItem'>";
          html += "<div class='vinItem__photo'>";
          html += "<img src='" + val.imageUrl + "'>";
          html += "<p class='vinItem__id'>" + val.id + "</p>";
          html += "</div>";
          html += "<div class='vinItem__info'>";
          html += "<p>" + val.country + " / " + val.region + "</p>";
          html += "<p><h3>" + val.name + "</h3></p>";
          html += "<p>" + val.product + " | " + val.grapes + " | " + val.productionYear + "</p>";
          html += "<p class='vinItem__rate'> <i class='material-icons'>star_rate</i>Rate: " + val.rate + "</p>";
          html += "<p>Sold Bottles: " + val.soldBottles + "</p>";
          html += "<p><a href='" + val.productUrl + "'>Product's Link</a></p>";
          html += "<p>Availability: " + val.availability + "  Ecological: " + val.ecological + "  Packaging: " + val.packaging + "</p>";
          html += "<p class='vinItem__price'>" + val.price + " kr </p>";
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

  $('.filter__country').on('click', () => alert("country"));
  $('.sort__price').click(function(){
    jsonData = jsonData.sort(function(a,b) { return a.price - b.price});
    showJson();
  });

  function showJson(){
    html = "";
    for(var i in jsonData){
      html += "<div class='vinItem'>";
      html += "<div class='vinItem__photo'>";
      html += "<img src='" + jsonData[i].imageUrl + "'>";
      html += "<p class='vinItem__id'>" + jsonData[i].id + "</p>";
      html += "</div>";
      html += "<div class='vinItem__info'>";
      html += "<p>" + jsonData[i].country + " / " + jsonData[i].region + "</p>";
      html += "<p><h3>" + jsonData[i].name + "</h3></p>";
      html += "<p>" + jsonData[i].product + " | " + jsonData[i].grapes + " | " + jsonData[i].productionYear + "</p>";
      html += "<p class='vinItem__rate'> <i class='material-icons'>star_rate</i>Rate: " + jsonData[i].rate + "</p>";
      html += "<p>Sold Bottles: " + jsonData[i].soldBottles + "</p>";
      html += "<p><a href='" + jsonData[i].productUrl + "'>Product's Link</a></p>";
      html += "<p>Availability: " + jsonData[i].availability + "  Ecological: " + jsonData[i].ecological + "  Packaging: " + jsonData[i].packaging + "</p>";
      html += "<p class='vinItem__price'>" + jsonData[i].price + " kr </p>";
      html += "</div>";
      html += "</div>";
    }
    $('#vin').html(html);
  }

});//ready
