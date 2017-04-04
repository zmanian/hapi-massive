
import * as massive from "massive";
import * as hapi from 'hapi'


interface MassiveOptions{
  connectionString:string
}

exports.register = function(server:hapi.Server, options:MassiveOptions, next:Function){
  const config = options;

  massive.connect({
    connectionString: config.connectionString
  }, function(err, db){
    if(err){ return next(err); }

    server.expose("db", db);
    return next();
  });
};

exports.register.attributes = {
  pkg: require("./package.json")
};
