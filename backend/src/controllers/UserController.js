const Follows = require("../models/Follows");
const Post = require("../models/Post");
const User = require("../models/User")
const mongoose = require("mongoose");
const connectToDb = require("../config/database/db");
mongoose.set("debug", true);

class UserController {
  
  async getAllUser(req, res) {
    try {
      connectToDb();

      const recentPostsArray = await User.aggregate([
        //sort by latest sent message
        {
          $sort: {
            updateAt: -1,
          },
        },
      ]);

      const postExplores = recentPostsArray.length > 0 ? recentPostsArray : [];
      console.log("recommentPost", postExplores);

      res.json({
        recommentPost: postExplores,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getChatHistory(req, res) {
    try {
      connectToDb();

      const { senderEmail, recipentEmail } = req.query;

      console.log(typeof email);
      // const message = new Message({
      //     recipentEmail: "Baonguyen2@gmail.com",
      //     senderEmail: "Baonguyen1@gmail.com",

      //     content: "MU Vodoi 3",
      //     sendAt:Date(),
      //     isDeleted: false
      // })

      // console.log(message)

      // await message.save()
      console.log("senderEmail", senderEmail);
      console.log("type", typeof senderEmail);

      const chatHistoryArray = await Message.aggregate([
        //get all recieved messages
        {
          $match: {
            $expr: {
              $or: [
                {
                  recipentEmail: recipentEmail,
                  senderEmail: senderEmail,
                  isDeleted: false,
                },
                {
                  recipentEmail: senderEmail,
                  senderEmail: recipentEmail,
                  isDeleted: false,
                },
              ],
            },
          },
        },
        {
          $addFields: {
            isSender: { $eq: ["$senderEmail", senderEmail] },
          },
        },
        //sort by latest sent message
        {
          $sort: {
            sendAt: 1,
          },
        },
        {
          $limit: 10,
        },
        // {
        //     '$group': {
        //         '_id': null,
        //         'isSender': {'$first': '$isSender'},
        //         'content': {'$first': '$content'},
        //         'timeStamp': {'$first': '$sendAt'}
        //     }
        // }
      ]);

      const chatHistory = chatHistoryArray.length > 0 ? chatHistoryArray : [];

      console.log("chatHistory", chatHistory);

      res.json({
        chatHistory: chatHistory,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async saveMessage(req, res) {
    try {
      connectToDb();
      const { senderEmail, recipentEmail, content } = req.query;

      const newMessage = new Message({
        senderEmail: senderEmail,
        recipentEmail: recipentEmail,
        content: content,
        sendAt: new Date(),
      });

      await newMessage.save();

      return res.status(200);
    } catch (e) {
      console.log("Some erros happen", e);
    }
  }

  // async getRencentMessage(req,res) {
  //     try {
  //         connectToDb()

  //     } catch(e) {
  //         console.log("Some errors happen", e)
  //     }
  // }
}

module.exports = new UserController();
