
import mongoose from 'mongoose';
const blogSchema = {
  title: String,
  snippet: String,
  body:String

}
const blog = mongoose.model("blog",blogSchema);
export default blog;