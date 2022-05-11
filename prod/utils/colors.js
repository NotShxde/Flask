"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexRegex = exports.Colors = void 0;
const color_hex = {
    'BLACK': '#000000',
    'BLUE': '#0000FF',
    'GRAY': '#808080',
    'GREEN': '#008000',
    'PURPLE': '#800080',
    'RED': '#FF0000',
    'WHITE': '#FFFFFF',
    DEFAULT_EMBED_COLOR: '#999395'
};
const HEX_REGEX = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i;
exports.Colors = color_hex;
exports.hexRegex = HEX_REGEX;
