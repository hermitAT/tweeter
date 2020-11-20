# Tweeter Project

Tweeter is a simple, single-page AJAX-based Twitter clone that uses JavaScript, jQuery, HTML and SASS/CSS on the client-side, along with Node, Express and MongoDB on the server-side.

Tweeter offers a responsive design that allows the single-page application to flow smoothly between screen resolutions, allowing users to have a similar experience no matter the size of their screen. Features include a toggle, which when clicked brings a form into view and focus, used to compose new tweets and post them into the container, refreshing the form and the tweet container once the post passes validation. When cursor hovers over tweets, they are given some highlight effects and the @handle is revealed along with some buttons.

## Screenshots

!["Screnshot of app used on desktop resolution."](https://github.com/hermitAT/tweeter/blob/master/docs/app-desktop.png?raw=true)
!["Screenshot of app using hover feature on tweets."](https://github.com/hermitAT/tweeter/blob/master/docs/app-hover-feature.png?raw=true)
!["Screenshot of app used on tablet resolution, also showcasing the counter feature to aid in tweet validation."](https://github.com/hermitAT/tweeter/blob/master/docs/app-tablet-with-counter.png?raw=true)


## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express 4.13.4
- Node 5.10.x or above
- Body-parser 1.15.2
- Chance 1.0.2
- md5 2.1.0
