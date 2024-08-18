// const mongoose = require("mongoose")
// const {MONGOURI} = require('./Keys');
// mongoose.Promise = global.Promise;
// const Schema = mongoose.Schema
// mongoose.set("useCreateIndex", true)
// let schema = {
//     "user": {
//     "email": {
//         type: String,
//         required: true
//     },
//     "password": {
//         type: String,
//         required: true
//     }
//     },
//     "players":[{
//         "name":{
//             type:String,
//             required:true
//         },
//         "userId":{
//             type:String,
//             required:true
//         },
//         "runScored":[{
//             type:String,
//             required:true
//         }],
//         "teamsPlayedWith":[{
//             type:String
//         }],
//         "ballFaced":[{
//             type:String,
//             required:true
//         }],
//         "average":{
//             type:String,
//             required:true
//         },
//         "wicket":[{
//             type:String,
//             required:true
//         }],
//         "oversBowled":[{
//             type:String,
//             required:true
//         }],
//         "strikeRate":[{
//             type:String,
//             required:true
//         }],
//         "datePlayed":[{
//             "date" : {
//             type: Date,
//             default:new Date()
//         },
//         }]

//     }],

//     "match":[{
//         "matchName":{
//             type:String,
//             required:true
//         },
//         "dateofmatch":{
//             type:new Date(),
//             required:true
//         },
//         "teams": {
//             "teamA":[{
//                 "totalrun":{
//                     type:String,
//                     required:true
//                 },
//                 "totalOvers":{
//                     type:String,
//                     required:true
//                 },
//                 "teamName":{
//                     type:String,
//                     required:true
//                 },
//                 "players":[{
//                     "userId":{
//                         type:String,
//                         required:true
//                     }
//                 }],
//                 "date":[{
//                     type:new Date(),
//                     required:true
//                 }]
//             }],
//             "teamB":[{
//                  "totalrun":{
//                     type:String,
//                     required:true
//                 },
//                 "totalOvers":{
//                     type:String,
//                     required:true
//                 },
//                 "teamName":{
//                     type:String,
//                     required:true
//                 },
//                 "players":[{
//                     "userId":{
//                         type:String,
//                         required:true
//                     }
//                 }],
//                 "date":[{
//                     type:new Date(),
//                     required:true
//                 }]
//             }],
//             }
//     }],




// //     "name": {
// //         type: String,
// //         required: true
// //     },
// //     "address": {
// //         type: String,
// //         // required: true
// //     },
// //     "mobile": {
// //         type: String,
// //         required: true
// //     },
// //     "pincode": {
// //         type: String,
// //         // required: true
// //     },
// //     "city": {
// //         type: String,
// //         // required: true
// //     },
// //     "state": {
// //         type: String,
// //         // required: true
// //     },
// //     "My_Cart": [{
// //         "product_Id" : {type:Number,"default" : 0 },
// //     }],
// //     "Article_Purchased": [{
// //         "product_Id" : {type:Number,"default" : 0 },
// //     }],
// // },
// //     "renters_data":[{
// //         "product_Id" : {type:Number,"default" : 0 },
// //         "Title" : { type : String },
// //         "Description" : { type : String },
// //         "No_of_purchase" : { type : String },
// //         "cost" : { type : String },
// //         "image" : { type : String },
// //     }
// //     ]

// }

// let accountSchema = new Schema(schema, { collection: "Cricket", timestamps: true })
// let connection = {}
// connection.getCollection = () => {
//     // console.log("conectedssss");
//     return mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
//         // console.log("conected");
//         return db.model("rennterdb", accountSchema)
//     }).catch((err) => {
//         console.log(err.message);
//         let error = new Error("Could not connect to database")
//         error.status = 500
//         throw error
//     })
// }
// module.exports = connection




const mongoose = require("mongoose")
const { MONGOURI } = require('./Keys');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)
let schema = {
    "user": {
        "email": {
            type: String,
            required: true
        },
        "password": {
            type: String,
            required: true
        },
        "name": {
            type: String,
            required: true
        },
        "mobile": {
            type: String,
            required: true
        }
    },
    "players": [{
        "name": {
            type: String,
            required: true
        },
        "userId": {
            type: String,
            required: true
        },
        "profilePhotoUrl": {
            type: String,
        },
            "totalRunScored": {
                type: Number,
                default:0
            },
            "teamWinCounter": {
                type: Number,
                default:0
            },
            "totalballFaced": {
                type: Number,
                default:0
            },
            "average": {
                type: Number,
                default:0
            },
            "totalWicket": {
                type: Number,
                default:0
            },
            "totaloversBowled": {
                type: Number,
                default:0
            },
            "strikeRate": {
                type: Number,
                default:0
            },
            "outCounter":{
                type:Number,
                default:0
            },
            "totalRunsGone":{
                type:Number,
                default:0
            },
            "totalFours":{
                type:Number,
                default:0
            },
            "totalSixes":{
                type:Number,
                default:0
            },
            "datewiseSummry": [{

            }]
    }],

    "match": [{
        "matchId": {
            type: String,
            required: true
        },
        "matchName": {
            type: String,
            required: true
        },
        "dateofmatch": {
            type: Date,
            default: new Date()
        },
        "teamA": {
            "totalrun": {
                type: String,
                required: true
            },
            "totalOvers": {
                type: String,
                required: true
            },
            "teamName": {
                type: String,
                required: true
            },
            "wonMatch": {
                type: Boolean,
                required: false
            },
            "players": [{}],
            // "date": {
            //     type: Date,
            //     default: new Date()
            // }
        },
        "teamB": {
            "totalrun": {
                type: String,
                required: true
            },
            "totalOvers": {
                type: String,
                required: true
            },
            "teamName": {
                type: String,
                required: true
            },
            "wonMatch": {
                type: Boolean,
                required: false
            },
            "players": [{}],
            // "date": {
            //     type: Date,
            //     default: new Date()
            // }
        },

    }],

}

// q2Bg7CWBwpwMu7M0

// punkthebestest


let accountSchema = new Schema(schema, { collection: "Cricket", timestamps: true })
let connection = {}
connection.getCollection = () => {
    // console.log("conectedssss");s
    return mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
        // console.log("conected");
        return db.model("rennterdb", accountSchema)
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}
module.exports = connection