const express = require("express");
const AverageCalculator = require("./average-calculator");

/**
 * Creates an Express application with an isolated running-average calculator.
 * A new app factory instance is useful for independent tests.
 *
 * @returns {import("express").Express} Configured Express application.
 */
function createApp() {
  const app = express();
  const calculator = new AverageCalculator();

  app.use(express.json({ limit: "10kb" }));

  /**
   * Adds the submitted number and responds with the running average.
   *
   * @param {import("express").Request} req - Incoming HTTP request.
   * @param {import("express").Response} res - Outgoing HTTP response.
   * @returns {void}
   */
  app.post("/average", (req, res) => {
    const { number } = req.body ?? {};

    if (typeof number !== "number" || !Number.isFinite(number)) {
      res.status(400).json({
        error: "Invalid input",
        message: "Request body must contain a finite numeric 'number' field.",
        example: { number: 10 }
      });
      return;
    }

    const average = calculator.add(number);
    res.status(200).json({
      average,
      count: calculator.getCount()
    });
  });

  // Keep malformed JSON and other parsing errors in a consistent JSON format.
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
      res.status(400).json({
        error: "Invalid JSON",
        message: "Request body must be valid JSON."
      });
      return;
    }

    if (err) {
      res.status(500).json({
        error: "Internal server error",
        message: "An unexpected error occurred."
      });
      return;
    }

    next();
  });

  return app;
}

module.exports = { createApp };
