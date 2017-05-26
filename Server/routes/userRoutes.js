import express from 'express';
import UserModel from '../models/userModel';

export default class UserRoute {
    constructor() {
    }

    _init() {
        let router = express.Router();
        router.use(function (req, res, next) {
            next();
        });

        router.get('/', this.getUsers);
        router.get('/:userName', this.getUserByFirstName);
        router.put('/:userId', this.updateUser);
        router.post('/', this.createUser);
        router.delete('/:userId', this.deleteUser);

        return router;
    }

    getUsers(req, res) {
        new UserModel().find({}, 'fName,lName, technology, location, _id', (error, docs) => {
            if (!error) {
                res.send(JSON.stringify(docs));
            }
        });
    }
    getUserByFirstName(req, res) {
        let userId = req.params.userName;
        new UserModel().find({ fName: { "$regex": userEnteredItem, "$options": "i" } }, (error, docs) => {
            if (!error) {
                res.send(JSON.stringify(docs));
            }
        });
    }
    createUser(req, res) {
        let payload = req.body;
        new UserModel().create({
            fName: payload.fName,
            lName: payload.lName,
            technology: payload.technology,
            location: payload.location
        }, (error, doc) => {
            if (!error) {
                res.send(JSON.stringify(doc));
            }
        });
    }
    updateUser(req, res) {
        let userId = req.params.userId;
        new UserModel().update({ _id: userId }, body.payload, {}, (error, doc) => {
            if (!error) {
                res.send('updated');
            }
        });
    }
    deleteUser(req, res) {
        let userId = req.params.userId;
        new UserModel().remove({ _id: userId }, (err) => {
            if (!err) {
                res.send('deleted');
            }
        });
    }

}
