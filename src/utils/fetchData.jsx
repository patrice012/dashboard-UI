async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    // maybe send UI information to user...
    console.log(err);
  }
}

export default fetchData;
