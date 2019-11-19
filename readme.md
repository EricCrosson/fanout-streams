
fanout-streams [![Build status](https://travis-ci.org/EricCrosson/fanout-streams.svg?branch=master)](https://travis-ci.org/EricCrosson/fanout-streams) [![npm version](https://img.shields.io/npm/v/fanout-streams.svg)](https://npmjs.org/package/fanout-streams) [![codecov](https://codecov.io/gh/EricCrosson/fanout-streams/branch/master/graph/badge.svg)](https://codecov.io/gh/EricCrosson/fanout-streams)
=================================================================================================================================================================================================================================================================================================================================================================================================================

> Logical grouping of writable-streams in parallel

Install
-------

```shell
npm install fanout-streams
```

Use
---

```typescript
import { fanoutStreams } from 'fanout-streams'

import { Readable, Writable } from 'readable-stream'

const sink1 = new Writable({
    objectMode: true,
    write(chunk: string, _: string, callback: (error?: Error \| null) => void) {
        console.log('1:', chunk)
        callback()
    }
})

const sink2 = new Writable({
    objectMode: true,
    write(chunk: string, _: string, callback: (error?: Error \| null) => void) {
        console.log('2:', chunk)
        callback()
    }
})

const sink3 = new Writable({
    objectMode: true,
    write(chunk: string, _: string, callback: (error?: Error \| null) => void) {
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
```

Related
-------

Logical grouping of transform-streams in series: [encapsulate-streams](https://github.com/EricCrosson/encapsulate-streams)

## Index

### Functions

* [fanoutStreams](#fanoutstreams)

---

## Functions

<a id="fanoutstreams"></a>

###  fanoutStreams

▸ **fanoutStreams**(...streams: *`Writable`[]*): `Writable`

*Defined in fanout-streams.ts:19*

Return a single writable stream that fans received chunks out to each input-stream.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` streams | `Writable`[] |

**Returns:** `Writable`

___

