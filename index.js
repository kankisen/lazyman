function lazyMan(name) {
    let task = []
    let lazyMan = {
        next: function() {
            let fn = task.shift()
            fn && fn()
        },

        sayHi: function() {
            task.push(() => {
                console.log(`Hi! This is ${name}!`)
                this.next()
            })
        },
        
        eat: function(food) {
            task.push(() => {
                console.log(`Eat ${food}~`)
                this.next()
            })
            return this
        },

        sleep: function(time) {
            task.push(() => {
                setTimeout(() => {
                    this.next()
                }, time * 1000)
            })
            return this
        },

        sleepFirst: function(time) {
            task.unshift(() => {
                setTimeout(() => {
                    this.next()
                }, time * 1000)
            })
            return this
        }
    }
    lazyMan.sayHi(name)
    setTimeout(() => {
        lazyMan.next()
    })
    return lazyMan
}

lazyMan('zhan').sleep(5).eat('apple').sleepFirst('2')