export class Logger {
  static log(message) {
    console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
  }
}
