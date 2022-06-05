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

router.post('/', multer, sauceCtrl.createSauce);
router.post('/:id/like', multer, sauceCtrl.likeSauce);
router.put('/:id', multer, sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.get('/:id', sauceCtrl.getOneSauce);
router.get('/', sauceCtrl.getAllSauces);


// router.post('/ok', auth, multer, sauceCtrl.createSauce);


module.exports = router;