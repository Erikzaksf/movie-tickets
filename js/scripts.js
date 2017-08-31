$(document).ready(function() {



  //var imgName = ['dunkirk', 'hangover', 'spiderman', 'toystory', 'titanic', 'xmen'];
  var bannerArray =['dunkirkBanner', 'hangoverBanner', 'titanicBanner','toyStoryBanner'];
  /*
    setting heigth as per widow heigth
  */
  $('body').css('height' , $(window).innerHeight());
  $('.wrapper').css('min-height' , $('body').height()- $('.jumbotron').innerHeight());
  $('.notification').css('height' ,$('.wrapper').height());



  /*
    MovieSelectedSeat Info construtor
  */
  function MovieSelectedSeat (movieName,showTime){
    this.movie = movieName;
    this.seat = [];
    this.timing= showTime;
  }


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
    return JSON.parse(localStorage.getItem(name))
  }


  /*
    Function will refresh given page
  */
  var refreshPage= function(pageName){
    if(pageName == "admin"){
      $('.adminInfo input').val("");
      $(".theater-form").remove();
    }else if(pageName == "signUp"){
      $('.logInPageWrapper input').val("");
    }
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

  /*
    It will select the page you want to be in
  */
  var pageSelection = function(pageName){
    $('.container').children().addClass('hide');
    if(pageName == 'home'){
      $('.container .row').removeClass('hide');
      homePageData();
    }else if(pageName == 'admin'){
      $('.adminInfo').removeClass('hide');
    }
  }

  /*
    checking for current user
  */
  var checkForCurrentUser = function(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      if(currentUser === "adminERS"){
        pageSelection('admin');
      }else{
        pageSelection('home');
      }
      $('.app-logo span').removeClass('hide');
      $('.app-logo p strong').text(`${currentUser}`);
    }
  }

  /*
    home page link
  */
  $('.app-logo img').click(function(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      $('.row').children().remove();
      pageSelection('home');
    }
  })

  $('.notification-wrapper button').click(function() {
    $('.notification').addClass('hide');

  });

  /*
    On click signout remove user name
  */
  $('.logOut').click(function(){
    localStorage.removeItem('currentUser');
    location.reload();
  })


  /*
    On click delete button delete the movie from
    local storage
  */
  $('.delete').click(function(e) {
    e.preventDefault();
    var deleteData = false;
    var movieName = $('#movie-info').val();
    if(movieName){
      var localstorageData = gettingData('movie');
      localstorageData.reduce(function(arr,data,index){
        if(movieName == data.movie){
          localstorageData.splice(index, 1);
          storingData('movie',localstorageData);
          notification(`Movie name '${movieName}' got deleted`);
          deleteData = true;
        }
      },[])
      if(deleteData == false){
        notification(`Movie name '${movieName}' is not found`);
      }
      refreshPage("admin");
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
    save all data in object and before saving
    check localstorage for duplicates
  */
  $(".add-info").click(function(e){
    e.preventDefault();
    var movieName = $('#movie-info').val();
    var MovieDetail = new MovieInfo (movieName);
    var movieObject = []
    if(!checkDuplicates("movie", movieName)){
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
    }else{
      notification(`Movie name '${movieName}' already exist`);
    }
      refreshPage("admin");


  });


  /*
    check for dublicates
  */
  var checkDuplicates = function (objName, stringName){
    var duplicates = false
    var localStorageData = gettingData(objName);
    if(localStorageData){
      localStorageData.forEach(function(storedData){
      if(objName== "movie" && storedData.movie == stringName){
        duplicates = true;
      }
      if(objName== "credential" && storedData.userName == stringName){
        duplicates = true;
      }
      })
    }
    return duplicates;
  }

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
  on key down remove warning
  */
  $('.logInPageWrapper .form-group input').keydown(function(){
    $('.alert-danger').addClass('hide');
  })
   /*
  on focus empty value
  */
  $('.logInPageWrapper .form-group input').focus(function(){
    $(this).val('');
  })

  /*
    On click create an account button show signup page
  */
  $('.createAccountBtn').click(function(){
    $('.page-title').text('Create an account');
    $('.signin-btns').removeClass('hide');
    $('.confirm-password').removeClass('hide');
    $('.login-btns').addClass('hide');
    $('input').val("");
    $('.alert-danger').addClass('hide');

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
    if(userName && password && password === confirmPassword && !checkDuplicates('credential',userName)){
      credential.credentialData.push(infoObject);
      var localStorageData = gettingData("credential");
      if(!localStorageData){
        storingData('credential', credential.credentialData);
      }else{
        localStorageData.push(infoObject);
        storingData('credential', localStorageData);
      }
      refreshPage("signUp");
      if(userName == "adminERS"){
        pageSelection('admin');
        $('.app-logo span').removeClass('hide');
        $('.app-logo span p strong').text(`${userName}`);
        storingData('currentUser', userName);
      }else{
        pageSelection('home');
        $('.app-logo span').removeClass('hide');
        $('.app-logo span p strong').text(`${userName}`);
        storingData('currentUser', userName);
      }

    }else{
      warning('Details are not correct, Please try again');
      refreshPage("signUp")
   }

  })

  /*
    On click login if credential match send it to home page
  */
  $('.logIn').click(function(e){
    e.preventDefault();
    var incorrectInfo= true;
    var userName = $('#usrName').val().trim();
    var password = $('#password').val().trim();
    if(userName && password){
        var localstorageData = gettingData('credential');
        if(localstorageData.length > 0){
          localstorageData.reduce(function(arr,data,index){
            if("adminERS" == userName && password == data.password){
              pageSelection("admin");
              $('.app-logo span').removeClass('hide');
              $('.app-logo span p strong').text(`${userName}`);
              storingData('currentUser', userName);
              incorrectInfo= false;
            }
            else if(userName == data.userName && password == data.password){
              pageSelection("home");
              $('.app-logo span').removeClass('hide');
              $('.app-logo span p strong').text(`${userName}`);
              storingData('currentUser', userName);
              incorrectInfo= false;
            }
          },[])
        }
    }
    if(incorrectInfo == true){
      warning('Incorrect credential')
    }
  })

  /*
    for diaplaying warning in login page
  */
  var warning = function(warningString){
    $('.alert-danger').removeClass('hide');
    $('.alert-danger strong').text(warningString);
  }
  /*
    home page
  */
  var homePageData = function(){
    var localStorageData = gettingData("movie");
      if(localStorageData.length > 0){
        localStorageData.reduce(function(arr,data,index){

          $('.row').append('<div class="col-sm-4 moviesList">'+
                            '<div class="thumbnail">'+
                              '<img src="img/'+data.movie+'.jpg" class="responsive img-thumbnail" alt="'+data.movie+'">'+
                              '<p class="posterName">'+data.movie+'</p>'+
                              '<p class="lang">English</p>'+
                            '</div>' +
                            '<button class="book-movie">Book</button>' +
                          '</div>');
        },[])
      }
      /*
    on click book button show movie details
    */
    $('.moviesList .book-movie').on("click",function(){
      var timingDetail;
      var seatSelection = 0;
      var movieName = $(this.parentElement).find('.posterName').text();
      var localStorageData = gettingData("movie");
        if(localStorageData.length > 0){
          localStorageData.reduce(function(arr,data,index){
            if(data.movie == movieName){
              $('.jumbotron').css("background-image", "url(./img/"+data.movie+"Banner.jpg)")
              $('.jumbotron .movieDetailTitle').text(data.movie);
              $('.moviesList').addClass('hide');
              $('.bannerSlider').addClass('hide');
              $('.row').append('<div class="dateInfo">'+
                              '<li class="liSelected">29   Tue</li>'+
                              '<li>30   Wed</li>'+
                              '<li>31   Thu</li>'+
                            '</div>'+
                          '<div class="movieInfo">'+
                        '</div>');
              /*
              date on click
              */
              $('.dateInfo li').on('click',function (){
                $('.dateInfo li').removeClass('liSelected');
                $(this).addClass('liSelected');
              })
              data.movieDetails.forEach(function(detail){
                $('.movieInfo').append(
                                '<div class="col-sm-3 theaterName">'+
                                  '<p>'+detail.theaterName+'</p>'+
                                '</div>'+
                                '<div class="col-sm-9 movieTime '+detail.theaterName+'">'+
                                '</div>'+
                                '<hr>');
                  detail.timings.forEach(function(time){
                    $(`.${detail.theaterName}`).append( '<li id="'+detail.theaterName+'">'+time+'</li>')
                  })
              })
              /*
              on click of timing will book movie and display seats
              */
              $('.movieTime li').on('click',function(){
                var time = this.innerText;
                var movieName = this.id;
                timingDetail = new MovieSelectedSeat(movieName,time);
                $('.wrapper').append('<div class="notification seat hide">' +
                                      '<div class="notification-seat-wrapper">' +
                                        '<div class="closeButton">'+
                                          '<span class="glyphicon glyphicon-remove"></span>'+
                                        '</div>'+
                                        '<div class="settingChairWrapper">'+
                                          '<div class = "seatingPrice">Gold Member: $12 per seat</div>' +
                                          '<i class="col-sm-4"><img src="img/seat.png" id="seat1"></i>' +
                                          '<i class="col-sm-4"><img src="img/seat.png" id="seat2"></i>' +
                                          '<i class="col-sm-4"><img src="img/seat.png" id="seat3"></i>' +
                                          '<i class="col-sm-6"><img src="img/seat.png" id="seat4"></i>' +
                                          '<i class="col-sm-6"><img src="img/seat.png" id="seat5"></i>' +
                                          '<div class="screen col-sm-12">All Eyes This Way Please</div>' +
                                        '</div>'+
                                        '<div class="col-sm-12 ProceedBtn hide">' +
                                          '<button class="selectProceed btn btn-success">Proceed</button>' +
                                        '</div>' +
                                        '<div class="costCalculation hide">'+
                                          '<div class="totalCost-wrapper"></div>' +
                                          '<button class="confirmCostBtn btn btn-success">Confirm</button>' +
                                        '</div>'+
                                        '<div class="ticketBooked hide">'+
                                          '<div class="congrats">Congratulation. Your ticket(s) have been processed. Thank you for your purchase.</div>' +
                                          '<button class="confirmCostOk btn btn-success">Ok</button>' +
                                        '</div>'+
                                      '</div>' +
                                     '</div>')
                  var checkingSelectdSeat = function(){
                    var localStorageData = gettingData("selectedSeat");
                    if(localStorageData && localStorageData != null){
                      localStorageData.forEach(function(data){
                        if(data.movie == movieName && data.timing == time){
                          $(`img#${data.seat}`).attr("src","img/bookedseat.png");
                        }
                      })

                    }
                  }
                  checkingSelectdSeat();
                  $('.wrapper .seat').removeClass('hide');
                  $('.notification-seat-wrapper img').on('click', function(){
                    if($(this).attr("src") == "img/selectedSeat.png"){
                        $(this).attr("src", "img/seat.png");
                        seatSelection -= 1
                        // $('.ProceedBtn').addClass('hide');
                    } else {
                        $(this).attr("src", "img/selectedSeat.png");
                        seatSelection += 1
                        // $('.ProceedBtn').removeClass('hide');
                    }
                    if(seatSelection > 0){
                      $('.ProceedBtn').removeClass('hide');
                    }else{
                      $('.ProceedBtn').addClass('hide');
                    }
                  });
                  $('.ProceedBtn').on('click', function(){
                    $('.costCalculation').removeClass('hide');
                    $('.ProceedBtn').addClass('hide');
                    $('.settingChairWrapper').addClass('hide');
                    $('.totalCost-wrapper').text(`Total Tickest price is: $ ${seatSelection*12}`)
                  })
                  $('.closeButton').on('click',function(){
                    $('.wrapper .seat').addClass('hide');
                    seatSelection = 0;
                  })
                  $('.confirmCostBtn').on('click',function(){
                    var $j_object=[];
                    $('.costCalculation').addClass('hide');
                    $('.ticketBooked').removeClass('hide');
                    seats = $("img[src='img/selectedSeat.png']");
                    for(index=0; index < seats.length; index++){
                      timingDetail.seat.push(seats[index].id);
                    }
                    var localStorageData = gettingData("selectedSeat");
                    if(!localStorageData || localStorageData == null){
                      var arr = [];
                      arr.push(timingDetail)
                      storingData("selectedSeat", arr);
                    }else{
                      localStorageData.push(timingDetail);
                      storingData("selectedSeat", localStorageData);
                    }
                    $("img[src='img/selectedSeat.png']").attr("src","img/seat.png" )
                  })
                  $('.confirmCostOk').on('click',function(){
                    $('.ticketBooked').addClass('hide');
                    $('.seat').addClass('hide');
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if(currentUser){
                      $('.row').children().remove();
                      pageSelection('home');
                    }
                  })
                })

            }
        },[])
      }
    })
  }




  checkForCurrentUser();
  //slider code start here

  $(function () {
    var count = $("#slider > img").length
    var slider = 1
    var speed=2000
    var fadeSpeed = 200
    var loop
    start()
    $("#1").fadeIn(fadeSpeed);
    $('.right').click(right)
    $('.left').click(left)
    $('#slider').hover(stop,start)

    function start(){
        loop = setInterval(next, speed)
    }
    function stop(){
        clearInterval(loop)
    }
    function right() {
        stop()
        next()
        start()
        return false
    }

    function left() {
        stop()
        prev()
        start()
        return false
    }

    function prev() {
        slider--
        if (slider < 1) {
            slider = count
        }

        $("#slider > img").fadeOut(fadeSpeed)
        $("#" + slider).fadeIn(fadeSpeed)
    }

    function next() {
        slider++
        if (slider > count) {
            slider = 1
        }

        $("#slider > img").fadeOut(fadeSpeed)
        $("#" + slider).fadeIn(fadeSpeed)
    }
});
});
