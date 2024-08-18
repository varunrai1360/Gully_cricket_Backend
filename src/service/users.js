const Model = require('../model/users');
const service = {};


service.addUser = ( userObj ) => {
    // console.log(userObj)
    if(userObj.password && userObj.email && userObj.name && userObj.mobile)
       return Model.addUser(userObj);
    else {
        var error = new Error('Please Enter all details');
        error.status = 404;
        throw error;
    }
}


service.loginUser = (email,password) => {
    if(password && email)
       return Model.loginUser(email,password);
    else {
        var error = new Error('enter the email and password');
        error.status = 404;
        throw error;
    }
}


service.checkUser = (email,password) => {
    if(password && email)
       return Model.checkUser(email,password);
    else {
        var error = new Error('enter the email and password');
        error.status = 404;
        throw error;
    }
}


service.deleteall = (email,password) => {
    if(email && password)
       return Model.deleteall(email,password);
    else {
        var error = new Error('Deletion of data failed');
        error.status = 404;
        throw error;
    }
}

service.addPlayer = (name,email,profilePhotoUrl) => {
    if(name && email)
       return Model.addPlayer(name,email,profilePhotoUrl);
    else {
        var error = new Error('Player nt added');
        error.status = 404;
        throw error;
    }
}

service.addMatch = (Data) => {
    if(Data)
       return Model.addMatch(Data);
    else {
        var error = new Error('Error in ading the match details');
        error.status = 404;
        throw error;
    }
}

service.profiles = (email,userId) => {
    if(email)
       return Model.profiles(email,userId);
    else {
        var error = new Error('Please provide your email');
        error.status = 404;
        throw error;
    }
}


service.analytics = (id) => {
       return Model.analytics(id);
    
}

service.playerProfile = (id,userId) => {
    return Model.playerProfile(id,userId);
 
}

service.editPlayerProfile = (id,userId,data) => {
    return Model.editPlayerProfile(id,userId,data);
 
}

service.deletePlayerProfile = (id,userId,data) => {
    return Model.deletePlayerProfile(id,userId);
 
}

module.exports = service;