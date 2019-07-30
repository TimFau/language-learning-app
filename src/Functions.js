function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    } return a;
}
export function wordBankHelper(ranNum1, ranNum2, curArr, initArr) {
    return (
        shuffle(initArr.slice(ranNum2, 3).concat(curArr[ranNum1]))
    )
}