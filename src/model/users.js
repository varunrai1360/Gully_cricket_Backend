//manish
const dbModel = require('../utilities/connection');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const modelDb = {}

// renterDb.generateId = (email) => {
//     return dbModel.getCollection().then((model) => {
//         // console.log("genertae");
//         return model.distinct("renters_data.booking_Id", {"authetication.email":email}).then((ids) => {
//            let gg;
//             console.log("genertae id  "+JSON.stringify(ids) + " * "+ isFinite(ids) + " * "+typeof(ids) + " * "+ids.length)
//             if( typeof(ids) != "undefined" && ids != null && ids.length != null && ids.length > 0){
//                 // console.log(" gghhh "+isFinite(ids))
//                 gg = ids[ids.length-1]
//             }
//             else {
//                gg=0
//             }
//             console.log("grn "+ gg)
//             return gg + 1;
//         })
//     })
// }


modelDb.setupDb = () => {
    let insertData = require('./setupDB.json');
    return dbModel.getCollection().then(model => {
        return model.deleteMany({}).then(deletedData => {
            return model.insertMany(insertData).then(data => {
                if (data) return data;
                else {
                    let err = new Error("setup failed")
                    err.status = 404
                    throw err
                }
            }).catch(err => {
                next(err)
            })
        }).catch(err => {
            next(err)
        })
    }).catch(err => {
        next(err)
    })

}


modelDb.addUser = (userObj) => {
    // console.log("*********",userObj.name)
    return dbModel.getCollection().then(model => {
        // console.log(renterObj.name);
        return model.findOne({ "user.email": userObj.email }, {}).then(renterobj => {
            if (renterobj != null) {
                let err = new Error("User exist sigunp with different account")
                err.status = 400
                throw err
            }
            else {

                return bcrypt.hash(userObj.password, saltRounds).then(hash => {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'finnbalor430@gmail.com',
                            pass: '261997mk'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });

                    var mailOptions = {
                        from: '" GullyCricket Team " <noreply@gmail.com>',
                        to: userObj.email,
                        subject: 'Successful signup to GullyCricket',
                        // text: 'That was easy!',
                        html:
                            `<!DOCTYPE>
                            <html>
                              <head>
                               
                                <title></title>
                                <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1">
                                <style>
                                  img {
                                    border: none;
                                    -ms-interpolation-mode: bicubic;
                                    max-width: 100%;
                                    height: auto !important;
                                  }
                                  body {
                                    color: #03324C;
                                    font-family: "arial";
                                    -webkit-font-smoothing: antialiased;
                                    font-size: 16px;
                                    line-height: 1.4;
                                    margin: 0;
                                    padding: 2px 0;
                                    -ms-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%;
                                  }
                                  .ExternalClass {
                                    width: 100%;
                                  }
                                  .ExternalClass {
                                    line-height: 100%;
                                  }
                                  body a {
                                    color: #2CE080;
                                    text-decoration: none;
                                  }
                                  body p {
                                    font-family: "arial";
                                    font-size: 16px;
                                    font-weight: normal;
                                    margin: 0;
                                    margin-bottom: 10px;
                                  }
                                  body ul {
                                    font-family: "arial";
                                    font-size: 16px;
                                    font-weight: normal;
                                    margin: 0;
                                    margin-bottom: 10px;
                                  }
                                  body ol {
                                    font-family: "arial";
                                    font-size: 16px;
                                    font-weight: normal;
                                    margin: 0;
                                    margin-bottom: 10px;
                                  }
                                  body p {
                                    line-height: 1.5em;
                                  }
                                  body ul {
                                    line-height: 1.75em;
                                  }
                                  body ol {
                                    line-height: 1.75em;
                                  }
                                  .logo{
                                  line-height: 125%;
                              align-items: center;
                              align-content: center;
                              text-align: center;
                              margin-top: 2px;
                              font-size: 60px;
                              margin-bottom: 49px;
                              font-family: sans-serif;
                              font-style: bold;
                              font-weight: 1000px;
                              /* background-color: #fff; */
                              height: 30px;
                              color: #2962FF;
                                  }
                                </style>
                              </head>
                              <body style='color: #03324C;background:#f8f9fa; font-family: "arial"; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.4; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; margin: 0; padding: 2px 0;'>
                                <h1>The GullyCricket Team</h1>
                              </body>
                            </html>
                            `

                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log("***",error)
                        } else {
                            console.log('Email sent: ' + info.response);


                        }
                    })

                    return model.insertMany({ "user.email": userObj.email, "user.password": hash, "user.name": userObj.name,"user.mobile": userObj.mobile }).then(data2 => {
                        if (data2)
                            return data2
                        else {
                            err = new Error("insertion failed")
                            err.status = 404
                            throw err
                        }

                    }).catch(err => {
                        throw err
                    })
                });
            }

        }).catch(err => {
            throw err
        })

    }).catch(err => {

        throw err
    })
}



