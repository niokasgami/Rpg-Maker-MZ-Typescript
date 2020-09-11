
/**
 * The static class that handles JSON with object information.
 *
 * @namespace
 */
function JsonEx() {
    throw new Error("This is a static class");
}

/**
 * The maximum depth of objects.
 *
 * @type number
 * @default 100
 */
JsonEx.maxDepth = 100;

/**
 * Converts an object to a JSON string with object information.
 *
 * @param {object} object - The object to be converted.
 * @returns {string} The JSON string.
 */
JsonEx.stringify = function(object) {
    return JSON.stringify(this._encode(object, 0));
};

/**
 * Parses a JSON string and reconstructs the corresponding object.
 *
 * @param {string} json - The JSON string.
 * @returns {object} The reconstructed object.
 */
JsonEx.parse = function(json) {
    return this._decode(JSON.parse(json));
};

/**
 * Makes a deep copy of the specified object.
 *
 * @param {object} object - The object to be copied.
 * @returns {object} The copied object.
 */
JsonEx.makeDeepCopy = function(object) {
    return this.parse(this.stringify(object));
};

JsonEx._encode = function(value, depth) {
    // [Note] The handling code for circular references in certain versions of
    //   MV has been removed because it was too complicated and expensive.
    if (depth >= this.maxDepth) {
        throw new Error("Object too deep");
    }
    const type = Object.prototype.toString.call(value);
    if (type === "[object Object]" || type === "[object Array]") {
        const constructorName = value.constructor.name;
        if (constructorName !== "Object" && constructorName !== "Array") {
            value["@"] = constructorName;
        }
        for (const key of Object.keys(value)) {
            value[key] = this._encode(value[key], depth + 1);
        }
    }
    return value;
};

JsonEx._decode = function(value) {
    const type = Object.prototype.toString.call(value);
    if (type === "[object Object]" || type === "[object Array]") {
        if (value["@"]) {
            const constructor = window[value["@"]];
            if (constructor) {
                Object.setPrototypeOf(value, constructor.prototype);
            }
        }
        for (const key of Object.keys(value)) {
            value[key] = this._decode(value[key]);
        }
    }
    return value;
};

