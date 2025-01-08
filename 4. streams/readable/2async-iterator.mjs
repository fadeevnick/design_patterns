async function main() {
  for await (const chunk of process.stdin) {
    console.log("New data available");
    console.log(`Chunk read: ${chunk.length}: ${chunk.toString()}`);
  }

  console.log("end of stream.");
}

main();