// function isEmpty(obj) {
//     for (var prop in obj) {
//         if (obj.hasOwnProperty(prop)) {
//             return false;
//         }
//     }

//     return JSON.stringify(obj) === JSON.stringify({});
// }


modelDb.loginUser = (email, password) => {
    // console.log(email,password)
    return dbModel.getCollection().then(model => {
        return model.findOne({ "user.email": email }, {}).then(data2 => {
            if (data2 == null) {
                let err = new Error("user does not exist sigup first")
                err.status = 404
                throw err
            }
            else {
                return bcrypt.compare(password, data2.user.password).then(res => {
                    
                    if (res === true) {
                        return data2;

                    }
                    else {
                        let err = new Error("user does not exist sigup first")
                        throw err
                    }

                }).catch(err => {
                    throw err
                })
            }
        }).catch(err => {
            throw err
        })
    })
}


modelDb.checkUser = (email, password) => {
    // console.log(email,password)
    return dbModel.getCollection().then(model => {
        return model.findOne({ "user.email": email, "user.password": password }, {}).then(data2 => {
            if (data2 == null) {
                let err = new Error("user does not exist sigup first")
                err.status = 404
                throw err
            }
            else {
                // return bcrypt.compare(password, data2.user.password).then(res => {
                    
                //     if (res === true) {
                //         return data2;

                //     }
                //     else {
                //         let err = new Error("user does not exist sigup first")
                //         throw err
                //     }

                // }).catch(err => {
                //     throw err
                // })

                return data2
            }
        }).catch(err => {
            throw err
        })
    })
}

// const generatePassword = () => {
//     var length = 8,
//         charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//         retVal = "";
//     for (var i = 0, n = charset.length; i < length; ++i) {
//         retVal += charset.charAt(Math.floor(Math.random() * n));
//     }
//     return retVal;
// }




modelDb.allData = () => {
    return dbModel.getCollection().then(allrenterDetails => {
        return allrenterDetails.find({}, {}).then(renterObj => {
            if (renterObj)
                return renterObj;
            else
                return null;
        })
    })
}



modelDb.addPlayer = (name, email, profilePhotoUrl) => {

    return dbModel.getCollection().then(model => {
        return model.findOne({ "user.email": email }, {}).then(data2 => {
            if (data2 == null) {
                let err = new Error("user does not exist sigup first")
                err.status = 404
                throw err
            }
            else {
                return model.find({ "user.email": email }, { 'players.userId': 1 }).then(data3 => {
                    let data4 = (name.toLowerCase()).split(' ');
                    if (data4.length > 1) {
                        defaultUserId = data4[0] + '.' + data4[data4.length - 1];
                    }
                    else {
                        defaultUserId = data4[0];
                    }
                    let getData = JSON.stringify(data3[0].players);
                    getData = JSON.parse(getData)

                    let userIds = getData.map(item => item.userId);

                    let newArray = userIds.filter((item) => {
                        return item.substring(0, defaultUserId.length) == defaultUserId;
                    })
                    if (newArray.length == 0) {
                        var counter = '';
                    }
                    else {
                        let newArray1 = newArray.map((item) => {
                            if (item == defaultUserId) {
                                return item.replace(defaultUserId, '0');
                            }
                            return item.replace(defaultUserId, '');
                        })

                        let result = newArray1.map(i => Number(i));


                        var max = Math.max(...result);
                        var counter = max + 1;
                    }
                    if (counter != '' || counter != 0)
                        defaultUserId = data4[0] + '.' + data4[data4.length - 1] + "0" + counter;
                    else
                        defaultUserId = data4[0] + '.' + data4[data4.length - 1] + counter;

                    return model.updateMany({ "user.email": email }, {
                        $push: {
                            "players": {
                                "userId": defaultUserId,
                                "name": name,
                                "profilePhotoUrl": profilePhotoUrl
                            }
                        }
                    }).then(data => {
                        // console.log(data)

                       return model.findOne({ "user.email": email }, {}).then(data2 => {
                            if(data2 === null){
                                let err = new Error("Error in fetching the data")
                                err.status = 404
                                throw err
                            }
                            else
                            return data2
                       }).catch(err => {
                        throw err
                    })
                    })

                });
            }
        })

    })
}


