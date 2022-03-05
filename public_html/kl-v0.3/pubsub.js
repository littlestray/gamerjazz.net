let subscribers = {}

const pubSub = {
    publish(event, data) {
        if (!subscribers[event]) {
            return
        }

        subscribers[event].forEach(subCallback => {
            subCallback(data)
        });
    },
    subscribe(event, callback) {
        if (!subscribers[event]) {
            subscribers[event] = []
        }
        subscribers[event].push(callback)
    }
}