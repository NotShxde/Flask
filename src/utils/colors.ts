const color_hex = {
    'BLACK':'#000000',
    'BLUE':'#0000FF',
    'GRAY':'#808080',
    'GREEN':'#008000',
    'PURPLE':'#800080',
    'RED':'#FF0000',
    'WHITE':'#FFFFFF',
    DEFAULT_EMBED_COLOR:'#999395'
  }
  const HEX_REGEX = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i
  const ChannelsPattern = /<#(\d{17,19})>/g;
  export const Colors = color_hex
  export const hexRegex = HEX_REGEX
  export const channelHex = ChannelsPattern