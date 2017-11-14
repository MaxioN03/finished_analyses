//Open XML
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "../resource/docs.xml",
        dataType: "xml",
        success: xmlParser
    });
});

//Parse XML
function xmlParser(xml) {

    
    /*$('#load').fadeOut();
    var i=0;
    $(xml).find("REGION").each(function () { 
        $("#mcd-menu").append("<li class='first-level'><a><strong>"+$(this).find("NAME").text()+"</strong></a></li>");    
        $(".first-level:eq("+i+")").append("<ul class='second-level'><li><a class='city' href='"+$(this).find("REGION-CENTER-DOC-HREF").text()+"'><i></i>"+$(this).find("REGION-CENTER").text()+"</a></li></ul>");
        
            var j=0;
            $(this).find("DISTRICT").each(function () {
                
                $(".first-level:eq("+i+")  .second-level").append("<li><a href='#'><i class=''></i>"+$(this).attr("name")+"</a><ul class='third-level'></ul></li>");
                
                    $(this).find("CITY-HREF").each(function () {

                        $(".first-level:eq("+i+") .third-level:eq("+j+")").append("<li><a class='city' >"+$(this).attr("name")+"</a></li>");
                        //$(".first-level:eq("+i+") .third-level:eq("+j+")").append("<li><a class='city' href='"+$(this).text() +"'>"+$(this).attr("name")+"</a></li>");
                            
                        
    
                        
                    });  
                j++; 
            });
        i++;
    });*/
    
    $('#load').fadeOut();
    var i=0;
    $(xml).find("REGION").each(function () {
        $("#menu").append("<li class='first-level parent'><a><strong>"+$(this).find("NAME").text()+"</strong></a></li>");
        $(".first-level:eq("+i+")").append("<ul class='second-level parent'><li><a class='city' coord='"+$(this).find("REGION-CENTER").attr("coord")+"'><strong>"+$(this).find("REGION-CENTER").text()+"</strong></a></li></ul>");

        docsRegionCenter = [];
        docsRegionCenter.push($(this).find("REGION-CENTER-DOC-HREF").text()+"?"+$(this).find("REGION-CENTER-DOC-HREF").attr("name"));
        addMarkerToMap($(this).find("REGION-CENTER").attr("coord"),$(this).find("REGION-CENTER").text(),docsRegionCenter );
        
            var j=0;
            $(this).find("DISTRICT").each(function () {
                
                $(".first-level:eq("+i+")  .second-level").append("<li><a href='#'><i class=''></i>"+$(this).attr("name")+"</a><ul class='third-level'></ul></li>");
                
                    $(this).find("CITY").each(function () {
                        var cityName = $(this).attr("name");
                        var coord = $(this).attr("coord");
                        var docs = [];
                        
                        $(".first-level:eq("+i+") .third-level:eq("+j+")").append("<li><a class='city' coord='"+coord+"'>"+cityName+"</a></li>");
                        
                        $(this).find("DOC").each(function () {
                            
                            docs.push($(this).text()+"?"+$(this).attr("name"));
                        });  
                        
                        addMarkerToMap(coord,cityName, docs);
   
                    });  
                j++; 
            });
        i++;
    });
    

panoramTo();
    
    
    var sort_by_name = function(a, b) {
        return a.innerHTML.toLowerCase().localeCompare(b.innerHTML.toLowerCase());
    }
    
    var list = $(".second-level > li").get();
    list.sort(sort_by_name);
    for (var i = 0; i < list.length; i++) {
        list[i].parentNode.appendChild(list[i]);
    }

}