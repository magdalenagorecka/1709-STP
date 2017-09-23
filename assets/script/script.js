$(document).ready(function() {
  let urlVin='http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids=4';

  function getVin(val){
    $.ajax({
      url: urlVin,
      dataType: "jsonp",
      success: function(data){
        $("#vin").html("<p>dupa</p>");
      }
    });
  }
  getVin();




let rssUrl = "http://www.vg.no/rss/feed/",
    $rssItem = $(".rssItem");
//using xml parsing funcionality of jquery
$.get(rssUrl, function(data){

  var sortArr =[];

  var xmlData = $(data).find("item");
  xmlData.sort(function(a,b){
    a = $(a).find("pubDate").text();
    b = $(b).find("pubDate").text();
    return(b.localeCompare(a));
  });
  
  xmlData.each(function(){
    let item={
        title: $(this).find("title").text(),
        pubDate: $(this).find("pubDate").text()
      }

    $rssItem.append('<div class="rss"><h3>' + item.title + '</h3><p class="pubDate">' + item.pubDate + '</p></div>');

  });
});







}) //document ready
