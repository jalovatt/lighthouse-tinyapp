# TinyApp

# Important note for evaluators!!!

One of your number had some trouble with spread operators crashing the app. We couldn't come up with a reason why - Node has supported object spreads for ages, all of our respective versions are new enough, and so forth.

I'm reworking the appropriate functions to remove them just for safety, so if you clone the project and have the same issue... well, obviously let me know. I should have a fix up later tonight (Nov. 3).

Thanks.

#


This project aims to replicate the behavior of URL-shortening sites like [https://goo.gl/](https://goo.gl/).

Once registered, users can shorten URLs, view URLs they've shortened along with visitor data for each, edit URLs, or delete them entirely.

![TinyApp](/assets/readme-screenshot.png)

## Usage

- Clone and `npm install` this repository.
- `npm start` to start the server (uses _nodemon_).
- Direct your web browser to [localhost:8080/](localhost:8080/)
- An example user account is provided - log in as `a@b.c`, password `abc`.