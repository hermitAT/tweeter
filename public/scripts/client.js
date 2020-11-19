/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const differenceInDays = function(created_at) {

  const createdDate = new Date(created_at);
  // ^^ create Date object to represent the created_at milliseconds
  const createdDays = createdDate.getDay();
  // ^^ get number of days from created date object;
  return createdDays + " days ago";
};
// ^^ return to this function ...

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
          <data>${content.text}</data>
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

    $.ajax('http://localhost:8080/tweets')
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
    let $labelMsg = $(this).closest('form').find('label');
    // ^^ create variables pointing to pieces the .next-tweet form, to allow for tweet creation from form input
    
    let $queryString = $textarea.serialize();
    let $tweetMsg = $textarea.val();
    let $tweetLngth = $tweetMsg.length;
    // ^^ serialize into a query string for use by our server
    // find content/value in text form of textarea of the form, and find length of that text;

    // below are conditionals that check if textarea was empty, was over the maxChar limit, or if message is able to be posted.
    if ($tweetLngth === 0) {
      $labelMsg.text("Your tweet is empty...").toggle(true);
      $textarea.focus();
    } else if ($tweetLngth > 140) {
      $labelMsg.text("Your tweet exceeds the maximum character limit...").toggle(true);
      $textarea.focus();
    } else {
      $.ajax("/tweets", $queryString)
        .done(function() {
          console.log($queryString);
        });
      // above code posts message to tweet if valid and code below sets form variables back to default...
      $labelMsg.text('What are you humming about?').toggle(true);
      $textarea.val('').focus();
      $counter.text('140');
    }
  });
});