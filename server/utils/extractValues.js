const extractValues = (resultsFromRns) => {
    const regex = /[+-]?\d+(\.\d+)?[a-zA-Z]?[+-]\d+/g;
    resultsFromRns = resultsFromRns.map(result => {
        let floats = result.match(regex).map(num => { return parseFloat(num) });
        // floats array length contains one wrong taken value in the first element, and one in each every iteration of 17 values
        // Since output has all the data, with the wrong values, this needs to be done
        console.log('floats:', floats);
        floats.shift();
        let measurements = floats.length / 18; // Might need math.ceil
        for (let i = 1; i <= measurements; i++) {
            floats.splice(i * 17, 1);
        };
        return floats;
    });
    // Remove first element of array, regex catches accuracy=1e-05 and parses it

    return resultsFromRns; // This is an array of arrays!!!  
};

module.exports = extractValues;