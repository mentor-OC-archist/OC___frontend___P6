const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// const multer = require('../middleware/multer-config_');

// router.use((req,res,next)=>{
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     req.auth = {userId}
// })

router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, multer, sauceCtrl.likeSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);


// router.post('/ok', auth, multer, sauceCtrl.createSauce);


module.exports = router;