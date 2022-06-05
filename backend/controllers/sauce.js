const fs = require('fs');
const Sauce = require('../models/Sauce');


exports.likeSauce = (req, res, next) => {
}
exports.createSauce = (req, res, next) => {
  console.log(req.body.sauce);
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id
  const sauce = new Sauce({
    ...sauceObject
    , imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    , usersDisliked: []
    , usersLiked: []
    , likes: 0
    , dislikes: 0
  })
  // const sauce = new Sauce({
  //   title: req.body.title,
  //   description: req.body.description,
  //   imageUrl: req.body.imageUrl,
  //   price: req.body.price,
  //   userId: req.body.userId
  // });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        message: error
      })
    }
  )
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      console.log(sauce);
      sauce.usersLiked=[]
      console.log(sauce);
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file 
    ? {
      ...JSON.parse(req.body.thing), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    : {...req.body}
  // const thing = new Sauce({
  //   _id: req.params.id,
  //   title: req.body.title,
  //   description: req.body.description,
  //   imageUrl: req.body.imageUrl,
  //   price: req.body.price,
  //   userId: req.body.userId
  // });
  Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id}).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            if (!sauce) {
                console.log("error, no 'sauce' have been returned");
                res.status(404).json({
                    error: new Error('No such Sauce!')
                });
            }
            else if (sauce.userId !== req.auth.userId) {
                console.log("error, userId doesn't match\nthing.userId: "+sauce.userId+" --- req.auth.userId: "+req.auth.userId);
                res.status(400).json({
                    error: new Error('Unauthorized request!')
                });
            }
            else{
                console.log("oh heyn its good, it did match!\nthing.userId: "+sauce.userId+" --- req.auth.userId: "+req.auth.userId);
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                  Sauce.deleteOne({ _id: req.params.id })
                    .then(
                        () => {
                            res.status(200).json({
                                message: 'Deleted!'
                            });
                        }
                    ).catch(
                        (error) => {
                            res.status(400).json({
                                error: error
                            });
                        }
                    );
                })
            }
        }
    )
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      console.log(sauces);
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};