const loopData1 = async (Data,model) =>{

    let totalRunScored = 0
    let teamWinCounter = 0
    let totalballFaced = 0
    let average = 0
    let totalWicket = 0
    let totaloversBowled = 0
    let strikeRate = 0
    let outCounter = 0
    let totalRunsGone = 0
    let totalFours = 0
    let totalSixes = 0
    let datewiseSummry = []


    for(let i=0;i<Data.data1.length;i++){
        let userId = Data.data1[i].userId;
        playerData =  await model.find({"user.email" : Data.email},{"players":1})
         
        //  then(playerData =>{

            let players_Data = playerData[0].players;

            for(let j=0;j<players_Data.length;j++){

                if(players_Data[j].userId == userId){

                    // console.log(Data.data1[i].notOut)

                    if(Data.data1[i].notOut == "true"){

                        totalRunScored = parseInt(Data.data1[i].runScored) + parseInt(players_Data[j].totalRunScored);
                        totalballFaced = parseInt(Data.data1[i].ballfaced) + parseInt(players_Data[j].totalballFaced);
                        totalWicket = parseInt(Data.data1[i].wicketTaken) + parseInt(players_Data[j].totalWicket);
                        totaloversBowled = parseInt(Data.data1[i].overBowled) + parseInt(players_Data[j].totaloversBowled);
                        totalRunsGone = parseInt(Data.data1[i].runsGone) + parseInt(players_Data[j].totalRunsGone);
                        totalFours = parseInt(Data.data1[i].fours) + parseInt(players_Data[j].totalFours);
                        totalSixes = parseInt(Data.data1[i].sixes) + parseInt(players_Data[j].totalSixes);
                        outCounter = parseInt(players_Data[j].outCounter);
                        teamWinCounter = parseInt(players_Data[j].teamWinCounter) + (Data.wonMatchA == "true" ? 1 : 0);
                        if(outCounter != 0)
                            average = totalRunScored/outCounter;
                        else
                            average = totalRunScored;
                        // console.log(strikeRate,totalRunScored,totalballFaced,'**')
                        if(totalballFaced != 0)
                            strikeRate = (totalRunScored/totalballFaced)*100;
                        else{
                            if(totalRunScored != 0){
                            let err = new Error("Run Scored without facing any ball error")
                            throw err
                            }
                            else
                            strikeRate = 0
                        }
                    }
                    else{
                        totalRunScored = parseInt(Data.data1[i].runScored) + parseInt(players_Data[j].totalRunScored);
                        totalballFaced = parseInt(Data.data1[i].ballfaced) + parseInt(players_Data[j].totalballFaced);
                        totalWicket = parseInt(Data.data1[i].wicketTaken) + parseInt(players_Data[j].totalWicket);
                        totaloversBowled = parseInt(Data.data1[i].overBowled) + parseInt(players_Data[j].totaloversBowled);
                        totalRunsGone = parseInt(Data.data1[i].runsGone) + parseInt(players_Data[j].totalRunsGone);
                        totalFours = parseInt(Data.data1[i].fours) + parseInt(players_Data[j].totalFours);
                        totalSixes = parseInt(Data.data1[i].sixes) + parseInt(players_Data[j].totalSixes);
                        outCounter = parseInt(players_Data[j].outCounter) + 1;
                        teamWinCounter = parseInt(players_Data[j].teamWinCounter) + (Data.wonMatchA == "true" ? 1 : 0);
                        if(outCounter != 0)
                            average = totalRunScored/outCounter;
                        else
                            average = totalRunScored;
                            // console.log(strikeRate,totalRunScored,totalballFaced,'**')
                        
                        if(totalballFaced != 0){
                            strikeRate = (totalRunScored/totalballFaced)*100;
                            // console.log(strikeRate,totalRunScored,totalballFaced,'****')
                        }
                        else{
                            if(totalRunScored != 0){
                                let err = new Error("Run Scored without facing any ball error")
                                throw err
                                }
                                else
                                strikeRate = 0
                        }
                    }
                    playerDateWiseSummry = players_Data[j].datewiseSummry
                    // console.log(playerData[j],'datewise')

                    if(playerDateWiseSummry.length > 0)
                        datewiseSummry = [...playerDateWiseSummry,Data.data1[i]]
                    else
                    datewiseSummry = Data.data1[i]
                }
            }

            data = await model.updateMany({ "user.email": Data.email, "players.userId":userId}, 
            {
                $set:{
                "players.$.totalRunScored":totalRunScored,
                "players.$.totalballFaced":totalballFaced,
                "players.$.totalWicket":totalWicket,
                "players.$.totaloversBowled":totaloversBowled,
                "players.$.totalRunsGone":totalRunsGone,
                "players.$.outCounter":outCounter,
                "players.$.teamWinCounter":teamWinCounter,
                "players.$.average":average,
                "players.$.totalFours":totalFours,
                "players.$.totalSixes":totalSixes,
                "players.$.strikeRate":strikeRate,
                "players.$.datewiseSummry":datewiseSummry
            }
        }
        )
        // console.log(data)
        if(data.nModified == 0)
        {
            let err = new Error(" Error in Inserting teamA Data ")
            throw err
        }
        // .then(data=>{
        //         // console.log("********** ",JSON.stringify(data))
        //         // if(data.nModified == 0){
        //         //     let err = new Error(" Error in Inserting teamA Data ")
        //         //     throw err
        //         // }
        //         // else return data.nModified
        //         return data
        //     }).catch(err =>{
        //         throw err;
        //     })
        // })
    }
    return 1

}

