/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

import { disposeNone } from '@most/disposable'
import { propagateTask, propagateEndTask } from '../scheduler/PropagateTask'

/**
 * Stream containing only x
 * @param {*} x
 * @returns {Stream}
 */
export const just = x => new Just(x)

class Just {
  constructor (x) {
    this.value = x
  }

  run (sink, scheduler) {
    return scheduler.asap(propagateTask(runJust, this.value, sink))
  }
}

function runJust (t, x, sink) {
  sink.event(t, x)
  sink.end(t, undefined)
}

/**
 * Stream containing no events and ends immediately
 * @returns {Stream}
 */
export const empty = () => EMPTY

class Empty {
  run (sink, scheduler) {
    return scheduler.asap(propagateEndTask(sink))
  }
}

const EMPTY = new Empty()

/**
 * Stream containing no events and never ends
 * @returns {Stream}
 */
export const never = () => NEVER

class Never {
  run () {
    return disposeNone()
  }
}

const NEVER = new Never()
