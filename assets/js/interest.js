//Gets value of querystring variable
function GET(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
		   var pair = vars[i].split("=");
		   if(pair[0] == variable){return pair[1];}
   }
   return '';
}

function init(){
    var title = decodeURI(GET('title'));
    
    if(title.length > 2){
         $.jGFeed('http://backend.deviantart.com/rss.xml?q=gallery%3AAstral-Haze%2F127863&type=deviation',
              function(feeds){
                // Check for errors
                if(!feeds){
                  // there was an error
                  return false;
                }
                // do whatever you want with feeds here
                var found = false;
                for(var i=0; i<feeds.entries.length; i++){
                  var entry = feeds.entries[i];
                  // Entry title
                    if(entry.content){
                        if(entry.title.includes(title)){
                            found = true;
                            $('#interestForm').addClass(entry.title);
                            $('#content').append(
                                        '<h2>'+entry.title+'</h2><img width="400px" src="'+entry.mediaGroups[0].contents[0].url+'" alt="'+entry.title+'"/><p>'+entry.mediaGroups[0].contents[0].description+'</p></div>'
                                    );
                            $('#formTitle').val(entry.title);
                        }   
                    }
                }
             if(found != true){
                window.location.replace("http://astral-haze.site");
            }
              }, 20);
    } else {
     window.location.replace("http://astral-haze.site");   
    }
    
}
init();