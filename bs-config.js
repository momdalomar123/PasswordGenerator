module.exports = {
  server: "./",
  files: "**/*",
  middleware: function (req, res, next) {
    res.setHeader("Cache-Control", "no-store");
    next();
  }
};