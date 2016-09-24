// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCbTv3BkBJNDeICV4f0grvKiTPjyfcVEfE",
    authDomain: "snapsnax.firebaseapp.com",
    databaseURL: "https://snapsnax.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "961593911482"
  };
  firebase.initializeApp(config);

  // Document Ready with the Materialize triggers
  $(document).ready(function(){
  	//Parallax Trigger
    $('.parallax').parallax();
  	// material select trigger
  	$('select').material_select();
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
     }
  );
      


  });
          
  // =========Start Yelp API=========
function restaurantFinder() {

    var yelpAddress = document.getElementById("gmap_where").value;
    var yelpTerms = document.getElementById("gmap_type").value;
    $(".searchResults").empty();

    var auth = {
        consumerKey: 'A57Bv67Jx1i_WTKhVxaiTg', 
        consumerSecret: 'z4fnfyiWxl25JrABzDChCd8NGGI',
        accessToken: 'aDHmxuRU28TxZ_c4ltxXPkc7rb77UwUH',
        accessTokenSecret: 'L_Q6vCfuuCl5QuaXSFi4lZ9X_UM',
        serviceProvider: {
        signatureMethod: "HMAC-SHA1"
        }
    };
    var terms = yelpTerms;
    var near = yelpAddress;
    var limit = 12;
    var image_url = 'image_url';
    var rating_img_url_large = 'rating_img_url_large';
    var phone = 'phone';
    var yelpUrl = 'url';

    var accessor = {
      consumerSecret: auth.consumerSecret,
      tokenSecret: auth.accessTokenSecret
    };

    parameters = [];
    parameters.push(['url', yelpUrl]);
    parameters.push(['term', terms]);
    parameters.push(['location', near]);
    parameters.push(['limit', limit]);
    parameters.push(['image_url', image_url]);
    parameters.push(['rating_img_url_large', rating_img_url_large]);
    parameters.push(['phone', phone]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


    var message = {
      'action': 'http://api.yelp.com/v2/search',
      'method': 'GET',
      'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
    var bestRestaurant = "Some random restaurant";

    $.ajax({
      'url': message.action,    
      'method': 'GET',
      'data': parameterMap,
      'cache': true,
      'dataType': 'jsonp',
      'jsonpCallback': 'cb',
      'success': function(data, textStats, XMLHttpRequest) {

        // =====This code will print data on the page=========
            var i;
            for(var i=0; i<12; i++){

            var yelpDiv = $('<div>').addClass('restaurantBox');

            var yelpUrlHref = $('<a>').attr('href', data.businesses[i].url).addClass('fancybox fancybox.iframe');

            var img = $('<img>').attr('src', data.businesses[i].image_url).addClass('imageDisplay');

            yelpUrlHref.append(img);

            yelpDiv.append(yelpUrlHref);    

            var bizName = $('<br /><p>').text(data.businesses[i].name).addClass('yelpLabel');
            yelpDiv.append(bizName);

            var ratingImg = $('<img>').attr('src', data.businesses[i].rating_img_url_large).addClass('yelpRating')
            yelpDiv.append(ratingImg);

            var phoneNum = $('<br /><span>').text(data.businesses[i].phone).addClass('yelpPhone')
            yelpDiv.append(phoneNum);

            $(".yelpPhone").text(function(i, text) {
                text = text.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "$1-$2-$3");
                return text;
            });

            $('.searchResults').append(yelpDiv);  

            };
        },
    });
};
// =========End Yelp API=========

// =========Start Google Maps API ======
//function locationFinder (){
  //set variables
	//var auth = "https://maps.googleapis.com/maps/api/geocode/json?address=" +1600+Amphitheatre+Parkway,+Mountain+View,+CA+"&key=AIzaSyCNEH9ddgTnDDO-HPKQtW1INRnXiYkp5aA";

  var geocoder;
  var map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


//}; // close locationFinder function






