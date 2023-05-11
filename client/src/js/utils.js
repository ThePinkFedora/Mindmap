/**
 * Finds the element in the given array which meets the condition, and replaces it with {@link element}.
 * @param {[]} array 
 * @param {*} element 
 * @param {(element:*) => boolean} match 
 */
export function findAndReplace(array,element,match){
    const index = array.findIndex(match);
    array[index] = element;
    return array;
}