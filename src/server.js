const { createApp } = require("./app");

const PORT = Number(process.env.PORT) || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Ayurtech Average API running at http://localhost:${PORT}`);
  console.log("Endpoint: POST /average");
});
