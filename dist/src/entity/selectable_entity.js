"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectableEntity = void 0;
const entity_1 = require("./entity");
class SelectableEntity extends entity_1.Entity {
    constructor() {
        super(...arguments);
        this.selected = false;
    }
}
exports.SelectableEntity = SelectableEntity;
