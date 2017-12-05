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
var Point2D = (function () {
    function Point2D(x, y) {
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Point2D.prototype, "X", {
        get: function () {
            return this.x;
        },
        set: function (x) {
            this.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point2D.prototype, "Y", {
        get: function () {
            return this.y;
        },
        set: function (y) {
            this.y = y;
        },
        enumerable: true,
        configurable: true
    });
    Point2D.prototype.Clone = function () {
        return new Point2D(this.X, this.Y);
    };
    Point2D.prototype.Add = function (point) {
        this.X += point.X;
        this.Y += point.Y;
    };
    Point2D.prototype.Subtract = function (point) {
        this.X -= point.X;
        this.Y -= point.Y;
    };
    Point2D.prototype.Distance = function (point) {
        var z = point.Z || 0;
        return Math.sqrt(Math.pow(this.X - point.X, 2) + Math.pow(this.Y - point.Y, 2) + Math.pow(0 - z, 2));
    };
    Point2D.prototype.isEqual = function (point) {
        return (point.X === this.X && point.Y === this.Y);
    };
    Point2D.prototype.toJSON = function () {
        var json = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                json[key] = this[key];
            }
        }
        return json;
    };
    Point2D.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Point2D.Zero = new Point2D(0, 0);
    return Point2D;
}());
exports.Point2D = Point2D;
var Point3D = (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z) {
        var _this = _super.call(this, x, y) || this;
        _this.z = z;
        return _this;
    }
    Object.defineProperty(Point3D.prototype, "Z", {
        get: function () {
            return this.z;
        },
        set: function (z) {
            this.z = z;
        },
        enumerable: true,
        configurable: true
    });
    Point3D.prototype.Clone = function () {
        return new Point3D(this.X, this.Y, this.Z);
    };
    Point3D.prototype.Add = function (point) {
        this.X += point.X;
        this.Y += point.Y;
        if (point.Z) {
            this.Z += point.Z;
        }
    };
    Point3D.prototype.Subtract = function (point) {
        this.X -= point.X;
        this.Y -= point.Y;
        if (point.Z) {
            this.Z -= point.Z;
        }
    };
    Point3D.prototype.Distance = function (point) {
        var z = point.Z || 0;
        return Math.sqrt(Math.pow(this.X - point.X, 2) + Math.pow(this.Y - point.Y, 2) + Math.pow(this.Z - z, 2));
    };
    Point3D.prototype.isEqual = function (point) {
        if (point.Z && point.Z !== this.Z) {
            return false;
        }
        return (point.X === this.X && point.Y === this.Y);
    };
    Point3D.prototype.toJSON = function () {
        var json = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                json[key] = this[key];
            }
        }
        return json;
    };
    Point3D.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Point3D.Zero = new Point3D(0, 0, 0);
    return Point3D;
}(Point2D));
exports.Point3D = Point3D;
var Rectangle2D = (function () {
    function Rectangle2D(start, end) {
        this.start = new Point2D(start.X, start.Y);
        this.end = new Point2D(end.X, end.Y);
        ;
    }
    Object.defineProperty(Rectangle2D.prototype, "Start", {
        get: function () {
            return this.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle2D.prototype, "End", {
        get: function () {
            return this.end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle2D.prototype, "Width", {
        get: function () {
            return this.end.X - this.start.X;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle2D.prototype, "Height", {
        get: function () {
            return this.end.Y - this.end.Y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle2D.prototype, "Center", {
        get: function () {
            return new Point2D(this.start.X + (this.Width / 2), this.start.Y + (this.Height / 2));
        },
        enumerable: true,
        configurable: true
    });
    Rectangle2D.prototype.Contains = function (point) {
        return (this.start.X <= point.X &&
            this.start.Y <= point.Y &&
            this.end.X > point.X &&
            this.end.Y > point.Y);
    };
    Rectangle2D.prototype.toJSON = function () {
        var json = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                json[key] = this[key];
            }
        }
        return json;
    };
    Rectangle2D.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Rectangle2D;
}());
exports.Rectangle2D = Rectangle2D;
var Rectangle3D = (function () {
    function Rectangle3D(start, end) {
        this.start = start;
        this.end = end;
    }
    Object.defineProperty(Rectangle3D.prototype, "Start", {
        get: function () {
            return this.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle3D.prototype, "End", {
        get: function () {
            return this.end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle3D.prototype, "Width", {
        get: function () {
            return this.end.X - this.start.X;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle3D.prototype, "Height", {
        get: function () {
            return this.end.Y - this.end.Y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle3D.prototype, "Depth", {
        get: function () {
            return this.end.Z - this.start.Z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle3D.prototype, "Center", {
        get: function () {
            return new Point3D(this.start.X + (this.Width / 2), this.start.Y + (this.Height / 2), this.start.Z + (this.Depth / 2));
        },
        enumerable: true,
        configurable: true
    });
    Rectangle3D.prototype.Contains = function (point) {
        return (this.start.X <= point.X &&
            this.start.Y <= point.Y &&
            this.start.Z <= point.Z &&
            this.end.X > point.X &&
            this.end.Y > point.Y &&
            this.end.Z > point.Z);
    };
    Rectangle3D.prototype.toJSON = function () {
        var json = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                json[key] = this[key];
            }
        }
        return json;
    };
    Rectangle3D.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Rectangle3D;
}());
exports.Rectangle3D = Rectangle3D;
var Triangle = (function () {
    function Triangle(point1, point2, point3) {
        this.point1 = new Point2D(point1.X, point1.Y);
        this.point2 = new Point2D(point2.X, point2.Y);
        this.point3 = new Point2D(point3.X, point3.Y);
    }
    Object.defineProperty(Triangle.prototype, "Point1", {
        get: function () {
            return this.point1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "Point2", {
        get: function () {
            return this.point2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "Point3", {
        get: function () {
            return this.point3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "Center", {
        get: function () {
            return new Point2D((this.point1.X + this.point2.X + this.point3.X) / 3, (this.point1.Y + this.point2.Y + this.point3.Y) / 3);
        },
        enumerable: true,
        configurable: true
    });
    Triangle.prototype.Contains = function (point) {
        var delta1 = new Point2D(this.point3.X - this.point1.X, this.point3.Y - this.point3.Y);
        var delta2 = new Point2D(this.point2.X - this.point1.X, this.point2.Y - this.point1.Y);
        var delta3 = new Point2D(point.X - this.point1.X, point.Y - this.point1.Y);
        var envelope = [
            (delta1.X * delta1.X) + (delta1.Y * delta1.Y),
            (delta1.X * delta2.X) + (delta1.Y * delta2.Y),
            (delta1.X * delta3.X) + (delta1.Y * delta3.Y),
            (delta2.X * delta2.X) + (delta2.Y * delta2.Y),
            (delta2.X * delta3.X) + (delta2.Y * delta3.Y),
        ];
        var invDenom = 1 / (envelope[0] * envelope[3] - envelope[1] * envelope[1]);
        var u = (envelope[3] * envelope[2] - envelope[1] * envelope[4]) * invDenom;
        var v = (envelope[0] * envelope[4] - envelope[1] * envelope[2]) * invDenom;
        return ((u >= 0) && (v >= 0) && (u + v < 1));
    };
    Triangle.prototype.toJSON = function () {
        var json = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                json[key] = this[key];
            }
        }
        return json;
    };
    Triangle.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Triangle;
}());
exports.Triangle = Triangle;
var Cone = (function () {
    function Cone(start, end) {
        this.start = start;
        this.end = end;
        this.length = start.Distance(end);
    }
    Object.defineProperty(Cone.prototype, "Start", {
        get: function () {
            return this.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cone.prototype, "End", {
        get: function () {
            return this.end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cone.prototype, "Length", {
        get: function () {
            return this.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cone.prototype, "Center", {
        get: function () {
            return Point3D.Zero;
        },
        enumerable: true,
        configurable: true
    });
    Cone.prototype.Contains = function (point) {
        return false;
    };
    Cone.prototype.toJSON = function () {
        var json = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                json[key] = this[key];
            }
        }
        return json;
    };
    Cone.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Cone;
}());
exports.Cone = Cone;
var Circle = (function () {
    function Circle(start, radius) {
        this.start = new Point2D(start.X, start.Y);
        this.radius = radius;
    }
    Object.defineProperty(Circle.prototype, "Center", {
        get: function () {
            return this.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "Radius", {
        get: function () {
            return this.radius;
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype.Contains = function (point) {
        var dx = (point.X - this.start.X);
        var dy = (point.Y - this.start.Y);
        return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.radius, 2);
    };
    Circle.prototype.toJSON = function () {
        var json = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                json[key] = this[key];
            }
        }
        return json;
    };
    Circle.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Circle;
}());
exports.Circle = Circle;
var Sphere = (function () {
    function Sphere(start, radius) {
        var z = start.Z || 0;
        this.start = new Point3D(start.X, start.Y, z);
        this.radius = radius;
    }
    Object.defineProperty(Sphere.prototype, "Center", {
        get: function () {
            return this.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sphere.prototype, "Radius", {
        get: function () {
            return this.radius;
        },
        enumerable: true,
        configurable: true
    });
    Sphere.prototype.Contains = function (point) {
        var dx = (point.X - this.start.X);
        var dy = (point.Y - this.start.Y);
        var dz = (point.Z - this.start.Z);
        return Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dy, 2) <= Math.pow(this.radius, 2);
    };
    Sphere.prototype.toJSON = function () {
        var json = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                json[key] = this[key];
            }
        }
        return json;
    };
    Sphere.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Sphere;
}());
exports.Sphere = Sphere;
//# sourceMappingURL=Geometry.js.map