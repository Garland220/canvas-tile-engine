"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Version = (function () {
    function Version() {
        this.major = 0;
        this.minor = 0;
        this.patch = 0;
    }
    Version.prototype.toArray = function () {
        return [this.major, this.minor, this.patch];
    };
    Version.prototype.fromArray = function (arr) {
        if (arr.length === 3) {
            this.major = parseInt(arr[0], 10);
            this.minor = parseInt(arr[1], 10);
            this.patch = parseInt(arr[2], 10);
        }
    };
    Version.prototype.toString = function () {
        return this.major + '.' + this.minor + '.' + this.patch;
    };
    Version.prototype.fromString = function (string) {
        var arr = string.split('.');
        this.fromArray(arr);
    };
    return Version;
}());
exports.Version = Version;
//# sourceMappingURL=Version.js.map