if (typeof UI !== 'undefined') {
  /*
   * Template Rendering Shortcut
   */
  UI.registerHelper('deviceRender', function() {
    var name = this;
    if (! _.isString(name)) {
      // If meteor-router is installed, no passed name will load Meteor.Router.page()
      // or if IronRouter is used, use that instead for the template name.
      if (typeof Meteor.Router !== 'undefined') {
        name = Meteor.Router.page();
      } else if (typeof Router !== 'undefined') {
        var opts = Router.current().route.options;
        name = opts.template || opts.name || Router.current().route.path().slice(1);
      } else {
        name = '';
      }
    }

    var device_type = Meteor.Device.type();
    var suffix = Meteor.Device.getSuffix(device_type);

    var device_name = name + (suffix || '');

    if (Template[device_name]) {
      // Try to load the suffixed template
      return Template[device_name];
    } else if (Template[name]) {
      // Fallback to unsuffixed template if suffixed template doesn't exist
      return Template[name];
    } else {
      // Blaze gets grumpy if you return undefined
      return null;
    }
  });
  
  /*
   * Device Type Helpers
   */
  UI.registerHelper('isTV', function() {
    return Meteor.Device.isTV();
  });
  UI.registerHelper('isTablet', function() {
    return Meteor.Device.isTablet();
  });
  UI.registerHelper('isPhone', function() {
    return Meteor.Device.isPhone();
  });
  UI.registerHelper('isDesktop', function() {
    return Meteor.Device.isDesktop();
  });
  UI.registerHelper('isBot', function() {
    return Meteor.Device.isBot();
  });

  UI.registerHelper('device_type', function() {
    return Meteor.Device.type();
  });
}

