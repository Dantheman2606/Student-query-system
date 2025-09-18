const Query=require('../../models/query');

const deleteQueryById=async(req,res)=>{
    const {id}=req.params;
    const userId=req.user.id;

    try{
        const query=await Query.findById(id);
        if(!query){
            return res.status(404).json({message:'Query not found'});
        }
        if(query.userId.toString()!==userId){
            return res.status(403).json({message:'You are not authorized to delete this query'});
        }
        await Query.findByIdAndDelete(id);
        return res.status(200).json({message:'Query deleted successfully'});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:'Server error'});
    }
}

module.exports=deleteQueryById;