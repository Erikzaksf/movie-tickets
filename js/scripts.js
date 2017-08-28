$(document).ready(function() {
  $('body').css('height' , $(window).innerHeight());
  $('.wrapper').css('height' , $('body').height()- $('.jumbotron').innerHeight());
})


var retrievedcredentials = [];
var credentials = {
  username: "",
  password: "",
  userType: "",
}


localStorage.setItem('credentials', JSON.stringify(credentials));

$(document).ready(function(){
  $("form#signUp").submit(function(event){
    event.preventDefault();
    var name = $('#newName').val();
    var password = $('#newPassword').val();
    var userType = $('#userType').val();
  });
});
