const uploadImage = async (req, res, next) => {
  try {
    let image;
    if (req.file) {
      console.log(req.file);
      image = req.file.filename;
    }
    res.status(201).json({ image });
  } catch (error) {
    next(error);
  }
};
module.exports = { uploadImage };
