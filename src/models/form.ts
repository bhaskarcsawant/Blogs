import mongoose, { Document, Schema, Types } from "mongoose";

interface IForm extends Document {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  created_at: Date;
  updated_at: Date;
}


const formSchema: Schema<IForm> = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


const Form = mongoose.model<IForm>("Form", formSchema);

export default Form;
