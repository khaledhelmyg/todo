const app = require("./src/app");
const { env, connectToMongoDb } = require("./src/config");

const PORT = env.PORT;
app.listen(PORT || 8000, (err) => {
  if (err) {
    console.error(err);
  }
  connectToMongoDb()
    .then(() => {
      console.info("connected to mongodb atlas");
      console.info(`Server running on ${env.APP_HOST}:${env.PORT}`);
    })
    .catch((_error) => {
      console.log(_error);
    });
});
