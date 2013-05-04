(function() {
  var devices = {
    tv: 'tv',
    tablet: 'tablet',
    phone: 'phone',
    desktop: 'desktop',
    bot: 'bot',
    no_preference: 'no_preference'
  };

  var Device = function() {
    // Constructor
    this._deps = new Deps.Dependency;
    this._type = devices.desktop;

    this._suffix_deps = {
      tv: new Deps.Dependency,
      tablet: new Deps.Dependency,
      phone: new Deps.Dependency,
      desktop: new Deps.Dependency,
      bot: new Deps.Dependency
    }

    this._suffix = {
      tv: '_tv',
      tablet: '_tablet',
      phone: '_phone',
      desktop: '_desktop',
      bot: '_bot'
    }

    this.emptyUserAgentDeviceType = devices.desktop;
    this.botUserAgentDeviceType = devices.bot;
    this.unknownUserAgentDeviceType = devices.phone;

    Session.setDefault('devices_user_type_preference', devices.no_preference);
  };

  /*
   * Setting Suffixes
   */
  Device.prototype.setSuffix = function(type, suffix) {
    this._suffix[type] = suffix;
    this._suffix_deps[type].changed();
  }

  // Helper Functions
  Device.prototype.setTVSuffix = function(suffix) {
    this.setSuffix(devices.tv, suffix);
  }

  Device.prototype.setTabletSuffix = function(suffix) {
    this.setSuffix(devices.tablet, suffix);
  }

  Device.prototype.setPhoneSuffix = function(suffix) {
    this.setSuffix(devices.phone, suffix);
  }

  Device.prototype.setDesktopSuffix = function(suffix) {
    this.setSuffix(devices.desktop, suffix);
  }

  Device.prototype.setBotSuffix = function(suffix) {
    this.setSuffix(devices.bot, suffix);
  }

  /*
   * Getting Suffixes
   */
  Device.prototype.getSuffix = function(type) {
    this._suffix_deps[type].depend();
    return this._suffix[type];
  }

  // Helper Functions
  Device.prototype.TVSuffix = function() {
    return getSuffix(devices.tv);
  }

  Device.prototype.TabletSuffix = function() {
    return getSuffix(devices.tablet);
  }

  Device.prototype.PhoneSuffix = function() {
    return getSuffix(devices.phone);
  }

  Device.prototype.DesktopSuffix = function() {
    return getSuffix(devices.desktop);
  }

  Device.prototype.BotSuffix = function() {
    return getSuffix(devices.bot);
  }

  /*
   * Setting Preferences
   */
  Device.prototype.setPreference = function(type) {
    this._type = type;
    Session.set('devices_user_type_preference', type);
    this._deps.changed();
  }

  Device.prototype.hasPreference = function() {
    return !Session.equals('devices_user_type_preference', devices.no_preference);
  }

  // Helper Functions
  Device.prototype.clearPreference = function() {
    this.setPreference(devices.no_preference);
    this.detectDevice();
  }

  Device.prototype.preferTV = function() {
    this.setPreference(devices.tv);
  }

  Device.prototype.preferTablet = function() {
    this.setPreference(devices.tablet);
  }

  Device.prototype.preferPhone = function() {
    this.setPreference(devices.phone);
  }

  Device.prototype.preferDesktop = function() {
    this.setPreference(devices.desktop);
  }

  Device.prototype.preferBot = function() {
    this.setPreference(devices.bot);
  }

  /*
   * Getting Type
   */
  Device.prototype.type = function() {
    this._deps.depend();
    return this._type;
  }

  Device.prototype.isType = function(type) {
    return type === this.type();
  }

  // Helper Functions
  Device.prototype.isTV = function() {
    this.isType(devices.tv);
  };

  Device.prototype.isTablet = function() {
    this.isType(devices.tablet);
  };

  Device.prototype.isPhone = function() {
    this.isType(devices.phone);
  };

  Device.prototype.isDesktop = function() {
    this.isType(devices.desktop);
  };

  Device.prototype.isBot = function() {
    this.isType(devices.bot);
  };

  /*
   * Automatically detect the type
   * Run when code first executes, can be run again later.
   * This will not overwrite user preferences
   */
  Device.prototype.detectDevice = function() {
    if (!Session.equals('devices_user_type_preference', devices.no_preference)) {
      // Don't override the user's preferences
      this._type = Session.get('devices_user_type_preference');
      this._deps.changed();
      return;
    }

    var ua = navigator.userAgent;
    var options = this;

    this._type = (function() {
      if (!ua || ua === '') {
        // No user agent
        return options.emptyUserAgentDeviceType||devices.desktop;
      }

      if (ua.match(/GoogleTV|SmartTV|Internet TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i)) {
        // if user agent is a smart TV - http://goo.gl/FocDk
        return devices.tv;
      } else if (ua.match(/Xbox|PLAYSTATION 3|Wii/i)) {
        // if user agent is a TV Based Gaming Console
        return devices.tv;
      } else if (ua.match(/iP(a|ro)d/i) || (ua.match(/tablet/i) && !ua.match(/RX-34/i)) || ua.match(/FOLIO/i)) {
        // if user agent is a Tablet
        return devices.tablet;
      } else if (ua.match(/Linux/i) && ua.match(/Android/i) && !ua.match(/Fennec|mobi|HTC Magic|HTCX06HT|Nexus One|SC-02B|fone 945/i)) {
        // if user agent is an Android Tablet
        return devices.tablet;
      } else if (ua.match(/Kindle/i) || (ua.match(/Mac OS/i) && ua.match(/Silk/i))) {
        // if user agent is a Kindle or Kindle Fire
        return devices.tablet;
      } else if (ua.match(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC( Flyer|_Flyer)|Sprint ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos S7|Dell Streak 7|Advent Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || (ua.match(/MB511/i) && ua.match(/RUTEM/i))) {
        // if user agent is a pre Android 3.0 Tablet
        return devices.tablet;
      } else if (ua.match(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google Wireless Transcoder/i)) {
        // if user agent is unique mobile User Agent
        return devices.phone;
      } else if (ua.match(/Opera/i) && ua.match(/Windows NT 5/i) && ua.match(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i)) {
        // if user agent is an odd Opera User Agent - http://goo.gl/nK90K
        return devices.phone;
      } else if ((ua.match(/Windows (NT|XP|ME|9)/) && !ua.match(/Phone/i)) && !ua.match(/Bot|Spider|ia_archiver|NewsGator/i) || ua.match(/Win( ?9|NT)/i)) {
        // if user agent is Windows Desktop
        return devices.desktop;
      } else if (ua.match(/Macintosh|PowerPC/i) && !ua.match(/Silk/i)) {
        // if agent is Mac Desktop
        return devices.desktop;
      } else if (ua.match(/Linux/i) && ua.match(/X11/i) && !ua.match(/Charlotte/i)) {
        // if user agent is a Linux Desktop
        return devices.desktop;
      } else if (ua.match(/CrOS/)) {
        // if user agent is a Chrome Book
        return devices.desktop;
      } else if (ua.match(/Solaris|SunOS|BSD/i)) {
        // if user agent is a Solaris, SunOS, BSD Desktop
        return devices.desktop;
      } else if (ua.match(/curl|Bot|B-O-T|Crawler|Spider|Spyder|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|Charlotte|NewsGator|TinEye|Cerberian|SearchSight|Zao|Scrubby|Qseero|PycURL|Pompos|oegp|SBIder|yoogliFetchAgent|yacy|webcollage|VYU2|voyager|updated|truwoGPS|StackRambler|Sqworm|silk|semanticdiscovery|ScoutJet|Nymesis|NetResearchServer|MVAClient|mogimogi|Mnogosearch|Arachmo|Accoona|holmes|htdig|ichiro|webis|LinkWalker|lwp-trivial/i) && !ua.match(/mobile|Playstation/i)) {
        // if user agent is a BOT/Crawler/Spider
        return options.botUserAgentDeviceType||devices.bot;
      } else {
        // Otherwise assume it is a mobile Device
        return options.unknownUserAgentDeviceType||devices.phone;
      }
    })();

    this._deps.changed();
  }


  Meteor.Device = new Device;
  Meteor.Device.detectDevice();
})();
