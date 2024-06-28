const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
    try{
        const {post, user} = req.body;

        const like = new Like({
            post, user,
        })

        // saved comment
        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes : savedLike._id}}, {new:true})
                .populate("likes").exec();

        res.status(200).json({
            post:updatedPost,
        })
    }
    catch(error){
        return res.status(500).json({
            error: "Error occur while Liking the post"
        })
    }
}

exports.unlikePost = async (req, res) => {
    try{
        const { post, like } = req.body;

        const deletedLike = await Like.findOneAndDelete({post: post, _id: like});

        const updatedPost = await Post.findByIdAndDelete(post, {$pull: {likes: deletedLike._id}}, {new:true})
            .populate("likes").exec();

            res.status(200).json({
                post: updatedPost,
            })
    }
    catch(error){
        res.status(500).json({
            error: "Error occur while unliking post"
        })
    }
}


exports.dummyLink = (req,res) => {
    res.send("This is dummy Page");
};