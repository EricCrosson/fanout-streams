import fanoutStreams from '../src/fanout-streams'

import { Readable, Writable } from 'readable-stream'


const sink1 = new Writable({
    objectMode: true,
    write(chunk: string, _: string, callback: (error?: Error | null) => void) {
        console.log('1:', chunk)
        callback()
    }
})

const sink2 = new Writable({
    objectMode: true,
    write(chunk: string, _: string, callback: (error?: Error | null) => void) {
        console.log('2:', chunk)
        callback()
    }
})

const sink3 = new Writable({
    objectMode: true,
    write(chunk: string, _: string, callback: (error?: Error | null) => void) {
        console.log('3:', chunk)
        callback()
    }
})

const stream = fanoutStreams(sink1, sink2, sink3)

const publisher = new Readable({objectMode: true, read() {}})
publisher.pipe(stream)


publisher.push('cat')
//=>1: cat
//=>2: cat
//=>3: cat
