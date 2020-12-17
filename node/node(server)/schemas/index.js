const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      "mongodb://localhost:27017/test",
      {
        dbName: "test"
      },
      error => {
        if (error) {
          console.log("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", error => {
    console.log("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
    connect();
  });
  require("../models/User");
  require("./board");
  require("./Form");
  require("./form2");
  require("./form4");
  require("./form5");
  require("./form6");

};
