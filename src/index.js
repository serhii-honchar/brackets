module.exports =function check(str, bracketsConfig) {
    let arr = [];
    let bracketStatement = str.split('');
    for (let i = 0; i < bracketStatement.length; i++) {
        if (sameBrackets(bracketStatement[i], bracketsConfig)) {
            let index = arr.lastIndexOf(bracketStatement[i]);
            if (index !== -1) {
                let substr =     arr.slice(index+1, arr.length).join('');
                if(str==='[(])'){
                    console.log('substring '+substr);
                }
                if (check(substr, bracketsConfig)) {
                    arr.splice(index, 1);
                }
            } else {
                arr.push(bracketStatement[i]);
            }
        } else if (isOpenBracket(bracketStatement[i], bracketsConfig)) {
            arr.push(bracketStatement[i]);
        } else if (isCloseBracket(bracketStatement[i], bracketsConfig)) {
            let index = arr.lastIndexOf(getOpenBracket(bracketStatement[i], bracketsConfig));
            if (index !== -1) {
                let substr =     arr.slice(index+1, arr.length).join('');
                if (check(substr, bracketsConfig)) {
                    arr.splice(index, 1);
                }
            } else {
                return false;
            }
        }
    }
    return arr.length === 0;
}

function sameBrackets(sym, bracketsConfig) {

    for (let i = 0; i < bracketsConfig.length; i++) {
        let s = bracketsConfig[i];
        if (s === undefined) {
            throw Error;
        }
        if (s[0] === sym && s[1] === sym) {
            return true;
        }
    }
    return false;
}

function isOpenBracket(sym, bracketsConfig) {
    for (let i = 0; i < bracketsConfig.length; i++) {
        if (bracketsConfig[i][0] === sym) {
            return true;
        }
    }
    return false;
}

function isCloseBracket(sym, bracketsConfig) {
    for (let i = 0; i < bracketsConfig.length; i++) {
        if (bracketsConfig[i][1] === sym) {
            return true;
        }
    }
    return false;
}

function getOpenBracket(sym, bracketsConfig) {
    for (let i = 0; i < bracketsConfig.length; i++) {
        if (bracketsConfig[i][1] === sym) {
            return bracketsConfig[i][0];
        }
    }
    return undefined;
}
