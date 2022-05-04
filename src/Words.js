import wordBank from './wordle-bank.txt'

/* Words to be used*/
export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];
    // array for board has empty arrays for when the game starts for 6 attempts

export const generateWordSet = async () => {
    let wordSet;
    await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
        const wordArr = result.split("\n")
        wordSet = new Set(wordArr);
    });
    return{ wordSet };
}