const fetchData = async (endpoint) => {
  // console.log(endpoint, 'endpoint')
  // const endpoint = queryKey[1];
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error('Server error...')
  return res.json();
};


export default fetchData;