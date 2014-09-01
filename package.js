Package.describe({
  name: "mystor:device-detection",
  summary: "Client-Side Device Type Detection & Template Switching with Optional Meteor-Router Support",
  version: "0.2.0",
  git: "https://github.com/mystor/meteor-device-detection.git"
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.0');

  api.use(['meteor', 'underscore', 'deps', 'session', 'templating', 'ui'], 'client');

  api.add_files(['device_detection.js', 'device_helpers.js'], 'client');
});

