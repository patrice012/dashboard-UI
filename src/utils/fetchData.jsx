const fetchData = async (endpoint) => {
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error('Server error...')
  const data = await res.json()
  return data;
};


export default fetchData;