const loopData2 = async (Data,model) =>{


    let totalRunScored = 0
    let teamWinCounter = 0
    let totalballFaced = 0
    let average = 0
    let totalWicket = 0
    let totaloversBowled = 0
    let strikeRate = 0
    let outCounter = 0
    let totalRunsGone = 0
    let totalFours = 0
    let totalSixes = 0
    let datewiseSummry = []

    for(let i=0;i<Data.data2.length;i++){
        let userId = Data.data2[i].userId;
        playerData = await model.find({"user.email" : Data.email},{"players":1})
        
        // .then(playerData =>{


            let players_Data = playerData[0].players;
            
            for(let j=0;j<players_Data.length;j++){

                if(players_Data[j].userId == userId){

                    if(Data.data2[i].notOut == "true"){

                        totalRunScored = parseInt(Data.data2[i].runScored) + parseInt(players_Data[j].totalRunScored);
                        totalballFaced = parseInt(Data.data2[i].ballfaced) + parseInt(players_Data[j].totalballFaced);
                        totalWicket = parseInt(Data.data2[i].wicketTaken) + parseInt(players_Data[j].totalWicket);
                        totaloversBowled = parseInt(Data.data2[i].overBowled) + parseInt(players_Data[j].totaloversBowled);
                        totalRunsGone = parseInt(Data.data2[i].runsGone) + parseInt(players_Data[j].totalRunsGone);
                        totalFours = parseInt(Data.data2[i].fours) + parseInt(players_Data[j].totalFours);
                        totalSixes = parseInt(Data.data2[i].sixes) + parseInt(players_Data[j].totalSixes);
                        outCounter = parseInt(players_Data[j].outCounter);
                        teamWinCounter = parseInt(players_Data[j].teamWinCounter) + (Data.wonMatchB == "true" ? 1 : 0);
                        if(outCounter != 0)
                            average = totalRunScored/outCounter;
                        else
                            average = totalRunScored;
                        // console.log(strikeRate,totalRunScored,totalballFaced,'**B')
                        
                        if(totalballFaced != 0){
                            strikeRate = (totalRunScored/totalballFaced)*100;
                            // console.log(strikeRate,totalRunScored,totalballFaced,'**B')
                        }
                        else{
                            if(totalRunScored != 0){
                                let err = new Error("Run Scored without facing any ball error")
                                throw err
                                }
                                else
                                strikeRate = 0
                        }
                    }
                    else{
                        totalRunScored = parseInt(Data.data2[i].runScored) + parseInt(players_Data[j].totalRunScored);
                        totalballFaced = parseInt(Data.data2[i].ballfaced) + parseInt(players_Data[j].totalballFaced);
                        totalWicket = parseInt(Data.data2[i].wicketTaken) + parseInt(players_Data[j].totalWicket);
                        totaloversBowled = parseInt(Data.data2[i].overBowled) + parseInt(players_Data[j].totaloversBowled);
                        totalRunsGone = parseInt(Data.data2[i].runsGone) + parseInt(players_Data[j].totalRunsGone);
                        totalFours = parseInt(Data.data2[i].fours) + parseInt(players_Data[j].totalFours);
                        totalSixes = parseInt(Data.data2[i].sixes) + parseInt(players_Data[j].totalSixes);
                        outCounter = parseInt(players_Data[j].outCounter) + 1;
                        teamWinCounter = parseInt(players_Data[j].teamWinCounter) + (Data.wonMatchB == "true" ? 1 : 0);
                        if(outCounter != 0)
                            average = totalRunScored/outCounter;
                        else
                            average = totalRunScored;
                        
                            // console.log(strikeRate,totalRunScored,totalballFaced,'****B')
                    
                        if(totalballFaced != 0){
                            strikeRate = (totalRunScored/totalballFaced)*100;
                            // console.log(strikeRate,totalRunScored,totalballFaced,'****B')

                        }
                        else{
                            if(totalRunScored != 0){
                                let err = new Error("Run Scored without facing any ball error")
                                throw err
                                }
                                else
                                strikeRate = 0
                        }

                    }
                    // datewiseSummry = [...playerData[j].datewiseSummry,Data.data2[i]] 
                    playerDateWiseSummry = players_Data[j].datewiseSummry
                    if(playerDateWiseSummry.length > 0)
                        datewiseSummry = [...playerDateWiseSummry,Data.data2[i]]
                    else
                    datewiseSummry = Data.data2[i]
                }
            }

            data = await model.updateMany({ "user.email": Data.email, "players.userId":userId}, 
            {
                $set:{
                "players.$.totalRunScored":totalRunScored,
                "players.$.totalballFaced":totalballFaced,
                "players.$.totalWicket":totalWicket,
                "players.$.totaloversBowled":totaloversBowled,
                "players.$.totalRunsGone":totalRunsGone,
                "players.$.outCounter":outCounter,
                "players.$.teamWinCounter":teamWinCounter,
                "players.$.average":average,
                "players.$.totalFours":totalFours,
                "players.$.totalSixes":totalSixes,
                "players.$.strikeRate":strikeRate,
                "players.$.datewiseSummry":datewiseSummry
            }
        }
        )
        // console.log(data)
        if(data.nModified == 0)
        {
            let err = new Error(" Error in Inserting teamB Data ")
            throw err
        }
        
        // .then(data=>{
        //         // if(data.nModified == 0){
        //         //     let err = new Error(" Error in Inserting teamB Data ")
        //         //     throw err
        //         // }
        //         // else data.nModified
        //         return data
                
        //     }).catch(err =>{
        //         throw err;
        //     })
        // })
    }
return 1
}


