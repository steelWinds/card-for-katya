let countCallLimit = (limitCalls, func) => {
    let calls = 0;

    // eslint-disable-next-line consistent-return
    return function anon(...args) {
        calls += 1;

        if (calls > limitCalls) {
            return null;
        }

        func.apply(this, args);
    };
};

export { countCallLimit };
