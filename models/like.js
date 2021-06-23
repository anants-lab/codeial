const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    //This defines the Object Id of the liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    //Used for defining the type of liked object --> Dynamic referencing
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }

},{
    timestamps:true
});

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;