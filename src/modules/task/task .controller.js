import Task from "../../../DB/models/task.models.js";
import User from "../../../DB/models/user.model.js";

//1=========================Add task====================================

export const AddTask= async (req, res,next) => {

    const {title,description,deadline,status,assignTo}=req.body 
    const { _id:userID } = req.authUser
    const userExist=await User.findById({_id:userID})
    if(!userExist)return res.status(404).json({message:"user not found"}) //condition check user
    const checkAssignTo= Task.findOne({assignTo})
    if(!checkAssignTo)return res.status(404).json({message:"user assignTo not found"}) //condition check assignTo       
    const createdTask=await Task.create({title,description,deadline,status,userID,assignTo})
    if(!createdTask)return next (new Error ("created fail",{cause:400}))
    return res.status(201).json({message:"task created success"})

};

//2===========================updateTask================================
  
   export const updateTask= async (req, res,next) => {

    const {title,description,status,assignTo}=req.body 
    const { _id } = req.query;
    const { _id:userID } = req.authUser

    const userExist=await User.findById({_id:userID}) 
    if(!userExist)return res.status(404).json({message:"user not found"})  //condition check user
    
    const checkAssignTo=await Task.findOne({assignTo})
    if(!checkAssignTo)return res.status(404).json({message:"user assignTo not found"}) //condition check assignTo        
     
    const updatedTask = await Task.findByIdAndUpdate({_id},{
        title,description,status ,assignTo
    }, 
    {new: true}
    )

    if (!updatedTask) return next(new Error('update fail'))
    res.status(200).json({ message: 'done', updatedTask })
};

//3=============================deleteTask====================================

export const deleteTask= async (req, res,next) => {

    const { _id:userID } = req.authUser
    const { _id } = req.query;
    const userExist=await User.findById({_id:userID})
    if(!userExist)return res.status(404).json({message:"user not found"}) //condition check user
    
    const deleteTask = await Task.findByIdAndDelete({_id})

    if (!deleteTask) return next(new Error('deleteTask fail'))
    res.status(200).json({ message: 'done delete Task success' })
  
};

//4===============Get_Tasks_with_User_Data==================================== 
export const Get_Tasks_with_User_Data= async (req, res) => {
    const tasks = await Task.find().populate([{path:"userID"}]);
    res.status(200).json({ tasks });
};

//5=============================Get tasks of one user=========================
export const Get_Tasks_of_one_User= async (req, res) => {
    const { _id:userID } = req.authUser
    const tasks = await Task.find({userID }).populate([{path:"userID"}]);
    res.json(tasks);
};

//6 ===========Get all tasks not done after deadline==========================
export const Get_all_after_deadline= async (req, res) => {
   
    const tasks = await Task.find({ deadline: { $lt: new Date() }})
    console.log( new Date());
    res.json(tasks);
};











// export const Get_all_after_deadline= async (req, res) => {
   
//     const tasks = await Task.find({ status: { $ne: 'done' }, deadline: { $lt: new Date() }})
//     res.json(tasks);
// };

