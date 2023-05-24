const config = require('../config');
const { HttpException } = require('../helpers');
class Server {
  async maintenanceExecutor(res, req, next) {
    try {
      if (!config.IS_MAINTENANCE_MODE) {
        return next();
      }
      throw HttpException.SERVICE_ARE_UNAVAILABLE(
        'Service Unavailable - Maintenance. We apologize for the inconvenience, but our service is currently undergoing maintenance or technical work. Please check back later.'
      );
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new Server();
