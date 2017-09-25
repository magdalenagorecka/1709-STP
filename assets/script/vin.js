$(document).ready(function() {

  let vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids=1",
      $pages = $("#pages"),
      countryArray,
      jsonData,
      wantedData,
      i;

  $('body').on('load',getDefault());

  function getDefault(){
    $.getJSON(vinURL, function(data){

        var html = "",
        logo;

        jsonData = data;

        data.forEach(function showItems(val){

          if(val.imageUrl !== null){
            logo = val.imageUrl;
          }else{
            logo ='./assets/img/placeholder.png';
          }


        /*  console.log(data);
          if(val.product === "Rött vin"){
          $('#vinItem__category').addClass("red");
        }else if(val.product === "Mousserande vin"){
            $('#vinItem__category').addClass("blanc");
          }else if(val.product === "Rosévin"){
            $('#vinItem__category').addClass("rose");
          }else{
          }
*/
          html += "<div class='vinItem'>";
          html += "<div class='vinItem__photo'>";
          html += "<img src='" + logo + "'>";
          html += "<p class='vinItem__id'>" + val.id + "</p>";
          html += "</div>";
          html += "<div class='vinItem__info'>";
          html += "<p>" + val.country + " / " + val.region + "</p>";
          html += "<p><h3>" + val.name + "</h3></p>";
          html += "<p id='vinItem__category'><span>" + val.product + "</span> | " + val.grapes + " | " + val.productionYear + "</p>";
          html += "<p class='vinItem__rate'>Rate: " + val.rate + "</p>";
          html += "<div class='vinItem__small'><p >Sold Bottles: " + val.soldBottles + "   <a href='" + val.productUrl + "'>Product's Link</a></p>";
          html += "<p>Availability: " + val.availability + "    Ecological: " + val.ecological + "    Packaging: " + val.packaging + "</p></div>";
          html += "</div>";
          html += "<div  class='vinItem__price'><p>" + val.price + " kr </p>";
          html += "</div>";
          html += "</div>";




        });//end data.forEach


        $('#vin').html(html);

        //Array of all countries sorted a-z, filtered for duplicates
        let countryArr = $.map(data, (el) => { return el.country })
        .filter((elem, index, self) => { return index == self.indexOf(elem) })
        .sort(function(a,b) { return a.localeCompare(b)});




      }, "json");


  }//end getDefault


    //  $("#country").append('<option value=' + value[i] + '>' + countryArr[i] + '</option>');





// on multiple select change
  $pages.change(function(){
    let selectedPages = [];

    $("#pages :selected").each(function(){
        selectedPages.push($(this).val());
    });
    vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids="+selectedPages;
    getDefault();

  });


  // select change

    $('#country').change(function(){

      let selectedItem = $("#country :selected");
      $.getJSON(vinURL, function(data){jsonData = data});
        if(selectedItem.val() === "default"){
          getDefault();
        }else{
          jsonData = jsonData.filter(function(i){
            return i.country === selectedItem.val();
          });
          showJson();
      }

    }); //end country select change



//***** Menu buttons **********//

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

  $(".styled-select").on({mouseenter:function(){
    $("#pages").fadeIn();
  }, mouseleave:function(){
    $("#pages").fadeOut();
  }});
});//ready
