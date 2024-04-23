//=================find document==================

export const findDocument= async(model,query)=>{
    if (!model||!query) return {message:"invalid arguments ",status:400,success:false}

    const isDocumentExists=await model.findOne(query)
    if(!isDocumentExists) return {message:"document not found",status:404,success:false}
    return {message:"document found",isDocumentExists ,success:true }
} 
//===============create new document================
export const create_Message=async(module,data)=>{
    if (!module||!data) return {message:"invalid arguments ",status:400,success:false}
    const isDocumentCreate=await module.create(data)
    if(!isDocumentCreate) return {message:"document not found",status:400,success:false}
    return {message:"document create",isDocumentCreate ,success:true ,status:201}
}

//============delete existing document============
export const delete_Message=async(module,query)=>{
    if (!module||!query) return {message:"invalid arguments ",status:400,success:false}
    const isDocumentCreate=await module.findOneAndDelete(query)
    if(!isDocumentCreate) return {message:"document not found",status:400,success:false}
    return {message:"document create",isDocumentCreate ,success:true ,status:201}
}
 