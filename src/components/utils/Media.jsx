import axios from "axios";

export const getMediaData = async (mediaType) => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=d7bdcd1014a78f6a22cff85ceee0d455`
  );
  return data.results;
};

export const getMediaDetailsData = async (media, id) => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=d7bdcd1014a78f6a22cff85ceee0d455&language=en-US`
  );
  return data;
};
