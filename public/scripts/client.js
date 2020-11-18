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
            <button class="tweet" type="submit">F</button>
            <button class="tweet" type="submit">R</button>
            <button class="tweet" type="submit">L</button>
          </div>
        </footer>
      </article>
  `);
    // ^^ return for button implementation, unsure of date function implementation either

    return $tweet;
  };

  // test/driver code ~~~~
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  renderTweets(data);
  
});