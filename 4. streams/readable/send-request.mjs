import http from "http";

http.get("http://localhost:3000", (res) => {
  res.on("data", (data) => {
    console.log("data ", data);
    console.log("data ", data.toString());
    console.log("data ", JSON.parse(data.toString()));
  });
});
