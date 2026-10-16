const numberArg = process.argv[2];

if (numberArg === undefined || numberArg.trim() === "") {
  console.error("Usage: npm run client -- <number>");
  process.exit(1);
}

const number = Number(numberArg);

if (!Number.isFinite(number)) {
  console.error("Please provide a finite number, for example: npm run client -- 12.5");
  process.exit(1);
}

async function submitNumber() {
  try {
    const response = await fetch("http://localhost:3000/average", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number })
    });

    const result = await response.json();
    console.log(`HTTP ${response.status}`);
    console.log(JSON.stringify(result, null, 2));

    if (!response.ok) process.exitCode = 1;
  } catch (error) {
    console.error("Could not reach the API. Start it first with: npm start");
    process.exitCode = 1;
  }
}

submitNumber();
