import * as massive from "massive";
import * as hapi from 'hapi';
import * as Path from 'path';

export interface MassiveOptions {
  connectionString: string
  models: any
}

export const plugin = {
  register: function (server: hapi.Server, options: MassiveOptions, next: Function) {
    massive.connect({
      connectionString: options.connectionString
    }, function (err, db) {
      if (err) {
        return next(err);
      }

        const models = options.models || {};

        // The addModel closure takes a model object and mutates the models variable with new data.
        // The
        const addModel = function (key, model,db) {
        model.db = 
        models[key] = model;

        server.expose(key, model);
      };

      Object.keys(models).forEach((key)=>{
        let modelPath = models[key];

        if (modelPath !== Path.resolve(modelPath)) {
            modelPath = Path.join(process.cwd(), modelPath);
        }

        addModel(key, require(modelPath),db)
      })

      server.expose("db", db);
      return next();
    });
  },
  attributes: {
    pkg: require("./package.json")
  }
}