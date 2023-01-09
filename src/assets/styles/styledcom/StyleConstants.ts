// spacing
export const SPACE_UNIT = 4
export const SPACE_TIMES = (multiple?: number) =>
  `${SPACE_UNIT * (multiple || 1)}px`
export const SPACE = SPACE_TIMES(1) // 4
export const SPACE_XS = SPACE_TIMES(2) // 8
export const SPACE_SM = SPACE_TIMES(3) // 12
export const SPACE_MD = SPACE_TIMES(4) // 16
export const SPACE_LG = SPACE_TIMES(5) // 20
export const SPACE_XL = SPACE_TIMES(9) // 36 = 16 + 20
export const SPACE_XXL = SPACE_TIMES(14) // 56 = 20 + 36

// z-index
export const MINUS_LEVEL_1 = -1
export const LEVEL_1 = 1
export const LEVEL_5 = 5
export const LEVEL_10 = 10
export const LEVEL_20 = 20
export const LEVEL_50 = 50
export const LEVEL_60 = 60
export const LEVEL_70 = 70
export const LEVEL_100 = 100
export const LEVEL_1000 = 1000

// base color
// export const BLUE = '#318EFA'
export const BLUE = '#1946b9'
export const GREEN = '#36B342'
export const ORANGE = '#FA8C15'
export const YELLOW = '#FF9800'
export const RED = '#FF4433'

export const logo_text_color = '#1f1f1f'

/* gray
 *
 * as reference
 * G10 - body background
 * G20 - split line
 * G30 - border
 * G40 - title font
 * G50 - disabled font
 * G60 - normal font
 * G70 - second font 辅助文字
 * G80 - 背景色
 */
export const WHITE = '#FFFFFF'
export const G10 = '#F7F8FA'
export const G20 = '#E5E5E5'
export const G30 = '#CCCCCC'
export const G40 = '#262626' // 也是主题色
export const G50 = '#A1A5B7'
export const G60 = '#4C4C4C'
export const G70 = '#B2B2B2'
export const G80 = '#F7F8FA'
export const G90 = '#000000'
export const G100 = '#F1F1F5'

export const LAYOUTSPLITLINE = '#353638'
export const SPLITBORDER = `1px solid ${G20}`

// theme color
export const PRIMARY = BLUE
export const INFO = PRIMARY
export const SUCCESS = GREEN
export const PROCESSING = BLUE
export const ERROR = RED
export const HIGHLIGHT = RED
export const WARNING = ORANGE
export const NORMAL = G30
export const HEADERBG = G40
export const SIDEBARBG = G40
export const BODYBG = G80

// font
export const FONT_SIZE_10 = 10
export const FONT_SIZE_12 = 12
export const FONT_SIZE_14 = 14
export const FONT_SIZE_16 = 16
export const FONT_SIZE_18 = 18
export const FONT_SIZE_20 = 20
export const FONT_SIZE_24 = 24

export const FONT_FAMILY =
  '-apple-system,BlinkMacSystemFont,SF Pro SC,SF Pro Text,Helvetica Neue,Helvetica,PingFang SC,Segoe UI,Roboto,Hiragino Sans GB,arial,microsoft yahei ui,Microsoft YaHei,SimSun,sans-serif'
export const TITLE_FONT_FAMILY = 'PingFang SC'
export const CARD_FONT_FAMILY = 'DIN Condensed Bold'
export const FONT_WEIGHT_LIGHT = 300
export const FONT_WEIGHT_REGULAR = 400
export const FONT_WEIGHT_MEDIUM = 500
export const FONT_WEIGHT_BOLD = 600

// border

export const BORDER_RADIUS = '4px'

// shadow

export const NORMAL_SHADOW = '0px 0px 12px 0px rgba(0,0,0,0.05)'
export const CARD_SHADOW = '0px 0px 12px 0px rgba(0,0,0,0.05)'
export const HOVER_SHADOW = '0px 4px 12px 0px rgba(0,0,0,0.1)'
export const HEADER_SHADOW = ' 0px 4px 12px 0px rgba(0,0,0,0.05)'
export const SIDEBAR_SHADOW = '4px 0px 12px 0px rgba(0,0,0,0.05)'
export const LEFT_SHADOW = '-4px 0px 12px 0px rgba(0,0,0,0.05)'
export const TOP_SHADOW = '0 -4px 12px 1px rgba(0,0,0,0.1)'

export const block_box_shadow = '0 2px 3px 0 rgba(0,0,0,.05)'
export const block_active_box_shadow = '0 7px 21px 0 rgba(0,0,0,.15)'
