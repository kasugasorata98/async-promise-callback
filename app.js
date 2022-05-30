const { default: axios } = require("axios");

(async function main() {
  console.log("Fetch with Async");
  await fetchWithAsync();
  console.log("Fetch with Async done");

  console.log("Fetch with Callback");
  fetchWithCallback(async (err, data) => {
    if (err) {
      console.log(err);
    } else {
      await sleep(1000); // to emulate a scenario whereby the api is slow
      console.log("Fetch with Callback done");
    }
  });

  console.log("Fetch with Forced Promise");
  await forceFetchWithCallbackIntoPromise();
  console.log("Fetch with Forced Promise");
})();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function fetchWithAsync() {
  try {
    const { data } = axios.get("https://jsonplaceholder.typicode.com/todos/1");
    return data;
  } catch (err) {
    throw err;
  }
}

function fetchWithCallback(callback) {
  try {
    const { data } = axios.get("https://jsonplaceholder.typicode.com/todos/1");
    callback(null, data);
  } catch (err) {
    callback(err, null);
  }
}

function forceFetchWithCallbackIntoPromise() {
  return new Promise((resolve, reject) => {
    fetchWithCallback((err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}
