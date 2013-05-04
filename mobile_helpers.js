if (typeof Handlebars !== 'undefined') {
  Handlebars.registerHelper('isMobile', function() {
    return Meteor.Mobile.isMobile;
  });

  Handlebars.registerHelper('renderMobile', function(name, options) {
    // Meteor-Router integration.  If you pass no name, will use Meteor.Router.page
    if (! _.isString(name)) {
      if (typeof Meteor.Router !== 'undefined') {
        name = Meteor.Router.page();
      } else {
        name = '';
      }
    }

    if (Meteor.Mobile.isMobile) {
      var mobile_name = name + (Meteor.Mobile.mobileSuffix || '');

      // Only render mobile template if it exists, otherwise fall back
      if (Template[mobile_name])
        return new Handlebars.SafeStrong(Template[mobile_name]());
    }

    if (Template[name])
      return new Handlebars.SafeString(Template[name]());
  });
}
