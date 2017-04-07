import * as massive from "massive";
import * as hapi from 'hapi';
import * as Path from 'path';


export interface MassiveOption<T extends massive.Massive>{
  connectionString: string;
  models: Model<T>;
}

export class Model<T extends massive.Massive>{
    static modelName:string;
    db: T;
    properties:any;
    constructor(doc:any,db:massive.Massive){
      this.db = db as T;
      Object.keys(doc).forEach((key)=>{
        this.properties[key] = doc.key
      })
    }
    static create(document:any,db:massive.Massive,cb:Function){
      db.saveDoc(typeof(this),document,(err:Error,doc:any)=>{
        if (err){
          cb(err,null)
        }
        cb(null,new this(doc,db))
      });
    }
    
}   

export const plugin = {
  register: function<T extends massive.Massive>(server: hapi.Server, options: MassiveOption<T>, next: Function) {
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