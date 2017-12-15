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
var mobile_1 = require("../mobile");
var BaseItem = (function (_super) {
    __extends(BaseItem, _super);
    function BaseItem() {
        var _this = _super.call(this) || this;
        _this.amount = 1;
        _this.weight = -1;
        _this.stackable = false;
        _this.movable = false;
        return _this;
    }
    Object.defineProperty(BaseItem.prototype, "Movable", {
        get: function () {
            return this.movable;
        },
        set: function (movable) {
            this.movable = movable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "Amount", {
        get: function () {
            return this.amount;
        },
        set: function (amount) {
            this.amount = amount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "Weight", {
        get: function () {
            return this.weight;
        },
        set: function (weight) {
            this.weight = weight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "HeldBy", {
        get: function () {
            return this.heldBy;
        },
        set: function (mobile) {
            this.heldBy = mobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "Parent", {
        get: function () {
            return this.parent;
        },
        set: function (entity) {
            this.parent = entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "ParentAsItem", {
        get: function () {
            if (this.parent instanceof BaseItem) {
                return this.parent;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "ParentAsMobile", {
        get: function () {
            if (this.parent instanceof mobile_1.BaseMobile) {
                return this.parent;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "Stackable", {
        get: function () {
            return this.stackable;
        },
        set: function (value) {
            this.stackable = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseItem.prototype.CanEquip = function () {
        return false;
    };
    BaseItem.prototype.Consume = function (amount) {
        if (amount === void 0) { amount = 1; }
    };
    BaseItem.prototype.Decays = function () {
        return (this.Movable && this.Visible);
    };
    BaseItem.prototype.StackWith = function (from, dropped) {
        return false;
    };
    BaseItem.prototype.VerifyMove = function () {
        return this.movable;
    };
    return BaseItem;
}(Entity_1.Entity));
exports.BaseItem = BaseItem;
//# sourceMappingURL=BaseItem.js.map