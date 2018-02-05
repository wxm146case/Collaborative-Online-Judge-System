const ProblemModel = require('../models/problemModel');

const getProblems = function() {    
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, (err, problems) => {
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        });
    });
}


// get a problem with an id
const getProblem = function(id) {
return new Promise((resolve, reject) => {
        ProblemModel.findOne({id: id}, (err, problem) => {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
}

// add a problem
const addProblem = function(newProblem) {
return new Promise((resolve, reject) => {
    ProblemModel.findOne({name: newProblem.name}, (err, data) => {
        if (data) {
            reject('Problem already exists');
        } else {
            // save to mongo db
            ProblemModel.count({}, (err, count) => {
                newProblem.id = count + 1;
                const mongoProblem = new ProblemModel(newProblem);
                mongoProblem.save();
                resolve(mongoProblem);
            });
        }
        });
    });
}

module.exports = {
    getProblems,
    getProblem,
    addProblem
}