modelDb.addMatch = async (Data) => {
     model = await dbModel.getCollection()
     data2 = await model.findOne({ "user.email": Data.email }, {})
    if (data2 == null) {
        let err = new Error("user does not exist sigup first")
        err.status = 404
        throw err
    }
    else {
        const matchId = Date.now();
         matchDetails = await model.updateMany({ "user.email": Data.email }, {
            $push: {
                "match": {
                    "matchId": matchId,
                    "matchName": Data.matchName,
                    "dateofmatch": new Date(),
                    "teamA.totalrun": Data.totalrunA,
                    "teamA.totalOvers": Data.totalOversA,
                    "teamA.teamName": Data.teamNameA,
                    "teamA.players": Data.data1,
                    "teamA.wonMatch": Data.wonMatchA,
                    "teamB.totalrun": Data.totalrunB,
                    "teamB.totalOvers": Data.totalOversB,
                    "teamB.teamName": Data.teamNameB,
                    "teamB.wonMatch": Data.wonMatchB,
                    "teamB.players": Data.data2 
                }
            }
        },
        )
        if(matchDetails.nModified != 0){
            modified1 = await loopData1(Data,model)
            modified2 = await loopData2(Data,model)
        // console.log(modified1.nModified,modified2.nModified)
            if(modified1 > 0 && modified2 > 0 ){
            data = model.findOne({ "user.email": Data.email }, {})
                    if(data === null){
                        let err = new Error("Error in fetching the data")
                        err.status = 404
                        throw err
                    }
                    else
                        return data
              
            }
            else{
                let err = new Error("Error in Inserting player data")
                err.status = 404
                throw err
            }


        }
        else{
            let err = new Error("Error in adding match Detais")
            err.status = 404
            throw err
        }

    }
}

        // return model.findOne({ "user.email": Data.email }, {}).then(data2 => {
        //     if (data2 == null) {
        //         let err = new Error("user does not exist sigup first")
        //         err.status = 404
        //         throw err
        //     }
        //     else {
        //         const matchId = Date.now();
        //         // let players1_userId = []
        //         // let players2_userId = []
        //         // for(let i=0;i<(Data.data1).length;i++){
        //         //     players1_userId.push(Data.data1[i].userId);
        //         // }
        //         // for(let i=0;i<(Data.data2).length;i++){
        //         //     players2_userId.push(Data.data2[i].userId);
        //         // }

        //         return model.updateMany({ "user.email": Data.email }, {
        //             $push: {
        //                 "match": {
        //                     "matchId": matchId,
        //                     "matchName": Data.matchName,
        //                     "dateofmatch": new Date(),
        //                     "teamA.totalrun": Data.totalrunA,
        //                     "teamA.totalOvers": Data.totalOversA,
        //                     "teamA.teamName": Data.teamNameA,
        //                     "teamA.players": Data.data1,
        //                     "teamA.wonMatch": Data.wonMatchA,
        //                     "teamB.totalrun": Data.totalrunB,
        //                     "teamB.totalOvers": Data.totalOversB,
        //                     "teamB.teamName": Data.teamNameB,
        //                     "teamB.wonMatch": Data.wonMatchB,
        //                     "teamB.players": Data.data2 
        //                 }
        //             }
        //         },
        //         ).then(data => {
        //             if (data.nModified != 0) {

        //                 let totalRunScored = 0
        //                 let teamWinCounter = 0
        //                 let totalballFaced = 0
        //                 let average = 0
        //                 let totalWicket = 0
        //                 let totaloversBowled = 0
        //                 let strikeRate = 0
        //                 let outCounter = 0
        //                 let totalRunsGone = 0
        //                 let totalFours = 0
        //                 let totalSixes = 0
        //                 let datewiseSummry = []

        //                 // Adding players data 
        //                 modified1 = await loopData1(Data,model)
        //                 modified2 = await loopData2(Data,model)

        //                 if(modified1 > 0 && modified2 > 0 ){
        //                     return model.findOne({ "user.email": Data.email }, {}).then(data2 => {
        //                         if(data2 === null){
        //                             let err = new Error("Error in fetching the data")
        //                             err.status = 404
        //                             throw err
        //                         }
        //                         else
        //                             return data2
        //                    }).catch(err => {
        //                     throw err
        //                 });
        //                 }
        //                 else{
        //                     let err = new Error("Error in fetching the data")
        //                     err.status = 404
        //                     throw err
        //                 }


                        




                        
        //             }
        //             else {
        //                 let err = new Error("Error in adding match data")
        //                 err.status = 404
        //                 throw err
        //             }
        //         }).catch(err =>{
        //             throw err;
        //         })
        //     }
        // }).catch(err =>{
        //     throw err;
        // })

    // })




