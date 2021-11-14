const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
// The purpose of validateCred() is to return true when an array contains digits of a valid credit card and false when it is invalid
const validateCred = array => {
  let checkDigit = array.slice(-1)
  let newArray = array.slice(0, array.length - 1);

  let reversedArray = newArray.reverse();
  let simpleOddIndex = reversedArray.filter(function(el, ind) {
    return ind % 2 === 0 
})
  let multipliedOddIndex = simpleOddIndex.map(function(item) {
    return item * 2
})

  let moreThan9 = multipliedOddIndex.filter(item => item > 9)
  let lessThan9 = multipliedOddIndex.filter(item => item < 9)
  let subtractedIndex = moreThan9.map(item => item - 9)
  
  function totalIndex() {
    let reducer1 = subtractedIndex.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    })
    let reducer2 = lessThan9.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    })
    let newReducer = reducer2 + reducer1
      return newReducer
  } 

  let evenIndex = reversedArray.filter(function(el, ind) {
    return ind % 2 !== 0
  })
  let totalEvenIndex = evenIndex.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  })

  const total = () => {
    let moduloSum = totalEvenIndex + totalIndex() + +checkDigit
      if (moduloSum % 10 === 0) {
        return true
      } else {
      return false
      }
  }

}

// The role of findInvalidCards() is to check through the nested array for which numbers are invalid, and return another nested array of invalid cards.
function findInvalidCards(nestedArray) {
  let filteredInvalidCards = []
  for (let i = 0; i < nestedArray.length; i++) {
    if (!validateCred(nestedArray[i])) {
    filteredInvalidCards.push(nestedArray[i]);  
   }
     
  }
  return filteredInvalidCards
}

// checking companies that mailed out invalid cards
function idInvalidCardCompanies(sortedInvalidArray) {
  let mailingCompanies = []
  
  for (let i = 0; i < sortedInvalidArray.length; i++) {
    switch (sortedInvalidArray[i][0]) {
      case 3:
        if (!mailingCompanies.includes('American Express')) {
          mailingCompanies.push('American Express');
        }
      case 4:
        if (!mailingCompanies.includes('Visa')) {
          mailingCompanies.push('Visa');
        }
      case 5:
        if (!mailingCompanies.includes('MasterCard')) {
          mailingCompanies.push('MasterCard');
        }
      case 6:
        if (!mailingCompanies.includes('Discover')) {
          mailingCompanies.push('Discover');
        }
      default:
        if (!mailingCompanies.includes('Company not found')) {
          mailingCompanies.push('Company not found');
        }
    }
  }  
  return mailingCompanies
}

console.log(idInvalidCardCompanies(findInvalidCards(batch)))