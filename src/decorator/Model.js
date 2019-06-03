const $type = '__model';

function publish(key) {
    return target => {
        const res = {};
        res.__type = $type;
        res[key] = new target();
        return res
    }
}

function subscribe(contexts, ext = {}) {
    return Object.assign(...contexts.keys()
        .filter(key => key !== 'index.js')
        .map(key => contexts(key).default)
        .filter(ctx => ctx && ctx.__type === $type)
        .map(({__type, ...other}) => other), ext)
}

export default {
    publish: publish,
    subscribe: subscribe
}