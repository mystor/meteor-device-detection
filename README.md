# Meteor Device-Detection

Meteor Device-Detection is a smart package which features client-side device type detection & template switching with optional [meteor-router](https://github.com/tmeasday/meteor-router/) support.

An example which uses this package can be found [on github](https://github.com/Mystor/meteor-device-detection-example/), and can be seen in action at [device-detection.meteor.com](http://device-detection.meteor.com).

## Installation

Device-Detection is on [Atmosphere](http://atmosphere.meteor.com/), so you can install it very easily with [Meteorite](https://github.com/oortcloud/meteorite/).

``` sh
$ meteor add mystor:device-detection
```

> NOTE: Device-Detection has been updated to support 0.8.0 and Blaze. It's helpers will no longer function correctly on older versions of Meteor running Spark.

## Usage

### Detecting Devices

Meteor Device-Detection runs only on the client.

To determine the current type of device, you can call the following functions:

``` javascript
Meteor.Device.isTV();
Meteor.Device.isTablet();
Meteor.Device.isPhone();
Meteor.Device.isDesktop();
Meteor.Device.isBot();
```

If you are using Handlebars for templating, then they are also avaliable as handlebars helpers:

``` handlebars
{{#if isTV}}TV{{/if}}
{{#if isTablet}}Tablet{{/if}}
{{#if isPhone}}Phone{{/if}}
{{#if isDesktop}}Desktop{{/if}}
{{#if isBot}}Bot{{/if}}
```

### Detection Options

Meteor Device-Detection is based off of [express-device](https://github.com/rguerreiro/express-device), this means that it supports some of the same customization options.

You can set the following values in Javascript and then call `Meteor.Device.detectDevice();` to redetect the current device.

``` javascript
// These are the default values
Meteor.Device.emptyUserAgentDeviceName = 'desktop';
Meteor.Device.botUserAgentDeviceName = 'bot';
Meteor.Device.unknownUserAgentDeviceType = 'phone';

// Don't forget to re-detect the device!
Meteor.Device.detectDevice();
```

### User Preferences

If you are offering a different user experience to users who are on different devices, it is usually a good idea to offer them the option to change the experience which they are experiencing.  Device-Detection makes this easy by giving access to a few functions to set user preferences.

``` javascript
Meteor.Device.preferTV();
Meteor.Device.preferTablet();
Meteor.Device.preferPhone();
Meteor.Device.preferDesktop();
Meteor.Device.preferBot();

// Clear any preferences and re-analyze user-agent
Meteor.Device.clearPreference();
```

You can also get whether the user has a preference by calling

``` javascript
Meteor.Device.hasPreference();
```

### Templates

A common use case for device detection is to serve a different user experience to the user based on what their device type is.  This will often involve different templates to be displayed to the user.

Device-Detection provides a simple way to avoid ugly `{{#if isPhone}} ... {{/if}}` statements in your code, by using the `{{> deviceRender}}` helper!  

If you call the device render helper with a parameter (the parameter being the name of the template), the helper will first search for, and then render, a template with that name, as well as a suffix (`_tv` for TV, `_tablet` for Tablet, `_phone` for Phone, `_desktop` for Desktop, and `_bot` for a Bot).  If it cannot find that template it will instead render the template name without any suffix as a fallback.

``` html
<template name="body">
  <!-- This template will render the following
	tv:      the template "page"
	tablet:  the template "page"
	phone:   the template "page_phone"
	desktop: the template "page"
	bot:     the template "page"
  -->
  {{> deviceRender 'page'}}
</template>

<template name="page">
  <h1>Default Page</h1>
</template>

<template name="page_phone">
  <h1>Phone specific page</h1>
</template>
```

Naturally, you can customize the suffixes which you use:

``` javascript
Meteor.Device.setTVSuffix('_tv');
Meteor.Device.setTabletSuffix('_tablet');
Meteor.Device.setPhoneSuffix('_phone');
Meteor.Device.setDesktopSuffix('_desktop');
Meteor.Device.setBotSuffix('_bot');
```

#### Meteor-Router Integration

If you are using [meteor-router](https://github.com/tmeasday/meteor-router/), you can also call `{{> deviceRender}}` with no parameters.  If you do this, deviceRouter will default to using `Meteor.Router.page()` as the template name.

## Contributing

If you have any ideas on how to improve this project, or any bug fixes or corrections to make, plase fork and make a pull request.  I am always open to new improvements.

## License

(The MIT License)

Copyright (c) 2013 Michael Layzell

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
