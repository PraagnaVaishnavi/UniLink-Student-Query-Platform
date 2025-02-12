const express = require("express");
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails,
    updateUserDP,
    getUserUpvotes
} = require("../controllers/user.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");


// Add your routes here using `router`
const router = express.Router();

router.route("/register").post(
    upload.fields([
        {
            name: "profileImage",
            maxCount: 1
        }, 
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/user/upvotes").get(verifyJWT, getUserUpvotes);
router.route("/profileimage").patch(verifyJWT, upload.single("profileImage"), updateUserDP)

module.exports= router
