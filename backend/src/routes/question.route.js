const { Router } = require("express");
const { 
    addQuestion, 
    updateQuestion, 
    deleteQuestion, 
    getAllQuestions, 
    getQuestionsRelatedToUserSubscribedTags, 
    getUserQuestionHistory,
} = require("../controllers/question.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");


const router= Router();

router.route('/questions').get(getAllQuestions);

router.route('/addQuestion').post(verifyJWT,
    upload.fields([{ name: 'images', maxCount: 5}]),
    addQuestion );

router.route('/delete/:id'). delete(verifyJWT, deleteQuestion); 

router.route('/user-subscribed-tags').get(verifyJWT, getQuestionsRelatedToUserSubscribedTags);
router.route('/updateQuestion/:id').patch(verifyJWT,upload.fields([{ name: 'images', maxCount: 5}]),updateQuestion);


router.route('/user/history').get(verifyJWT, getUserQuestionHistory);

module.exports= router;
