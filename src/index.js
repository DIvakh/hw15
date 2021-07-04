function makeCache(callback) {
    const cache = new Map();
    const maxCacheSize = 10;
    const cacheKeys = [];

    return function (...args) {
        let result;
        let flag = false;
        let returnKey;

        for (const key of cache.keys()) {
            const inCache = key.every((item, index) => item === args[index]);
            if (inCache) {
                flag = true;
                returnKey = key;
            }
        }

        if (flag) {
            result = cache.get(returnKey);
        } else {
            result = callback(...args);
            cache.set(args, result);
            cacheKeys.push(args);
        }

        if (cache.size > maxCacheSize) {
            cache.delete(cacheKeys.shift());
        }

        return result;
    };
}

function sum(a, b) {
    return a + b;
}

const cacheSum = makeCache(sum);

cacheSum('5', '7');
