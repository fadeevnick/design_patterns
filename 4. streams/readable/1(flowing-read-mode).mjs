process.stdin
  .on("data", (data) => {
    console.log("data is ", data);
  })
  .on("end", () => {
    console.log("stream finished");
  });
