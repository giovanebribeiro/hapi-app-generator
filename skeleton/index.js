(function(){
  "use strict";

  var pkg = require("./package.json");
  var debug = require("debug")(pkg.name + ":index.js");
  var confidence = require("confidence");
  var glue = require("glue");

  debug("*** Mounting the environment variables ***");
  var env = process.env.NODE_ENV || "development";
  var port = process.env.NODE_PORT || 3000;

  debug("*** Loading the manifest file ***");
  var manifestFile = require("./src/manifest.json");
  var store = new confidence.Store(manifestFile);
  var criteria = {
    env: env
  };
  var manifest = store.get("/", criteria);
  var connection = manifest.connections[0];
  connection.port = port;
  manifest.connections[0] = connection;
  if(env === "development"){
    if(!manifest.registrations){ manifest.registrations = []; }
    manifest.registrations.push({
      "plugin": { "register": "blipp" }
    });
  }

  debug("*** Loading the application ***");
  glue.compose(manifest, {relativeTo: __dirname + "/src/modules"}, function(err, server){
    if(err){
      debug("server.register error:", err);
      server.log("error", "server.register error: " + err);
      return 1;
    }

    debug("*** Starting the application ***");
    server.start(function(){
      server.log("info", "Server successfully started at http://"+server.info.host + ":" + server.info.port);
    });
  });

})();
