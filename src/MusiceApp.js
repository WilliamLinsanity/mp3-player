import { useCallback, useEffect, useState } from 'react';
import MainFrame from './MainFrame';
import SideBar from './SideBar';

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

const MusiceApp = () => {
  const [chartsList, setChartsList] = useState([]);
  const [playList, setPlayList] = useState({});
  const parameters = {
    territory: 'TW',
  };
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      await handleLogin();
      const [chartsData] = await Promise.all([handleChartsData()]);
      setChartsList(chartsData);
    };
    fetchingData();
  }, []);

  const handleLogin = () => {
    return fetch('https://music-express1.herokuapp.com', {})
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('token', res.access_token);
      })

      .catch((error) => console.log('error', error));
  };

  const handleChartsData = () => {
    return fetch(`https://api.kkbox.com/v1.1/charts?${encodeData(parameters)}`, {
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        getPlayListInfo(data);
        return data;
      });
  };

  const getPlayListInfo = (chartsList) => {
    return fetch(`https://api.kkbox.com/v1.1/charts/${chartsList[0].id}?${encodeData(parameters)}`, {
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((res) => setPlayList(res));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <SideBar chartsList={chartsList} playList={playList} getPlayListInfo={getPlayListInfo} />
      <MainFrame playList={playList} />
    </>
  );
};
export default MusiceApp;
