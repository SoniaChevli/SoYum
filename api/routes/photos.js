const express = require("express");
const router = express.Router();
const { photoSchema, Photo, validatePhoto } = require("../models/photo");

const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const photos = await Photo.find();
  res.send(photos);
});

router.get("/:id", async (req, res) => {
  const photo = await Photo.find(req.params.id);
  if (!photo)
    return res.status(404).send("The photo with the given id was not found");
  res.send(photo);
});

router.post("/", auth, async (req, res) => {
  const { error } = validatePhoto(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let photo = new Photo({
    restaurant: req.body.restaurant,
    photo: req.body.photo,
    author: { _id: req.user._id, name: req.user.name },
    city: req.body.city,
    description: req.body.description,
    tags: req.body.tags
  });

  await photo.save();
  res.send(photo);
});

module.exports = router;
