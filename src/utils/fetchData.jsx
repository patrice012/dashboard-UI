async function fetchData(endpoint, request = undefined) {
  try {
    let response =''
    if (request) {
      response = await fetch(endpoint, request);
    } else {
      response = await fetch(endpoint);
    }

    const output = await response.json();
    return output;
  } catch (err) {
    // maybe send UI information to user...
    console.log(err);
  }
}

export default fetchData;
