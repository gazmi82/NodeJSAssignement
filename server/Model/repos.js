const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  stargazers_count: {
    type: String,
  },
});

module.exports = mongoose.model("repos", repoSchema);
