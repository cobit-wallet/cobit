var Zip  = require('archiver/lib/plugins/zip')
  , date = new Date(0)
  , mode = 0755

// Set static timestamp/mode and append to queue instead of actually appending to zip
Zip.prototype.append = function(source, data, cb) {
  (this._queue || (this._queue=[])).push([ source, Object.assign(data, { date, mode }) ]);
  cb();
}

// Sort queue, then actually append to zip, then finalize
Zip.prototype.finalize = function() {
  var engine = this.engine, q = this._queue, n;
  q.sort(function(a,b) { return a[1].name<b[1].name ? 1 : -1 });
  (function next(err) { if (err) throw err; (n=q.shift()) ? engine.entry(n[0], n[1], next) : engine.finalize() })();
}
