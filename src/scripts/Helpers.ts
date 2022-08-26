function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    } return a;
}
export function wordBankHelper(ranNum1, curArr, initArr) {
    var returnValue = [curArr[ranNum1]];
    var i = 0;
    while (returnValue.length < 4 && i < 10) {
        i++;
        returnValue = returnValue.concat(initArr[Math.floor(Math.random() * initArr.length)]);
        let removeDuplicates = new Set(returnValue); // removes duplicates
        returnValue = [...removeDuplicates]; // converts back to array
    }
    return (
        shuffle(returnValue)
    )
}

export function cookieExists(name) {
	const value = "; " + document.cookie;
	let parts 
    parts = value.split("; " + name + "=");
	if (parts.length === 2) {
        // return parts.pop().split(";").shift();
        return true
    } else {
        return false;
    }
};

export function CheckIsEmail(email) {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(regex)) {
        return true
    } else {
        return false
    }
}