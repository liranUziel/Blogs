const SYMBOLS = {
    pi: "π",
};
function toSuperscript(number) {
    const superscripts = {
        0: "⁰",
        1: "¹",
        2: "²",
        3: "³",
        4: "⁴",
        5: "⁵",
        6: "⁶",
        7: "⁷",
        8: "⁸",
        9: "⁹",
    };
    return String(number)
        .split("")
        .map((digit) => superscripts[digit] || digit)
        .join("");
}
function toSubscript(number) {
    const subscripts = {
        0: "₀",
        1: "₁",
        2: "₂",
        3: "₃",
        4: "₄",
        5: "₅",
        6: "₆",
        7: "₇",
        8: "₈",
        9: "₉",
    };
    return String(number)
        .split("")
        .map((digit) => subscripts[digit] || digit)
        .join("");
}
function letterWithCaret(letter) {
    return letter + "\u0302";
}

// module.exports = {
//     toSubscript,
// };
