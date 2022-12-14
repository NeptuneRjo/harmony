"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const models_1 = require("../models");
const passport_google_oauth2_1 = require("passport-google-oauth2");
require("dotenv/config");
/* GOOGLE STRATEGY */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.CALLBACK_URL;
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
}, function (request, accessToken, refreshToken, profile, done) {
    models_1.User.findOneAndUpdate({ googleId: profile.id }, {
        $set: {
            googleId: profile.id,
            picture: profile.picture,
            displayName: profile.displayName,
        },
    }, { upsert: true }, (err, user) => {
        return done(err, user);
    });
}));
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user);
});
passport_1.default.deserializeUser(function (id, cb) {
    models_1.User.findById(id, (err, user) => {
        cb(err, user);
    });
});
