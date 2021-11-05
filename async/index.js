'use strict';
require('console-stamp')(console, '[HH:MM:ss.l]');

function rejectedPromise() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() =>
        reject('Reject Reason'), 100);
    });
    const thenResult = promise.then(() => {
        console.log('success');
    }, (error) => {
        console.log('rejected', error);
    });
    const catchResult = promise.catch((error) => {
        console.log('rejected2', error);
    });
    thenResult.finally(() => {
        console.log('thenResult finally');
    });
    catchResult.finally(() => {
        console.log('catchResult finally');
    });
    setTimeout(() => promise.catch((error) => {console.log('rejected3', error)}), 200);
    console.log('promise === thenResult', promise === thenResult);
    console.log('promise === catchResult', promise === catchResult);
}

function rejectedPromiseSeparateThenAndCatch() {
    // Leaves unhandled rejected promise
    const promise = new Promise((resolve, reject) => {
        setTimeout(() =>
            reject('Reject Reason'), 100);
    });
    // if onRejected is omitted, it is replaced with a Thrower function which rethrows the error
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
    // which leads to an unhandled rejection in this scenario
    // Note: I find this behavior confusing and a bad design choice, simply because all the user wants from .then is to run some
    // code when the promise is resolved, and not to handle the rejection by rethrowing and creating another rejected promise.
    const thenResult = promise.then(() => {
        console.log('success');
    });
    // There two rejected promises at this point: thenResult and promise with promise being handled by the Node
    // "Thrower Function" and thenResult being unhandled
    const catchResult = promise.catch((error) => {
        console.log('rejected', error);
    });
}

function rejectedPromiseChainedThenAndCatch() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() =>
            reject('Reject Reason'), 100);
    });
    const catchResult = promise.then(() => {
        console.log('success');
    }).catch((error) => {
        console.log('rejected', error);
        return '1701';
    });
    catchResult.then((value) => {
        console.log('catchResult then', value);
    });
}

function doubleThenCallback() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() =>
            resolve('Resolve Reason'), 100);
    });
    const thenResult = promise.then((result) => {
        console.log('then called, returning another promise');
        return new Promise((resolve, reject) => {
            setTimeout(() =>
                resolve(`Resolve Reason 2; prev: ${result}`), 100);
        })
    });
    thenResult.then((result) => {
        console.log('success', result);
    });
}

function finallyRejected() {
    // Another scenario for an unhandled promise rejection
    // The catch handles the rejection in promise
    // The finally rethrows the rejection in finallyResult which is unhandled
    const promise = new Promise((resolve, reject) => {
        setTimeout(() =>
            reject('Reject Reason for unhandled Promise'), 100);
    });
    const catchResult = promise.catch(() => {
        console.log('catch');
    });
    const finallyResult = promise.finally(() => {
        console.log('finally');
    });
    console.log('both equal', catchResult === finallyResult);
}

function finallyCatchChainedRejected() {
    // finally handles the rejection but rethrows. Catch handles the rejection
    // and returns void
    const promise = new Promise((resolve, reject) => {
        setTimeout(() =>
            reject('Reject Reason for unhandled Promise'), 100);
    });
    const catchResult = promise.finally(() => {
        console.log('finally');
    }).catch(() => {
        console.log('catch');
    });
    catchResult.then((fulfilled) => {
        console.log('then', fulfilled); // The promise returned by catch is fulfilled
    }, (rejected) => {
        console.log('catch', rejected);
    });
}

function catchFinallyChainedRejected() {
    // catch handles the rejection but rethrows, finally handles the fulfilled promise returned by catch
    const promise = new Promise((resolve, reject) => {
        setTimeout(() =>
            reject('Reject Reason for unhandled Promise'), 100);
    });
    const finallyResult = promise.catch(() => {
        console.log('catch');
    }).finally(() => {
        console.log('finally');
    })
}

const functions = [doubleThenCallback, rejectedPromiseChainedThenAndCatch, rejectedPromiseSeparateThenAndCatch, rejectedPromise, finallyRejected, finallyCatchChainedRejected, catchFinallyChainedRejected];
process.on("unhandledRejection", (evt) => {console.log("!!! Unhandled promise !!!", evt)});

// https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', data => {
        const byteArray = [...data]
        if (byteArray.length > 0 && byteArray[0] === 3) {
            console.log('^C')
            process.exit(1)
        }
        process.stdin.setRawMode(false)
        resolve()
    }))
}

async function run()
{
    for (const func of functions)
    {
        console.log('--- ' + func.name);
        func();
        await keypress();
    }
}

run().then(r => {});
