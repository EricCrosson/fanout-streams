/**
 * fanout-streams
 * Logical grouping of writable-streams in parallel
 */

import { Readable, Writable } from 'readable-stream'


interface StreamLike {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    push: (chunk: any, encoding?: string) => void;
    pipe: <T extends Writable>(destination: T, options?: { end?: boolean | undefined } | undefined) => T;
}

/**
 * Return a single writable stream that fans received chunks out to
 * each input-stream.
 */
export default function fanoutStreams(
    ...streams: Writable[]
): Writable {

    if (streams.length === 1) {
        return streams[0]
    }

    const publisher: StreamLike = streams.length === 0
        ? {
            push: () => {},
            pipe: (a) => a
        }
        : new Readable({objectMode: true, read() {}})

    const sink = new Writable({
        objectMode: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        write(chunk: any, _: string, callback: (error?: Error | null) => void) {
            publisher.push(chunk)
            callback()
        }
    })

    streams.forEach(stream => publisher.pipe(stream))

    return sink
}
