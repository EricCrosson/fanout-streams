import test from 'ava'
import { Readable, Writable } from 'readable-stream'
import isStream from 'is-stream'


/**
 * Library under test
 */

import fanoutStreams from '../src/fanout-streams'


function sink() {
    return new Writable({
        objectMode: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        write(chunk: any, _: string, callback: (error?: Error | null) => void) {
            callback()
        }
    })
}

/*********************************************************************
 * Test cases
 ********************************************************************/

test('should return a dummy writable stream when passed no input', t => {
    t.true(isStream.writable(fanoutStreams()))
})

test('should act as the identity function when passed a single stream', t => {
    const stream = sink()
    t.is(stream, fanoutStreams(stream))
})

test.cb('should return a stream that passes each chunk to every input', t => {

    t.plan(3)

    const sink1 = new Writable({
        objectMode: true,
        write(chunk: string, _: string, callback: (error?: Error | null) => void) {
            t.pass()
            callback()
        }
    })

    const sink2 = new Writable({
        objectMode: true,
        write(chunk: string, _: string, callback: (error?: Error | null) => void) {
            t.pass()
            callback()
        }
    })

    const sink3 = new Writable({
        objectMode: true,
        write(chunk: string, _: string, callback: (error?: Error | null) => void) {
            t.pass()
            callback()
        }
    })

    const stream = fanoutStreams(sink1, sink2, sink3)

    const publisher = new Readable({objectMode: true, read() {}})

    publisher.pipe(stream)

    publisher.push(1)
    publisher.push(null)

    stream.on('finish', () => t.end())
})
