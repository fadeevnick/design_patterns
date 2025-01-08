process.stdin
  // .setEncoding("utf-8")
  .on("readable", () => {
    let chunk;
    console.log("New data available");

    while ((chunk = process.stdin.read()) !== null) {
      console.log(`Chunk read: ${chunk.length} ${chunk.toString()}`);
      console.log("chunk in", chunk);
      console.log("typeof ", typeof chunk);
    }
  })
  .on("end", () => console.log("End of stream"));
