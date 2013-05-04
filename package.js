Package.describe({
  summary: "Client-side mobile detection and template swapping with meteor-router integration"
});

Package.on_use(function (api) {
  api.use('underscore', 'client');

  api.add_files(['mobile_helpers.js', 'mobile_detection.js'], 'client');
});
