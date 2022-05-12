"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsPattrn = void 0;
const ChannelsPattern = /<#(\d{17,19})>/g;
const RoleRegex = /<@&(\d{17,19})>/gm;
const HEX_REGEX = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i;
exports.ChannelsPattrn = ChannelsPattern;
