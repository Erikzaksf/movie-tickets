$(document).ready(function() {
  $('body').css('height' , $(window).innerHeight());
  $('.wrapper').css('height' , $('body').height()- $('.jumbotron').innerHeight());
})


var newUser = [];

function credentials(name, password, userType) {
  this.name = name;
  this.password = password;
  this.userType = userType;
}

var credentials = {
  username: "",
  password: "",
  userType: "",
}


localStorage.setItem('credentials', JSON.stringify(credentials));

$(document).ready(function(){
  $("form#signUp").submit(function(event){
    event.preventDefault();
    debugger
    //var newUser = new credentials( $('#newName').val(), $('#newPassword').val() , $('#userType').val());
    localStorage.setItem('.name', JSON.stringify(name));
  });
});
