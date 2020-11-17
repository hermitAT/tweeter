$(document).ready(function() {

  $('#tweet-text').on('input', function(event) {
    
    let $text = $(this).val();
    let $charLeft = 140 - $text.length;
    // get value of text entered in textarea, get the length of that text, && subtract that value from 140
    console.log($charLeft);

    let $updateCount = $(this).closest("form").find(".counter");
    $updateCount.text($charLeft);
    // ^^ find counter within parent element, set the counter-text to equal the computed value

    if ($charLeft <= 0) {
      $updateCount.addClass("red-font");
    } else {
      $updateCount.removeClass("red-font");
    }
    // ^^ if text exceeds the 140char limit, charsLeft < 0 -- add class that changes font colour to red OR remove class, based on changes in input
    
  });
});