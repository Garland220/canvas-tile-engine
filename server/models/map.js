module.exports = function(db, cb)
{
    var Map = db.define('map', {
      name: String,
      music: String,
      tileData: String,
      lastVisited: Date,
      lastUpdate: Date,
    }
}