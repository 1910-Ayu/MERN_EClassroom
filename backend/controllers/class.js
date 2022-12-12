const User = require('../models/User');
const Class = require('../models/Class');
const mongoose = require('mongoose');

module.exports.createClass = async(req,res)=>{
    try{
        const{className,subject,room} = req.body;
        const existingClass = await Class.findOne({
            className,
            createdBy:req.user._id,
        });
        if(existingClass){
            const error = new Error(`Class with name ${className} already exists. Please try a different name`);
            error.code = 400;
            throw error;
        }
        const newClass = await Class.create({
            createdBy:req.user._id,
            className,
            subject,
            room,
            users:[req.user._id],
        });

        const user = await User.findById(req.user._id);

        user.createdClasses.push(newClass);
        await user.save();

        res.status(200).json({
            message:{
                class:newClass,
            }
        });
    }catch(err){
        res.status(500).json(err.message);
    }
}

module.exports.fetchClasses= async (req,res)=>{
    try {
        //fetching all the classes user has created/joined and populating required
        const userClasses = await User.findById(
          req.user.id,
          "createdClasses joinedClasses"
        )
          .populate([
            {
              path: "createdClasses",
              select: "createdBy subject className room createdAt",
              populate: {
                path: "createdBy",
                select: "_id name",
              },
            },
          ])
          .populate([
            {
              path: "joinedClasses",
              select: "createdBy subject className room createdAt",
              populate: {
                path: "createdBy",
                select: "_id name",
              },
            },
          ]);
        // .populate("createdClasses", "createdBy subject className room createdAt")
        // .populate("joinedClasses", "createdBy subject className room createdAt");
    
        userClasses.createdClasses.sort((a, b) => {
          if (
            new Date(a.createdAt).toISOString() >
            new Date(b.createdAt).toISOString()
          )
            return -1;
          else return 1;
        });
        userClasses.joinedClasses.sort((a, b) => {
          if (
            new Date(a.createdAt).toISOString() >
            new Date(b.createdAt).toISOString()
          )
            return -1;
          else return 1;
        });
    
        res.json({
          classes: userClasses,
        });
      } catch (err) {
        console.log(err.message);
        res.status(500).send("INTERNAL_SERVER_ERROR");
      }
};

module.exports.joinClass = async (req, res) => {
    try {
      const requestedClassId = req.body.classId;
  
      const isValidClassId = mongoose.Types.ObjectId(requestedClassId);
      if (!isValidClassId) {
        const error = new Error("INVALID_CLASS_ID");
        error.code = 404;
        throw error;
      }
      const requestedClass = await Class.findById(requestedClassId);
  
      //if requested class does not exist
      if (!requestedClass) {
        const error = new Error("INVALID_CLASS_ID");
        error.code = 404;
        throw error;
      }
  
      //check if the request is being made by the classroom's owner
      if (requestedClass.createdBy == req.user.id) {
        const error = new Error("USER_CLASSROOM_OWNER");
        error.code = 400;
        throw error;
      }
  
      const currentUser = await User.findById(req.user.id);
  
      //check if user has already joined the clasroom
      if (currentUser.joinedClasses.includes(requestedClassId)) {
        const error = new Error("USER_ALREADY_JOINED_CLASSROOM");
        error.code = 400;
        throw error;
      }
  
      //all checks are performed, now user can join the classroom
      currentUser.joinedClasses.push(requestedClass);
      currentUser.save();
  
      requestedClass.users.push(currentUser);
      requestedClass.save();
  
      res.json({
        joinedClass: requestedClass,
      });
    } catch (error) {
      if (error.code) {
        res.status(error.code).send(error.message);
      } else res.status(500).send("INTERNAL_SERVER_ERROR");
    }
  };

  module.exports.fetchClass = async (req, res) => {
    try {
      const classId = req.params.classId;
  
      const isValidClassId = mongoose.Types.ObjectId(classId);
  
      if (!isValidClassId) {
        const error = new Error("INVALID_CLASS_ID");
        error.code = 404;
        throw error;
      }
      const classDetails = await Class.findById(
        classId,
        "createdBy className subject room users"
      );
  
      if (!classDetails) {
        const error = new Error("INVALID_CLASS_ID");
        error.code = 404;
        throw error;
      }
  
      if (
        !classDetails.users.includes(req.user._id) &&
        !classDetails.createdBy.equals(req.user._id)
      ) {
        const error = new Error("INVALID_CLASS_ID");
        error.code = 404;
        throw error;
      }
  
      res.json({
        createdBy: classDetails.createdBy,
        className: classDetails.className,
        subject: classDetails.subject,
        room: classDetails.room,
      });
    } catch (error) {
        res.status(500).send(error.message);
    }
  };

  module.exports.fetchUsersInClass = async (req, res) => {
    try {
      const classId = req.params.classId;
      const isValidClassId = mongoose.Types.ObjectId.isValid(classId);
  
      if (!isValidClassId) {
        const error = new Error("INVALID_CLASS_ID");
        error.code = 404;
        throw error;
      }
  
      const usersInClass = await Class.findById(classId, "createdBy users")
        .populate("users", "email name picture _id")
        .populate("createdBy", "email name picture _id");
  
      if (!usersInClass) {
        const err = new Error("INVALID_CLASS_ID");
        err.code = 404;
        throw err;
      }
  
      res.json({
        data: {
          usersInClass,
        },
      });
    } catch (error) {
      if (error.code) {
        res.status(error.code).send(error.message);
      } else res.status(500).send(error.message);
    }
  };
  