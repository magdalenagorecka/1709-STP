

$(document).ready(function() {
//1. wybierz z menu rozwijanego
let vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids=1";
$('body').on('load',getDefault());

function getDefault(){
  $.getJSON(vinURL, function(data){
      var html="";
      data.forEach(function(val){

        html += "<div class='vinItem'>";
        html += "<div class='vinItem__photo'>"
        html += "<img src='" + val.imageUrl + "'>";
        html += "<p class='vinItem__id'>" + val.id + "</p>";
        html += "</div>"
        html += "<div class='vinItem__info'>"
        html += "<p>" + val.country + " / " + val.region + "</p>";
        html += "<p><h3>" + val.name + "</h3></p>";
        html += "<p>" + val.product + " | " + val.grapes + " | " + val.productionYear + "</p>";
        html += "<p class='vinItem__rate'> <i class='material-icons'>star_rate</i>Rate: " + val.rate + "</p>";
        html += "<p>Sold Bottles: " + val.soldBottles + "</p>";
        html += "<p><a href='" + val.productUrl + "'>Product's Link</a></p>";
        html += "<p>Availability: " + val.availability + "  Ecological: " + val.ecological + "  Packaging: " + val.packaging + "</p>";
        html += "<p class='vinItem__price'>" + val.price + " kr </p>";
        html += "</div>"
        html += "</div>"

      });
      $('#vin').html(html);

    }, "json");
  }


$("#pages").on('change',function(){
    page = $(this).find(":selected").val();
    vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids="+page;
    getDefault();
});

//***** Menu buttons **********//
  $('.sort__name').on('click', function(){
    alert("dupa");
  });

  $('.sort__price').on('click', function(){
    alert("dupa2");
  });

  $('.filter__country').on('click', function(){
    alert("dupa");
  });


});//ready
