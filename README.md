# Meteor Mobile-Detection

Meteor Mobile is a simple smart package which runs on the client and determines whether the current device is mobile.

## Installation

Until Meteor Mobile-Detection is uploaded to the [Atmosphere](http://atmosphere.meteor.com/) repository, you can install it by copying this directory into the `packages` directory of your Meteor project.  You may have to create this directory.

``` sh
$ mkdir packages
$ cd packages
$ git clone https://github.com/mystor/meteor-mobile-detection.git mobile-detection
```

Once Meteor Mobile-Detection is on Atmosphere, Meteor Mobile-Detection will be installable with [Meteorite](https://github.com/oortcloud/meteorite/).

``` sh
$ mrt add mobile-detection
```

## Usage

Usage of Meteor Mobile-Detection is simple.  

To determine if the client is mobile:
``` javascript
Meteor.Mobile.isMobile
```

This is not reactive, so don't expect it to change if you do fancy shenanigans with the user agent.

To make it easier to do a common use case for mobile detection: template swapping, there are also some useful handlebars helpers.  To determine if the current device is mobile you can call:

``` handlebars
{{isMobile}}
```

Or, if you want to load a specific template by name, and the mobile version otherwise, you can call:

``` handlebars
{{renderMobile 'template_name'}}
```

The mobile version of the template is, by default, the template name followed by `-mobile`.  This can be customized by setting the `Meteor.Mobile.mobileSuffix` variable:

``` javascript
Meteor.Mobile.mobileSuffix = '-m';
```

In addition, if you have the excellent [meteor-router](https://github.com/tmeasday/meteor-router/) package installed, you can simply call:

``` handlebars
{{renderMobile}}
```

And `Meteor.Router.page()` will be loaded.



