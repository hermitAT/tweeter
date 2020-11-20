$(document).ready(function() {
 
  $('.compose').on('click', function(event) {
    // ^^ on click on compose button, slideToggle the form into view and toggle the .hidden class on the .new-tweet form. 
    // use find() and focus() to move cursor to textarea when form slides into view

    $('.new-tweet').slideToggle('slow');
    $('.new-tweet').toggleClass('hidden');
    $('.new-tweet').find('textarea').focus();
  });

});