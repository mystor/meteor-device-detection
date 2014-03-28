Package.describe({
  summary: "Client-Side Device Type Detection & Template Switching with Optional Meteor-Router Support"
});

Package.on_use(function (api) {
  api.use(['meteor', 'underscore', 'deps', 'session', 'templating', 'ui'], 'client');

  api.add_files(['device_detection.js', 'device_helpers.js'], 'client');
});

