import * as massive from "massive";
import * as hapi from 'hapi'


export interface MassiveOptions {
  connectionString: string
}

export const plugin = {
  register: function (server: hapi.Server, options: MassiveOptions, next: Function) {
    const config = options;

    massive.connect({
      connectionString: config.connectionString
    }, function (err, db) {
      if (err) {
        return next(err);
      }

      server.expose("db", db);
      return next();
    });
  },
  attributes: {
    pkg: require("./package.json")
  }
}