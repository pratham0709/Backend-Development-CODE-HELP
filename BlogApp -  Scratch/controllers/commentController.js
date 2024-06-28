const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
    try{
        // import post , user, body
        const {post, user, body} = req.body;

        // create object
        const comment = new Comment({
            post, user, body
        })

        const savedComment = await comment.save();

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true})
            .populate("comments").exec();

            res.status(200).json({
                post: updatedPost, 
            })
    }
    catch(error){
        return res.status(500).json({
            error: "Error while creating a comment",
        })
    }
}


// comment on existing post.....