$("#submit").on("click", function() {
var yelpTerms = $("#cuisine").val().trim();
var yelpAddress = $("#userLocation").val().trim();
var zipcode = ""; // This is going to be a variable coming from the Seat Geek Api
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
    var radius = 8000;
    var price = "" // This will come from the user input

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
    parameters.push(['radius', radius]);
    parameters.push(['price', price]);
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

        $.ajax({'url': message.action,    
                  'method': 'GET',
                  'data': parameterMap,
                  'cache': true,
                  'dataType': 'jsonp',
                  'jsonpCallback': 'cb',}).done(function(response) {
            

            console.log($.ajax({'url': message.action,    
                  'method': 'GET',
                  'data': parameterMap,
                  'cache': true,
                  'dataType': 'jsonp',
                  'jsonpCallback': 'cb',}));
            console.log(message);
            console.log(response.businesses);
            });
        })