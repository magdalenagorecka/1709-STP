$(document).ready(function() {

let rssUrl = "http://www.vg.no/rss/feed/",
    $rssItem = $(".rssItem"),
    sortArr =[],
    $sort = $("#sort");
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
  console.log(sortArr);
});


//sorting button
  $sort.click(function(){
    sortArr.reverse();
    console.log(sortArr);
  });
}) //document ready
