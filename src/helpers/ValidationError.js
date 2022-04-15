class ValidationError extends Error {
  constructor(message, data = {}) {
    super(message);
    this.name = 'ValidationError';
    this.data = data;
  }
}

export default ValidationError;
