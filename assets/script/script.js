$(document).ready(function() {

  let rssUrl = "http://www.vg.no/rss/feed/",
      $rssItem = $(".rssItem"),
      sortArr =[],
      $sort = $("#sort"),
      html="";
  //using xml parsing funcionality of jquery
  $.get(rssUrl, function(data){

    let xmlData = $(data).find("item");
  //sort desc by default
    xmlData.sort(function(a,b){
      a = $(a).find("pubDate").text();
      b = $(b).find("pubDate").text();
      return(b.localeCompare(a));
    });
  //make an array
    xmlData.each(function(){
      let item={
          title: $(this).find("title").text(),
          pubDate: $(this).find("pubDate").text()
        }
      sortArr.push(item);
    });
    sortItem();
  });

  function sortItem(){
    for(var i=0; i<sortArr.length; i++){
      html += "<div  class='rss'><p><h3>" + sortArr[i].title + "</h3></p>";
      html += "<p class='pubDate'>" + sortArr[i].pubDate + "</p></div>";
    }
    $rssItem.html(html);
  }

  //sorting button
  $sort.click(function(){
    html='';
    $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
    sortArr.reverse();
    sortItem();
  });
}) //document ready
