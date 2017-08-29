$(document).ready(function() {
  /*

  */
  // $.ajax({
  //      url: 'logIn.html',
  //      type: 'GET',
  //      dataType: 'html',
  //      success: function(data){
  //        $('.container').html(data);
  //      }
  //  });
  $(".container").load("logIn.html .logInPageWrapper");
  /*
    Declaring variable
  */
  //localStorage.clear();
  var bannerArray =['dunkirkBanner', 'hangoverBanner', 'titanicBanner','toyStoryBanner'];
  /*
    setting heigth as per widow heigth
  */
  $('body').css('height' , $(window).innerHeight());
  $('.wrapper').css('height' , $('body').height()- $('.jumbotron').innerHeight());
  $('.notification').css('height' ,$('.wrapper').height());
  /*
    MovieInfo construtor
  */
  function MovieInfo (movieName){
    this.movie = movieName;
    this.movieDetails = [];
  }

  /*
    MovieTimings constructor
  */
  function MovieTimings (theaterName,timings){
    this.theaterName = theaterName;
    this.timings = timings;
  }

  /*
    Function for storing local storage data
  */
  var storingData = function(name , data){
    localStorage.setItem(name,JSON.stringify(data));
  }

  /*
    Function for getting local storage data
  */
  var gettingData = function(name){
    console.log(JSON.parse(localStorage.getItem(name)));
    return JSON.parse(localStorage.getItem(name))
  }
  /*
    userCredential construtor
  */
  function Credential (){
    this.credentialData = [];
  }

   /*
    CredentialInfo constructor
  */
  function CredentialInfo (name, password){
    this.userName = name;
    this.password = password;
  }

  /*
    Function will enable notification div and
    show text in notification
  */
  var notification = function(textString){
    $('.notification-wrapper p').text(textString);
    $('.notification').removeClass('hide');
  }

  $('.notification-wrapper button').click(function() {
    $('.notification').addClass('hide');
    location.reload();
  });

  /*
    On click delete button delete the movie from
    local storage
  */
  $('.delete').click(function(e) {
    e.preventDefault();
    var movieName = $('#movie-info').val();
    if(movieName){
      var localstorageData = gettingData('movie');
      localstorageData.reduce(function(arr,data,index){
        if(movieName == data.movie){
          localstorageData.splice(index, 1);
          storingData('movie',localstorageData);
          notification(`Movie name '${movieName}' got deleted`);
        }else{
          notification(`Movie name '${movieName}' is not found`);
        }
      },[])
    }
  })
  /*
    Banner Scrolling after each 5 sec interval
  */
  // function moveLeft(){
  //   $(".image-holder").animate({
  //     left: "-400"
  //     }, 2000, function(){
  //       setTimeout(function() {
  //         $('.bannerList img').css('src', ``);
  //         moveLeft()
  //     }, 3000);
  //   });
  // }

  /*
    On add information button in admin page
    save all data in object
  */
$(".add-info").click(function(e){
  e.preventDefault();
  var movieName = $('#movie-info').val();
  var MovieDetail = new MovieInfo (movieName);
  var movieObject = []
    $('.theater-form').each(function() {
      var timingArray =[];
      var theaterName;
      theaterName = $(this).find('#theater').val();
      $(this).find('.timing-checkbox:checked').each(function(){
        timingArray.push(this.value);
      });
      var MovieTimingInfo = new MovieTimings(theaterName,timingArray)
      MovieDetail.movieDetails.push(MovieTimingInfo)
    });
    movieObject.push(MovieDetail);
    var localStorageData = gettingData("movie");
    if(!localStorageData){
      storingData("movie", movieObject);
    }else{
      localStorageData.push(MovieDetail);
      storingData("movie", localStorageData);
    }
    notification(`Movie name '${movieName}' got added`);
  });



  /*
    tigger click on div with class 'add-theater'
   in admin page for loading theater name and timing
  */
  //$(".add-theater").trigger('click');

  /*
    Add theater name and timing in div with
   class 'add-theater' in admin page
  */
  $(".add-theater").click(function(e){
    e.preventDefault();
    $("#theater-timing").append('<div class="theater-form">' +
                        '<div class="form-group">' +
                        '<label for="theater">Theater:</label>'+
                        '<select class="form-control" id="theater">'+
                          '<option>Cinerama</option>'+
                          '<option>Regal</option>'+
                          '<option>Imax</option>'+
                          '<option>Moore</option>'+
                        '</select>'+
                      '</div>'+
                      '<div class="form-group">' +
                      '<label class="checkbox-inline">'+
                        '<input type="checkbox" class="timing-checkbox" value="11:00am">11:00am'+
                      '</label>'+
                      '<label class="checkbox-inline">'+
                        '<input type="checkbox" class="timing-checkbox" value="1:00pm">1:00pm'+
                      '</label>'+
                      '<label class="checkbox-inline">'+
                        '<input type="checkbox" class="timing-checkbox" value="3:00pm">3:00pm'+
                      '</label>'+
                      '<label class="checkbox-inline">'+
                        '<input type="checkbox" class="timing-checkbox" value="5:00pm">5:00pm'+
                      '</label>'+
                      '<label class="checkbox-inline">'+
                        '<input type="checkbox" class="timing-checkbox" value="7:00pm">7:00pm'+
                      '</label>'+
                      '<label class="checkbox-inline">'+
                        '<input type="checkbox" class="timing-checkbox" value="9:00pm">9:00pm'+
                      '</label>'+
                      '<label class="checkbox-inline">'+
                        '<input type="checkbox" class="timing-checkbox" value="11:00pm">11:00pm'+
                      '</label>'+
                      '</div>'+
                      '</div>'
                    );
  });

/*
  On click create an account button show signup page
*/
$('.createAccountBtn').click(function(){
  $('.page-title').text('Create an account');
  $('.signin-btns').removeClass('hide');
  $('.confirm-password').removeClass('hide');
  $('.login-btns').addClass('hide');
  $('input').val("");

})

/*
  On click already a user button show login page
*/
$('.login-page-btn').click(function(){
  $('.page-title').text('LogIn to Book My Show');
  $('.signin-btns').addClass('hide');
  $('.confirm-password').addClass('hide');
  $('.login-btns').removeClass('hide');
  $('input').val("");

})

/*
  On click signup store credential
*/

$('.signUp').click(function(e){
  e.preventDefault();
  var userName = $('#usrName').val().trim();
  var password = $('#password').val().trim();
  var confirmPassword = $('#confirm-password').val().trim();
  var infoObject = new CredentialInfo(userName, confirmPassword);
  var credential = new Credential();
  if(userName && password && password === confirmPassword){
    credential.credentialData.push(infoObject);
    var localStorageData = gettingData("credential");
    if(!localStorageData){
      storingData('credential', credential.credentialData);
    }else{
      localStorageData.push(infoObject);
      storingData('credential', localStorageData);
    }
    alert(`Congratulation '${userName}', Account got created`);
  }else{
    alert('warning');
 }

})

/*
  On click login if credential match send it to home page
*/
$('.logIn').click(function(e){
  e.preventDefault();
  var userName = $('#usrName').val().trim();
  var password = $('#password').val().trim();
  if(userName && password){
      var localstorageData = gettingData('credential');
      localstorageData.reduce(function(arr,data,index){
        if(userName == data.userName){
          localstorageData.splice(index, 1);
          storingData('credential',localstorageData);
          alert('home');
          }else{
          alert(`credential not found Please signup`);
        }
      },[])
    }
  else{
    alert('warning');
  }
  
})



});
