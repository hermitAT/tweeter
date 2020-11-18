/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const differenceInDays = function(date) {

  const dateToday = new Date();
  // ^^ create variable for today's date;

  const timeDifference = dateToday.getTime() - date.getTime();
  // ^^ find difference in milliseconds between the two dates

  const daysDifference =  timeDifference / (1000 * 3600 * 24);
  // ^^ calculate # of days between two days, accounting for conversion to seconds, minutes, and hours

  return daysDifference + " days ago.";
};

const createTweetElement = function(tweet) {

  const { user, content, created_at } = tweet;

  let $tweet = `
  <article>
    <div class="tweet-header">
      <div>
        <a>${user.avatars}</a>
        <a>${user.name}</a>
      </div>
      <a class="handle">${user.handle}</a>
    </div>
    <data class="tweet-body">${content.text}</data>
    <footer class="tweet-footer">
      <a>${differenceInDays(created_at)}d</a>
      <div class="tweet-buttons">
        <button type="submit">F</button>
        <button type="submit">R</button>
        <button type="submit">L</button>
      </div>
    </footer>
  </article>
  `;

  return $tweet;
};