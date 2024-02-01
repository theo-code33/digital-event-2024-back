"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialCombination = function (possibilityPlayer) {
    var uniqueNumbers = new Set();
    while (uniqueNumbers.size < 3) {
        var randomIndex = Math.floor(Math.random() * possibilityPlayer.length);
        uniqueNumbers.add(possibilityPlayer[randomIndex]);
    }
    return Array.from(uniqueNumbers);
};
exports.default = initialCombination;
