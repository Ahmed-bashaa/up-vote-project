import joi from "joi"
export const AddTaskScheme={
    body:joi.object({
        title:joi.string().alphanum(),
        description:joi.string(),
        deadline:joi.date() ,
        status:joi.string(),
        assignTo:joi.string().hex().length(24)
    }),
    headers:joi.object({
        _id:joi.string().hex().length(24).required()    
    
    })
}
//==========================================================================
export const updatedTaskScheme={
    body:joi.object({
        title:joi.string().alphanum(),
        description:joi.string(),
        deadline:joi.date() ,
        status:joi.string(),
        assignTo:joi.string().hex().length(24)
    }),
    query:joi.object({
        _id:joi.string().hex().length(24)    
    
    }),
    headers:joi.object({
        _id:joi.string().hex().length(24).required()    
    
    }),
}
//=======================================================
export const deletedTaskScheme={
    query:joi.object({
        _id:joi.string().hex().length(24)    
    
    }),
    headers:joi.object({
        _id:joi.string().hex().length(24).required()    
    
    }),
}
//================Get_Tasks_of_one_User====================================
export const Get_Tasks_of_one_User_Scheme={
    headers:joi.object({
        _id:joi.string().hex().length(24).required()    
    
    }),
}

