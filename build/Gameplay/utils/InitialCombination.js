"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialCombination = (possibilityPlayer) => {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < 3) {
        const randomIndex = Math.floor(Math.random() * possibilityPlayer.length);
        uniqueNumbers.add(possibilityPlayer[randomIndex]);
    }
    return Array.from(uniqueNumbers);
};
exports.default = initialCombination;
