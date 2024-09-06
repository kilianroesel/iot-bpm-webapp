import mongoose from "mongoose";
import mongodb from "../config/mongoClient";

const baseModelSchema = new mongoose.Schema({
  }, {timestamps: true});
  
const BaseModel = mongodb.model('BaseModel', baseModelSchema, 'models');
export default BaseModel;