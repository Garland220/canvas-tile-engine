"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HardwareInfo = (function () {
    function HardwareInfo(cores, memory, videoCard, os, userAgent, language) {
        if (cores === void 0) { cores = 0; }
        if (memory === void 0) { memory = 0; }
        if (videoCard === void 0) { videoCard = ''; }
        if (os === void 0) { os = ''; }
        if (userAgent === void 0) { userAgent = ''; }
        if (language === void 0) { language = 'en-US'; }
        this.cpuCores = 0;
        this.memory = 0;
        this.memoryUsed = 0;
        this.videoCard = '';
        this.os = '';
        this.userAgent = '';
        this.language = 'en-US';
        this.cpuCores = cores;
        this.memory = memory;
        this.videoCard = videoCard;
        this.os = os;
        this.userAgent = userAgent;
        this.language = language;
    }
    Object.defineProperty(HardwareInfo.prototype, "CPUCores", {
        get: function () {
            return this.cpuCores;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HardwareInfo.prototype, "Memory", {
        get: function () {
            return this.memory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HardwareInfo.prototype, "MemoryUsed", {
        get: function () {
            return this.memoryUsed;
        },
        set: function (memory) {
            this.memoryUsed = memory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HardwareInfo.prototype, "OS", {
        get: function () {
            return this.os;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HardwareInfo.prototype, "UserAgent", {
        get: function () {
            return this.userAgent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HardwareInfo.prototype, "Language", {
        get: function () {
            return this.language;
        },
        enumerable: true,
        configurable: true
    });
    HardwareInfo.prototype.toJSON = function () {
        var json = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                json[key] = this[key];
            }
        }
        return json;
    };
    HardwareInfo.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return HardwareInfo;
}());
exports.HardwareInfo = HardwareInfo;
//# sourceMappingURL=HardwareInfo.js.map