/*
Added some changes
modelDb.addPlayer = (name ,email) => {
    return dbModel.getCollection().then(model => {
        return model.findOne({ "user.email": email }, {}).then(data2 => {
            if(data2==null){
                let err = new Error("user does not exist sigup first")
                err.status = 404
                throw err
            }
            else{
                
                return model.updateMany({ "user.email": email },{ $push: {"players": {
                    "userId":1,
                    "name":  name
                }}}).then(data =>{
                    return data;
                })
            }
        })

    })
}
*/


modelDb.profiles = (email,userId) => {
    return dbModel.getCollection().then(model => {
        return model.find({"user.email":email,"players.userId":userId},{"players":1}).then(playerData => {
           
            let data = playerData[0].players
            for(let i=0;i<data.length;i++){
                if(data[i].userId == userId)
                    return data[i];
            }
            
            return null;
        })
    })
}


modelDb.analytics = (id) => {
    return dbModel.getCollection().then(model => {
        return model.find({"_id":id},{"players":1}).then(playerData => {
           
            // let data = playerData[0].players
            // for(let i=0;i<data.length;i++){
            //     if(data[i].userId == userId)
            //         return data[i];
            // }
            
            return playerData;
        }).catch(()=>{
            let err = new Error("Profile does not exist")
            err.status = 404
            throw err
        })
    })
}



