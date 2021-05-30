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
    const details = {
      grant_type: 'client_credentials',
      client_id: '9fab72c6f355b2e77e22a569bb669266',
      client_secret: 'a52879fecbd32b8562a9eecd05615b31',
    };
    return fetch('/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodeData(details),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('token', res.access_token);
      })

      .catch((error) => console.log('error', error));
  };

  const handleChartsData = () => {
    return fetch(`/kkboxApi/charts?${encodeData(parameters)}`, {
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        getPlayListInfo(data);
        return data;
      });
  };

  const getPlayListInfo = (chartsList) => {
    return fetch(`/kkboxApi/charts/${chartsList[0].id}?${encodeData(parameters)}`, {
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
