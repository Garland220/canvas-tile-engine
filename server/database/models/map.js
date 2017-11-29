module.exports = function(db, cb) {
    let Map = db.define('map', {
      name: String,
      properties: String, // JSON
      tileData: String, // JSON
      tileSet: String,
      lastVisited: Date,
      lastUpdate: Date,
      version: Number
    }
}