LIHTCMapper
===========

LIHTCMapper calculates the maximum tax credits a potential site could recieve if developed as a low income housing
property.

## Build Status

We use Snap for continuous integration. Click the build status button below for more info.

[![Build status](https://snap-ci.com/mveritym/LIHTCMapper/branch/master/build_image)](https://snap-ci.com/mveritym/LIHTCMapper/branch/master)

## Story Wall

We use Waffle.io for tracking our stories and progress, check it out here: https://waffle.io/mveritym/lihtcmapper  

## Tech Stack

* Angular.js
* Grunt
* Bower
* Karma
* Phantom.js
* Node.js & npm
* Ruby
* Compass
* Sass

## Getting Started

To get started on this project you'll need Ruby installed on your box, if you're on Mac OSX you should already have
this, type the following command into your console to check you have ruby installed:

```
ruby -v
```

Once you're good to go with Ruby, you'll need Compass and Sass, install like so:

```
gem update --system && gem install compass
```

Let's go ahead and install Phantom.js, you'll need this for running your headless functional tests:

```
brew install phantomjs
```

Next you'll need to install Node.js and npm, if you have brew you can install it using the following:

```
brew install node
```

Once this is done, you'll need to get Grunt, Bower and the Karma-Phantom.js-Launcher, run the following:

```
npm install -g grunt-cli
```

```
npm install -g bower
```

```
npm install karma-phantomjs-launcher --save-dev
```

And for Angular.js, everything else and to update your modules you can always run:

```
npm install
```

Finally you can pull in all your app dependencies using Bower, go ahead and run:

```
bower install
```

## Running

To run the app:

```
grunt serve
```

To run your unit tests:

```
grunt karma
```

To run your functional tests:

```
grunt test:e2e
```

To run all tests:

```
grunt test
```
