import mongoose, {Schema, model} from "mongoose";


const postsSchema = new Schema({
	title: {type: String, require: true},
	body: {type: String, require: true},
	urlImag: {type: String, require: true},
	views: {type: String, require: false},

},
{versionKey: false, timeseries: false, timestamps: true}
)

// export const PostsModel = model('posts', postsSchema);
export const Posts = mongoose.models.posts || mongoose.model("posts", postsSchema );