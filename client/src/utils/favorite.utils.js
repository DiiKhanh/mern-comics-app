const favoriteUtils = {
  check: ({ listFavorites, comicId }) => listFavorites && listFavorites.find(e => e.comicId.toString() === comicId.toString()) !== undefined
};

export default favoriteUtils;