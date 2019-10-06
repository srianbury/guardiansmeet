const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const saltRounds = 10;
// Use  db.students.find().skip(20).limit(20) for fetching more users
// Local Strategy for passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "username"
    },
    (username, password, done) => {
      //Match user
      User.findOne({ username: username })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "That username is not registered."
            });
          }

          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is incorrect." });
            }
          });
        })
        .catch(err => err);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

router.get("/userList", async (req, res) => {
  const count = await User.countDocuments();
  res.json({
    count
  });
});

router.post("/register", async (req, res) => {
  const { name, password, age, preference, bio, username } = req.body;
  const { file } = req.files;
  let profilePicture
  // Checks if name already exists
  const user = await User.findOne({ username });
  if (user) {
    res.json({
      err: true,
      msg: "Username already exists"
    });
  } else {
    //If name doesn't exist create a new one
    if (req.body.profilePicture) {
      await cloudinary.uploader.upload(
        file.path,
        { transformation: [{ width: 400, height: 400, radius: "max" }] },
        (err, image) => {
          profilePicture = image.url;
        }
      );
    } else {
      profilePicture = null
    }
    const newuser = new User({
      name,
      password,
      bio,
      preference,
      age,
      profilePicture,
      username
    });
    //Create a salt of the password to replace the plain text password to save to the database
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(newuser.password, salt, async (err, hash) => {
        if (err) {
          res.json({ err });
        } else {
          newuser.password = hash;
          await newuser.save();
          res.json({
            isAuthenticated: true
          });
        }
      });
    });
  }
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // passport uses the local strategy in the /config/passport file
    if (user) {
      // If there's a user sign a jsonwebtoken with their creds and send that back to the client
      jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            res.json({
              err
            });
          }
          res.json({
            token,
            user: {
              name: user.name,
              username: user.username,
              profilePicture: user.profilePicture,
              preference: user.preference,
              age: user.age,
              bio: user.bio,
              id: user._id
            }
          });
        }
      );
    } else {
      res.json({
        err: info
      });
    }
  })(req, res, next);
});

router.get("/fetchusers", async (req, res) => {
  let offset = req.query.offset;
  let username = req.query.username;
  let users;
  offset = parseInt(offset);
  if (username) {
    users = await User.find({
      username: { $ne: username }
    })
      .skip(offset)
      .limit(2);
  } else {
    users = await User.find()
      .skip(offset)
      .limit(2);
  }
  res.json({ users });
});
router.get("/refreshUser", async (req, res) => {
  let id = req.query.id;
  const user = await User.findOne({ _id: id });
  res.json({
    user: {
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture,
      preference: user.preference,
      age: user.age,
      bio: user.bio,
      id: user._id
    }
  });
});
router.get("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

module.exports = router;
