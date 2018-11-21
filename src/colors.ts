import * as colors from 'colors';

export const COLORS = {
    BLUE: colors.blue,
    CYAN: colors.cyan,
    GRAY: colors.gray,
    GREEN: colors.green,
    GREY: colors.grey,
    MAGENTA: colors.magenta,
    RED: colors.red,
    WHITE: colors.white,
    YELLOW: colors.yellow,
};

const colorPallete = [COLORS.YELLOW, COLORS.MAGENTA, COLORS.CYAN, COLORS.RED, COLORS.GREEN, COLORS.BLUE, COLORS.WHITE];

let currentColor = 0;

export function getColor(color: colors.Color) {
    return color || colorPallete[currentColor++ % colorPallete.length];
}
