$(document).ready(function() {
  $('body').css('height' , $(window).innerHeight());
  $('.wrapper').css('height' , $('body').height()- $('.jumbotron').innerHeight());
})
