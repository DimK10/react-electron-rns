const extractValues = (resultsFromRns) => {
    const regex = /[+-]?\d+(\.\d+)?[a-zA-Z]?[+-]\d+/g;
    resultsFromRns = resultsFromRns.map(result => {
        let floats = result.match(regex).map(num => { return parseFloat(num) });
        console.log('floats:', floats);
        return floats;
    });
    // Remove first element of array, regex catches accuracy=1e-05 and parses it
    resultsFromRns.forEach(result => {
        result.shift();
    });
    return resultsFromRns; // This is an array of arrays!!!  
};

module.exports = extractValues;