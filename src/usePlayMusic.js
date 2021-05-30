import { useCallback, useEffect, useState } from 'react';

const encodeData = (details) => {
  let formBody = [];
  for (var property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  return formBody;
};

const usePlayMusic = ({ songName }) => {
  const [favoriteList, setFavoriteList] = useState({});
  const url = 'https://www.googleapis.com/youtube/v3';

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      await handleChannelData();
      const [favoriteData] = await Promise.all([handleFavoriteList()]);
      setFavoriteList(favoriteData);
    };
    fetchingData();
  }, []);
  let details = {};

  const handleChannelData = () => {
    details = {
      // 個人頻道id
      id: 'UCC9w8tY9vrDUeHI6PDOHWVw',
      // API key
      key: 'AIzaSyBATR_8HYuNJr0bzEdLY6bQRkcx6mKsZ8M',
      part: 'contentDetails',
    };
    fetch(`${url}/channels?${encodeData(details)}`)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('favoriteId', res.items[0].contentDetails.relatedPlaylists.favorites);
      })
      .catch((error) => console.log('error', error));
  };
  const handleFavoriteList = () => {
    details = {
      key: 'AIzaSyBATR_8HYuNJr0bzEdLY6bQRkcx6mKsZ8M',
      part: 'snippet',
      playlistId: localStorage.getItem('favoriteId'),
      maxResults: 50,
    };
    return fetch(`${url}/playlistItems?${encodeData(details)}`)
      .then((res) => res.json())
      .then((res) => {
        return res.items;
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return;
};
export default usePlayMusic;
