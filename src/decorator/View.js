const $type = '__view';

function publish(router, opt = {}) {
    return target => {
        return {
            __type: $type,
            path: router,
            component: target,
            ...opt
        }
    }
}

function subscribe(contexts) {
    return contexts.keys()
        .filter(key => key !== 'index.js')
        .map(key => contexts(key).default)
        .filter(ctx => ctx && ctx.__type === $type)
        .map(({__type, ...other}) => other)
}

export default {
    publish: publish,
    subscribe: subscribe
}