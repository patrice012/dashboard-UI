const mergeArray = (array1, array2) => {
    // Create an object to keep track of unique items based on their 'id' property
    const uniqueItems = {};

    // Merge data1 into the uniqueItems object
    array1.forEach((item) => {
        uniqueItems[item.id] = item;
    });

    // Merge data2 into the uniqueItems object, overwriting any existing items with the same 'id'
    array2.forEach((item) => {
        uniqueItems[item.id] = item;
    });

    // Convert the uniqueItems object back to an array
    const data = Object.values(uniqueItems);
    return data;
};

export {mergeArray}