modelDb.playerProfile = (id,userId) => {
    return dbModel.getCollection().then(model => {
        return model.find({"_id":userId},{players: {$elemMatch: {_id: id}}}).then(playerData => {
            return playerData;
        }).catch(()=>{
            let err = new Error("Profile does not exist")
            err.status = 404
            throw err
        })
    })
}


modelDb.editPlayerProfile = (id,userId,data) => {
    return dbModel.getCollection().then(model => {
        return model.updateMany({ "_id": userId, "players._id":id}, 
        {
            $set:{
            "players.$.name":data.name,
            "players.$.profilePhotoUrl":data.profilePhotoUrl,
        }
    }).then(data =>{
        if(data.nModified > 0){
            return model.find({"_id":userId},{}).then(data =>{
                if(data)
                    return data
                else{
                    let err = new Error("Some Error occurred")
                    err.status = 500
                    throw err
                }
            })
        }
        else{
            let err = new Error("Some Error occurred")
            err.status = 500
            throw err
        }
    })
    
    
    .catch(()=>{
            let err = new Error("Profile does not exist")
            err.status = 404
            throw err
        })
    })
}



modelDb.deletePlayerProfile = (id,userId) => {
    return dbModel.getCollection().then(model => {
        return model.update({ "_id": userId}, 
        {
            $pull:{
            'players': {'_id':id}
        }
    }).then(data =>{
        if(data.nModified > 0){
            return model.find({"_id":userId},{}).then(data =>{
                if(data)
                    return data
                else{
                    let err = new Error("Some Error occurred")
                    err.status = 500
                    throw err
                }
            })
        }
        else{
            let err = new Error("Some Error occurred")
            err.status = 500
            throw err
        }
    })
    
    
    .catch(()=>{
            let err = new Error("Profile does not exist")
            err.status = 404
            throw err
        })
    })
}

// Comenting for
//
// modelDb.profiles = (email,userId) => {
//     return dbModel.getCollection().then(model => {
//         return model.find({"user.email":email,"players.userId":userId},{"players":1}).then(playerData => {
           
//             let data = playerData[0].players
//             for(let i=0;i<data.length;i++){
//                 if(data[i].userId == userId)
//                     return data[i];
//             }
            
//             return null;
//         })
//     })
// }


module.exports = modelDb;
