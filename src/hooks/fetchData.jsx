const fetchData = async ({queryKey}) => {
  const endpoint = queryKey[1];
  const res = await fetch(endpoint);
  return res.json();
};


export default fetchData;