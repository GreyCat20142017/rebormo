export const isValidIndex = (index, testedArray) => (((index >= 0) && (index < testedArray.length)));

export const getInitialMemorized = (length) => {
    return "?".repeat(length).split("").map((item, ind) => (({index: ind, inactive: false})))
};

export const getActiveAmount = (stateArray) => (
    stateArray.reduce((amount, current) => {
        amount += (current.inactive ? 0 : 1);
        return amount;
    }, 0)
);

export const isInactive = (index, stateArray) => {
    return isValidIndex(index, stateArray) ? stateArray[index].inactive : false;
};

export const getCurrentInfo = (currentIndex, maxIndex, randomOrder, controlMode, content, fieldname) => (
    (currentIndex >= 0 && randomOrder[currentIndex] <= maxIndex && randomOrder[currentIndex] >= 0) ?
        content[randomOrder[currentIndex]][fieldname] : ''
);