function shuffle(array: Array<string>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    } return array;
}
export function wordBankHelper(ranNum1: number, curArr: Array<string>, initArr: Array<string>) {
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

export function cookieExists(name: string) {
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

export function CheckIsEmail(email: string) {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(regex)) {
        return true
    } else {
        return false
    }
}