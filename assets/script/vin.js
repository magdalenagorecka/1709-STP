

$(document).ready(function() {
//1. wybierz z menu rozwijanego

let e = document.getElementById('pages'),
    page = e.options[e.selectedIndex].value,
    vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids="+page;


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
        html += "<p>" + val.productionYear + " | " + val.product + " | " + val.grapes + "</p>";
        html += "<p class='vinItem__rate'>Rate: " + val.rate + "</p>";
        html += "<p>Sold Bottles: " + val.soldBottles + "</p>";
        html += "<p><a href='" + val.productUrl + "'>Product's Link</a></p>";
        html += "<p>Availability: " + val.availability + "  Ecological: " + val.ecological + "  Packaging: " + val.packaging + "</p>";
        html += "<p class='vinItem__price'>" + val.price + " kr </p>";
        html += "</div>"
        html += "</div>"

      });
      $('#vin').html(html);

    }, "json");

});//ready
