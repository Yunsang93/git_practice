// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// More invalid credit card numbers
const invalid6 = [4,0,2,4,0,0,7,1,5,7,7,7,8,3,4,0]
const invalid7 = [4,4,8,5,0,2,6,5,1,2,8,8,6,9,5,4]
const invalid8 = [4,9,2,9,8,9,0,1,6,9,8,9,6,7,7,3,6,7,0]
const invalid9 = [3,5,4,2,8,0,0,3,0,6,3,1,6,1,2,8]
const invalid10 = [3,5,3,4,1,1,5,0,5,5,1,4,0,0,7,8]
const invalid11 = [3,5,3,1,8,0,4,1,2,3,5,2,2,6,8,4,5,3,8]
const batch2 = [invalid6, invalid7, invalid8, invalid9, invalid10, invalid11];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// credit-card-checker.js is a program that validates whether a credit card is a valid # or not based on Luhn's Algorithm. It will also return the credit card company that manufactured the invalid credit card number.
// Add your functions below:
// validateCred is a function that validates whether a credit card is a valid # or not based on Luhn's algorithm.
const validateCred = cardArray => { //Returns true when an array contains digits of a valid credit card number and false when it is invalid
    let credNumber = cardArray[cardArray.length - 1]; //Check Number included.
    for (let i = cardArray.length - 2; i >= 0;i--) {
        if (cardArray.length % 2 === 0 && i % 2 === 0) { //Every other digit is doubled (check digit is not doubled). If the # is greater than 9 after doubling, subtract 9 from its value.
            if (cardArray[i] * 2 > 9) {
                credNumber += (cardArray[i] * 2) - 9;
            } else {
                credNumber += cardArray[i] * 2;
            }
        } else if (cardArray.length % 2 === 0 && i % 2 === 1) {
            credNumber += cardArray[i];
        } else if (cardArray.length % 2 === 1 && i % 2 === 1) {
            if (cardArray[i] * 2 > 9) {
                credNumber += (cardArray[i] * 2) - 9;
            } else {
                credNumber += cardArray[i] * 2;
            }
        } else if (cardArray.length % 2 === 1 && i % 2 === 0) {
            credNumber += cardArray[i];
        }
    }
    if (credNumber % 10 === 0) {
        return true;
    } else {
            return false;
        }
    };

//Test cases
console.log(validateCred(valid1)); //Returns true
console.log(validateCred(invalid1)); //Returns false

// findValidCards is a function that returns a nested array of invalid credit card numbers.
const findInvalidCards = cardNestedArray => {
    let invalidCards = [];
    let j = 0;
    while (j < cardNestedArray.length) {
        if (validateCred(cardNestedArray[j]) !== true) {
            invalidCards.push(cardNestedArray[j]);
        } 
        j++
    }
    return invalidCards;
};

//Test cases
console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5]));// Shouldn't print anything
console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); // Should print all of the numbers
console.log(findInvalidCards(batch)); // Test what the mystery numbers are

// idInvalidCardCompanies is a function that returns an array of invalid credit card manufacturers.
const idInvalidCardCompanies = function(invalidNumsArray) {
    let invalidNumCompanies = [];
    for (let iterator = 0; iterator < invalidNumsArray.length; iterator++) {
        switch(invalidNumsArray[iterator][0]) {
            case 3:
                if (invalidNumCompanies.includes('Amex (American Express)') === false) {
                    invalidNumCompanies.push('Amex (American Express)');
                };
                break;
            case 4:
                if (invalidNumCompanies.includes('Visa') === false) {
                invalidNumCompanies.push('Visa');
                };
                break;
            case 5:
                if (invalidNumCompanies.includes('Mastercard') === false) {
                    invalidNumCompanies.push('Mastercard');
                };
                break;
            case 6:
                if (invalidNumCompanies.includes('Discover') === false) {
                    invalidNumCompanies.push('Discover');
                };
                break;
            default:
                console.log('Company not found');
                break;
        }
    };
    return invalidNumCompanies;
};

// Test cases:
console.log(idInvalidCardCompanies([invalid1])); // Should print['visa']
console.log(idInvalidCardCompanies([invalid2])); // Should print ['mastercard']
console.log(idInvalidCardCompanies(batch)); // Find out which companies have mailed out invalid cards
console.log(idInvalidCardCompanies(batch2));

// convertArr converts a string into an array of numbers.
function convertArr(numString) {
    return Array.from(numString,Number);
};

// Test cases:
console.log(convertArr('131523'));
console.log(convertArr('5243232'));
console.log(convertArr('52930120323231'));


// numConverter converts an invalid credit card into a valid credit card number.
function numConverter(numArr) {
    if (validateCred(numArr) === false) {
        let credNumber = numArr[numArr.length - 1];
        for (let i = numArr.length - 2; i >= 0;i--) {
         if (numArr.length % 2 === 0 && i % 2 === 0) { 
             if (numArr[i] * 2 > 9) {
                credNumber += (numArr[i] * 2) - 9;
            } else {
                credNumber += numArr[i] * 2;
            }
            } else if (numArr.length % 2 === 0 && i % 2 === 1) {
                credNumber += numArr[i];
         } else if (numArr.length % 2 === 1 && i % 2 === 1) {
             if (numArr[i] * 2 > 9) {
                credNumber += (numArr[i] * 2) - 9;
             } else {
                credNumber += numArr[i] * 2;
            }
         } else if (numArr.length % 2 === 1 && i % 2 === 0) {
            credNumber += numArr[i];
         }
    } numArr[numArr.length - 1] -= credNumber % 10;
    return numArr;
}
}; 

// Test cases:
console.log(validateCred(invalid2)); //(1) Invalid Credit Card
console.log(validateCred(numConverter(invalid2))); //(1) Function converts to valid credit card
console.log(validateCred(invalid3)); //(2) Invalid Credit Card
console.log(validateCred(numConverter(invalid3))); //(2) Function converts to valid credit card
