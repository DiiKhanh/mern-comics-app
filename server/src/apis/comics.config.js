const baseUrl = process.env.COMICS_BASE_URL;

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  // console.log(`${baseUrl}${endpoint}?${qs}`);
  return `${baseUrl}${endpoint}?${qs}`;
};

export default { getUrl };