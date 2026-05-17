export const fmt = (val) => {
    if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1).replace(".0", "")} jt`;
    }

    if (val >= 1000) {
        return `${(val / 1000).toFixed(0)} rb`;
    }

    return "0";
};