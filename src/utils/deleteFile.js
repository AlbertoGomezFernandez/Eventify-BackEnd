const cloudinary = require("cloudinary").v2;


const deleteFile = (url) => {

  const array = url.split("/");
  const name = array.at(-1).split(".")[0];

  const public_id = `${array.at(-2)}/${name}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image deleted successfully");

  });
};

module.exports = { deleteFile };