//Массив маркеров (Placemark)
var myGeoObjects = [];

var myMap;


ymaps.ready(init);

//Инициализация карты
function init () {    
    myMap = new ymaps.Map('map', {
        center: [53.902496, 27.561481], // Минск
        zoom: 7,
        controls: ['zoomControl','fullscreenControl']
        
    }, {
        searchControlProvider: 'yandex#search'
    }),
    
    //Создаём кластеризатор
            clusterer = new ymaps.Clusterer({            
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false,
            preset: 'islands',
            clusterIconColor: '#3f6ab7'
        }),
            getPointData = function (index) {
            myMap.setZoom(3);
            return {
                balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
                balloonContentBody: '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
                balloonContentFooter: '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' + index + '</strong>',
                clusterCaption: 'метка <strong>' + index + '</strong>'
            };
        },
            getPointOptions = function () {
            return {
                preset: 'islands#violetIcon'
            };
        },
        geoObjects = [];
    
    clusterer.events
        .add('mouseenter', function (e) {
            // Ссылку на объект, вызвавший событие,
            // можно получить из поля 'target'.
            e.get('target').options.set('clusterIconColor', '#7991ce');
        })
        .add('mouseleave', function (e) {
            e.get('target').options.set('clusterIconColor', '#3f6ab7');
        });
    ymaps.ready(function(){
        clusterer.add(myGeoObjects);
        myMap.geoObjects.add(clusterer);
    });
}

//Перемещение позиции на карте
function panoramTo(){
    $(".city").click(function() {
        coords = $(this).attr("coord");
        coordsArr = [];
        coordsArr.push(coords.split(',')[0]);
        coordsArr.push(coords.split(',')[1]);
        myMap.setCenter(coordsArr, 13, {
            checkZoomRange: true
        });
        
    }); 
    

}
 
//Добавить маркер на карту
var addMarkerToMap = function (coord, cityName, docs){
    var noAnalysis = "Для данного населённого пункта ещё не проведены исследования"
    //формирование строки для хинта
    var docsString="";    
    docs.forEach(function(item, i, arr) {        
        
        myFunc = "alert("+typeof item.split('?')[0]+");";
        //console.log(myFunc);
        //docsString+="<a class='cityHref'>"+item.split('?')[1]+"</a><br>";
        docsString+=`<a class="cityHref" href="javascript:openModal('${item.split('?')[0]}')">${item.split('?')[1]}</a>`;
    });
    
    ymaps.ready(function(){
        
    //Создаём маркер
    myPlacemark = new ymaps.Placemark([coord.split(',')[0], coord.split(',')[1]], {
            balloonContentHeader: cityName,  
            balloonContentBody: docsString,
        
        }, {
            preset: 'islands#icon',
            iconColor: '#3f6ab7'
        });
        
    myPlacemark.events.add('click', function (e) {     
        //alert();
        var coords = e.get('target').geometry.getCoordinates();
        //alert(coords);
        myMap.setCenter(coords, 13, {
            checkZoomRange: true
        });
        
        
    }).add('mouseenter', function (e) {
            // Ссылку на объект, вызвавший событие,
            // можно получить из поля 'target'.
            if(e.get('target').options.get('iconColor')=='#3f6ab7'){
                e.get('target').options.set('iconColor', '#7991ce');  
            }
            else if(e.get('target').options.get('iconColor')=='#737373'){
                e.get('target').options.set('iconColor', '#b0b0b0');                      
            }
        //console.log(e.get('target').properties._data.balloonContentBody);
            
        })
        .add('mouseleave', function (e) {
            if(e.get('target').options.get('iconColor')=='#7991ce'){
                e.get('target').options.set('iconColor', '#3f6ab7');  
            }
            else if(e.get('target').options.get('iconColor')=='#b0b0b0'){
                e.get('target').options.set('iconColor', '#737373');                      
            }
        });
        
    //Для городов, для которых ещё нету исследований
    if(docs.length==1 & docs[0]=="?"){
        myPlacemark.options.set('iconColor', '#737373');//#b0b0b0
        myPlacemark.properties.set('balloonContentBody',noAnalysis);
    }    

    myGeoObjects.push(myPlacemark);
    myMap.geoObjects.add(myPlacemark);
        
        
    
  
    });   
}

