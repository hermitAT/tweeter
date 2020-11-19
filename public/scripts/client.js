/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const differenceInDays = function(created_at) {
  // create date objects from created_at value and today's date;
  const dateNow = new Date();
  const createdAtDate = new Date(created_at);
  const timeDiff = Math.abs(dateNow - createdAtDate);
  // ^^ find absolute integer between today's date and the date created at
  const differenceInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  // ^^ find difference in days by dividing timeDiff by milliseconds/seconds/minutes/hours
  // make sure to round to zero decimal places by using toFixed(0)

  return differenceInDays.toFixed(0) + " days ago";
};
// ^^ return to this function ...

const escape = function(string) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};
// ^^ escape function to prevent XSS ~~

$(document).ready(function() {

  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      // ^^ loop through array of tweet objects..
      let $tweetToAppend = createTweetElement(tweet);
      // ^^ pass each tweet through the createTweetElement function, and then append to container below..
      $('#tweet-container').append($tweetToAppend);
    }
  };

  const createTweetElement = function(tweet) {
    const { user, content, created_at } = tweet;
    // ^^ destructure object for shorter/more readable template literals

    let safeHTML = `<data>${escape(content.text)}</data>`;

    // using template created previously, add template literals to implement dynamic element creation
    const $tweet = $(`
      <article>
        <div class="user-data">
          <div class="profile">
            <img src=${user.avatars}/>
            <a>${user.name}</a>
          </div>
          <a class="handle">${user.handle}</a>
        </div>
        <div class="tweet-content">
          ${safeHTML}
        </div>
        <footer>
          <a>${differenceInDays(created_at)}</a>
          <div class="tweet-buttons">
            <button class="tweet" type="submit"><img src="./images/flag.png"></button>
            <button class="tweet" type="submit"><img src="./images/retweet.png"></button>
            <button class="tweet" type="submit"><img src="./images/heart.png"></button>
          </div>
        </footer>
      </article>
  `);
    // ^^ template used to dynamically create tweets...

    return $tweet;
  };

  const loadTweets = function() {

    $.ajax('/tweets')
      .then((res) => {
        renderTweets(res);
      });
  };
  // ~~~~~~~~~~~~ ^^ use AJAX to fetch tweets from the /tweets page ~~~~~~~~~~~~~~~~~

  loadTweets();

  // ~~~~~~~~~~~~ ^^ call function to load initial set of tweets to page ~~~~~~~~~~~~

  $('.submit').on('click', function(event) {

    event.preventDefault();
    // prevent default form submission behavior

    let $textarea = $(this).closest('form').find('#tweet-text');
    let $counter = $(this).closest('form').find('.counter');
    let $validationError = $(this).closest('form').find('h5');
    // ^^ create variables pointing to pieces the .next-tweet form, to allow for tweet creation from form input
    
    let $queryString = $textarea.serialize();
    let $tweetMsg = $textarea.val().trim();
    let $tweetLngth = $tweetMsg.length;
    // ^^ serialize into a query string for use by our server
    // find content/value in text form of textarea of the form, and find length of that text;

    // below are conditionals that check if textarea was empty, was over the maxChar limit, or if message is able to be posted.
    if ($tweetLngth === 0) {
      $validationError.text("Sorry, you can't send an empty tweet!").slideDown(500);
      $textarea.focus();
    } else if ($tweetLngth > 140) {
      $validationError.text("Sorry, your tweet exceeds our maximum character limit!").slideDown(500);
      $textarea.focus();
    } else {
      $.post("/tweets", $queryString)
        .done(function() {
          $('#tweet-container').empty();
          loadTweets();
        });
      // above code posts message to tweet if valid and code below sets form variables back to default...
      $validationError.text('');
      $textarea.val('').focus();
      $counter.text('140');
    }
  });
});