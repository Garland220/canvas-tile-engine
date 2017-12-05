"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = require("./Client");
function createClient(canvas) {
    return new Client_1.Client(canvas);
}
window.createClient = createClient;
//# sourceMappingURL=Main.js.map