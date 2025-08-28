const Query=require('../../models/query');

const getQueryById=async(req,res)=>{
    const {id}=req.params;
    try{
        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }
        res.json(query);
    }catch(error){
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports=getQueryById;