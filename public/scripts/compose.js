$(document).ready(function() {
 
  $('.compose').on('click', function(event) {

    $('.new-tweet').slideToggle('slow');
    $('.new-tweet').toggleClass('hidden');
    $('.new-tweet').find('textarea').focus();
  });

});