/**
 * Maintains the running average of numbers received during one server session.
 */
class AverageCalculator {
  constructor() {
    /** @type {number} */
    this.total = 0;
    /** @type {number} */
    this.count = 0;
  }

  /**
   * Adds a finite number and returns the new running average.
   *
   * @param {number} value - The number to include in the average.
   * @returns {number} The average of all numbers added so far.
   * @throws {TypeError} If value is not a finite number.
   */
  add(value) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError("value must be a finite number");
    }

    this.total += value;
    this.count += 1;
    return this.total / this.count;
  }

  /**
   * Returns the current number of values tracked.
   *
   * @returns {number} Count of submitted values.
   */
  getCount() {
    return this.count;
  }

  /**
   * Resets the running average state.
   *
   * @returns {void}
   */
  reset() {
    this.total = 0;
    this.count = 0;
  }
}

module.exports = AverageCalculator;
