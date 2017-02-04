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
        $.ajax({
                url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D'http%3A%2F%2Fbackend.deviantart.com%2Frss.xml%3Fq%3Dby%253AAstral-Haze%26type%3Ddeviation'%20&format=json",
                method:'get',
                dataType:'jsonp',
                success: function(data){
                    var entries = data.query.results.item;
                    console.log(entries);
                    for(var i=0; i<entries.length; i++){
                      var entry = entries[i];
                        console.log(entries[i]);
                      // Entry title
                        if(entry.content){
                            if(encodeURIComponent(entry.title[0]).includes(title)){
                                    found = true;
                            $('#interestForm').addClass(entry.title[0]);
                            $('#content').append('<h2>'+entry.title[0]+'</h2><img width="400px" src="'+entry.content.url+'" alt="'+entry.title[0]+'"/><p>'+entry.description[0].content+'</p></div>'
                                    );
                            $('#formTitle').val(entry.title[0]);
                            }
                        }
                    };
                    if(found != true){
                        window.location.replace("http://astral-haze.site");
                    }
                }
				});
    } else {
     window.location.replace("http://astral-haze.site");   
    }
    
}
init();