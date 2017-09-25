$(document).ready(function() {

  let vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids=1",
  $pages = $("#pages"),
  $vin = $('#vin'),
  countryArray,
  jsonData,
  i,
  jsonDataFiltered,
  sortOrder = 'asc';

  $('body').on('load', getDefault());

  function getDefault(){
    $.getJSON(vinURL, function(data){

      var html = "",
      star,
      cat,
      logo;

      jsonData = data;
      jsonDataFiltered = jsonData;

      data.forEach(function showItems(val){
        //setting placeholder if no img given
        val.imageUrl !== null ? logo = val.imageUrl : logo ='./assets/img/placeholder.png';
        //number of stars
        val.rate === null ? star = 'null': star = Math.floor(val.rate);
        //setting icon for wine type
        val.product === "Rött vin" ? cat = 1 : val.product === "Vitt vin" ? cat = 2 : val.product === "Rosévin" ? cat = 3 : cat = 0;

          html += "<div class='vinItem'>";
          html += "<div class='vinItem__photo'>";
          html += "<img src='" + logo + "'>";
          html += "<p class='vinItem__id'>" + val.id + "</p>";
          html += "</div>";
          html += "<div class='vinItem__info'>";
          html += "<p class='vinItem__country'>" + val.country + " | " + val.region + "</p>";
          html += "<p><h3>" + val.name + "</h3></p>";
          html += "<p class='vinItem__category'><span class='cat-" + cat + "'>"+val.product+ "</span> | " + val.grapes + " | " + val.productionYear + "</p>";
          html += "<p class='vinItem__rate'><span class='star-" + star +"'></span>Rate: " + Math.floor(val.rate*100)/100 + "</p>";
          html += "<div class='vinItem__small'><p >Sold Bottles: " + val.soldBottles + "   <a href='" + val.productUrl + "'>Product's Link</a></p>";
          html += "<p>Availability: " + val.availability + "    Ecological: " + val.ecological + "    Packaging: " + val.packaging + "</p></div>";
          html += "</div>";
          html += "<div  class='vinItem__price'><p>" + val.price + " kr </p>";
          html += "</div>";
          html += "</div>";

        });//end data.forEach
        $vin.html(html);

        //Array of all countries sorted a-z, filtered for duplicates
        let countryArr = $.map(data, (el) => { return el.country })
        .filter((elem, index, self) => { return index == self.indexOf(elem) })
        .sort((a,b) => { return a.localeCompare(b)});

      }, "json");
  }//end getDefault


    //  $("#country").append('<option value=' + value[i] + '>' + countryArr[i] + '</option>');





// on multiple select change
  $pages.change(function() {
    let selectedPages = [];

    $("#pages :selected").each(() => {
        selectedPages.push($(this).val());
    });
    vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids="+selectedPages;
    getDefault();
  });
  // select change
    $('#country').change(() => {

      let selectedItem = $("#country :selected");
      $.getJSON(vinURL, function(data){jsonData = data});
        if(selectedItem.val() === "default"){
          jsonDataFiltered = jsonData;
          getDefault();
        }else{
          jsonDataFiltered = jsonData.filter(i => {
            return i.country === selectedItem.val();
          });
          jsonData = jsonDataFiltered;
          showJson();
      }
    }); //end country select change

//***** Menu buttons **********//
  function sortPrice(){
     if(sortOrder === 'asc'){
       jsonData = jsonDataFiltered.sort((a,b) => { return a.price - b.price});
       sortOrder = 'desc';
     }else if(sortOrder === 'desc'){
       jsonData = jsonDataFiltered.sort((a,b) => { return b.price - a.price});
       sortOrder = 'asc';
     }
  }

function sortName(){
  if(sortOrder === 'asc'){
    jsonData = jsonDataFiltered.sort((a,b) => { return a.name.localeCompare(b.name)});
    sortOrder = 'desc';
  }else if(sortOrder === 'desc'){
    jsonData = jsonDataFiltered.sort((a,b) => { return b.name.localeCompare(a.name)});
    sortOrder = 'asc';
  }
}

function showJson(){
  html = "";
  for(i in jsonData){
    itemLayout();
  }
  $vin.html(html);
}

  function itemLayout(){
    jsonData[i].imageUrl !== null ? logo = jsonData[i].imageUrl : logo ='./assets/img/placeholder.png';

    html += "<div class='vinItem'>";
    html += "<div class='vinItem__photo'>";
    html += "<img src='" + logo + "'>";
    html += "<p class='vinItem__id'>" + jsonData[i].id + "</p>";
    html += "</div>";
    html += "<div class='vinItem__info'>";
    html += "<p>" + jsonData[i].country + " / " + jsonData[i].region + "</p>";
    html += "<p><h3>" + jsonData[i].name + "</h3></p>";
    html += "<p><span id='vinItem__category'>" + jsonData[i].product + "</span> | " + jsonData[i].grapes + " | " + jsonData[i].productionYear + "</p>";
    html += "<p class='vinItem__rate'>Rate: " + jsonData[i].rate + "</p>";
    html += "<div class='vinItem__small'><p >Sold Bottles: " + jsonData[i].soldBottles + "   <a href='" + jsonData[i].productUrl + "'>Product's Link</a></p>";
    html += "<p>Availability: " + jsonData[i].availability + "    Ecological: " + jsonData[i].ecological + "    Packaging: " + jsonData[i].packaging + "</p></div>";
    html += "</div>";
    html += "<div  class='vinItem__price'><p>" + jsonData[i].price + " kr </p>";
    html += "</div>";
    html += "</div>";
  }
/*  if(jsonData.product === "Rött vin"){
  $('.vinItem__info').addClass("red");
}else if(jsonData.product === "Mousserande vin"){
    $('#vinItem__category').addClass("blanc");
  }else if(jsonData.product === "Rosévin"){
    $('#vinItem__category').addClass("rose");
  }else{
  }
*/



  $('.sort__price').click(() => {
    $(this).find('i').toggleClass('fa-sort-numeric-desc fa-sort-numeric-asc');
     sortPrice();
     showJson();
  });

  $('.sort__name').click(() => {
    $(this).find('i').toggleClass('fa-sort-alpha-desc fa-sort-alpha-asc');
    sortName();
    showJson();
  });

  $(".styled-select").on({mouseenter:() => {
    $pages.fadeIn();
  }, mouseleave:() => {
    $pages.fadeOut();
  }});
});//ready
