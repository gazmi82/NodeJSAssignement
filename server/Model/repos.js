const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  html_url: {
    type: String,
    required: true,
  },
  stargazers_count: {
    type: Array,
  },
});

module.exports = mongoose.model("repos", repoSchema);
