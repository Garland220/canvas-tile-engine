"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = require("../Entity");
var BaseMobile = (function (_super) {
    __extends(BaseMobile, _super);
    function BaseMobile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.alive = false;
        _this.flying = false;
        _this.swimming = false;
        _this.dazed = false;
        _this.frozen = false;
        _this.paralyzed = false;
        _this.canMove = true;
        _this.canFly = false;
        _this.canSwim = false;
        _this.invulnerable = false;
        return _this;
    }
    Object.defineProperty(BaseMobile.prototype, "Alive", {
        get: function () {
            return this.alive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "Dazed", {
        get: function () {
            return this.dazed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "Flying", {
        get: function () {
            return this.flying;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "Frozen", {
        get: function () {
            return this.frozen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "Swimming", {
        get: function () {
            return this.swimming;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "Paralyzed", {
        get: function () {
            return this.paralyzed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "Invulnerable", {
        get: function () {
            return this.invulnerable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "CanMove", {
        get: function () {
            return (this.canMove &&
                !this.frozen &&
                !this.paralyzed);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "CanFly", {
        get: function () {
            return (this.canFly &&
                !this.frozen &&
                !this.paralyzed);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "CanSwim", {
        get: function () {
            return (this.canSwim &&
                !this.frozen &&
                !this.paralyzed);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "CanRun", {
        get: function () {
            return !this.dazed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMobile.prototype, "CanBeDamaged", {
        get: function () {
            return !this.invulnerable;
        },
        enumerable: true,
        configurable: true
    });
    BaseMobile.prototype.CheckMove = function (direction) {
        return false;
    };
    return BaseMobile;
}(Entity_1.Entity));
exports.BaseMobile = BaseMobile;
//# sourceMappingURL=BaseMobile.js.map