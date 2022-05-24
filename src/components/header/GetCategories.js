
const getCategories = async (url) => {
  const response = await fetch(url + 'catalog.json');
  const data = await response.json();
  return data.collections;
}

export {getCategories}
