import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStepBackward,
  faStepForward,
  faRedoAlt,
  faPlayCircle,
  faVolumeUp,
  faPlus,
  faMinus,
  faPauseCircle,
  faVolumeMute,
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import YouTube from 'react-youtube';
import {
  MainWrapper,
  Playlists,
  AlbumTop,
  UserProfile,
  UserIcon,
  UserName,
  AlbumBanner,
  AlbumInfo,
  AlbumTitle,
  AlbumUpdatedTime,
  AlbumBtnGroup,
  PlayBtn,
  List,
  ListInfo,
  ListItem,
  ListNumber,
  ListTitle,
  ListDuration,
  ListAddBtn,
  ListRemoveBtn,
  PlayerWrapper,
  PlayTime,
  BtnWrapper,
  Prev,
  Play,
  Next,
  Repeat,
  Volume,
  RangeBar,
  SliderBtn,
  SliderWrapper,
  Slider,
  RangeBtn,
  Range,
} from './css/mainFrameCss';
import { useEffect, useRef, useState } from 'react';

const encodeData = (details) => {
  let formBody = [];
  for (var property in details) {
    const encodedKey = property;
    const encodedValue = details[property];
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  return formBody;
};

const transTime = (time, title) => {
  const second = Math.floor(time % 60);
  const minute = title ? time / 1000 / 60 : time / 60;
  const hour = minute / 60;

  if (minute >= 60) {
    return `${Math.floor(hour)} : ${Math.floor(minute)} : ${second}`;
  }

  if (minute < 10 && second >= 10) {
    return `0${Math.floor(minute)} : ${second}`;
  } else if (minute < 10 && second < 10) {
    return `0${Math.floor(minute)} : 0${second}`;
  } else if (minute > 10 && second < 10) {
    return `${Math.floor(minute)} : 0${second}`;
  } else {
    return `${Math.floor(minute)} : ${second}`;
  }
};

// utube撥放器預設樣式及設定
const opts = {
  height: '0',
  width: '0',
  playerVars: {
    autoplay: 0,
  },
};

// 小數點的四捨五入
const roundDecimal = function (val, precision) {
  return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, precision || 0);
};

const MainFrame = (props) => {
  let songTimer = null;
  const { playList } = props;
  const { images, tracks, title, description, updated_at: updatedAt } = playList;
  // 顯示播放歌曲
  const [player, setPlayer] = useState(null);
  // 顯示現在是哪種狀態
  const [state, setState] = useState(null);
  const [videoId, setVideoId] = useState('qIAFyPYlq_U');
  const [songInfo, setSongInfo] = useState({
    songName: '',
    isLoop: false,
  });
  const [timeInfo, setTimeInfo] = useState({
    currentTime: transTime(0),
    duration: transTime(0),
  });
  // 顯示目前撥放歌曲並加上active的樣式
  const [nowPlayingSong, setNowPlayingSong] = useState({
    songIndex: 0,
    method: '',
  });
  const [volumeInfo, setVolumeInfo] = useState({
    isMuted: false,
    volume: 0,
  });
  const [barPercentage, setBarPercentage] = useState({
    progress: '0%',
    volume: '0%',
  });
  const [mousedown, setMouseDown] = useState(false);
  const sliderRef = useRef();
  const rangeRef = useRef();

  useEffect(() => {
    // 切換播放清單時，預設第一首為播放歌曲
    setNowPlayingSong({
      songIndex: 0,
      method: 'init',
    });

    if (tracks) {
      handleSearch(tracks.data[0].name);
      setSongInfo({
        ...songInfo,
        songName: tracks.data[0].name,
      });
    }
  }, [tracks]);

  const onReady = (event) => {
    setPlayer(event.target);
  };
  const handleSetSongInfo = (event) => {
    setSongInfo({
      ...songInfo,
      songName: tracks.data[0].name,
    });
    setVolumeInfo({
      ...volumeInfo,
      volume: event.target.getVolume(),
    });
  };

  const handleSearch = (songName) => {
    const details = {
      key: 'AIzaSyC9iesWC1JSmk0XPUeVS6t28VVzm_DuH24',
      part: 'snippet',
      q: songName,
    };
    return fetch(`https://www.googleapis.com/youtube/v3/search?${encodeData(details)}`)
      .then((res) => res.json())
      .then((res) => {
        setVideoId(res.items[0].id.videoId);
      })
      .catch((error) => console.log('error', error));
  };

  const handleChangeSong = (song, index) => {
    setNowPlayingSong({
      method: 'change',
      songIndex: index,
    });
    handleSearch(song.name);
  };

  const setSongTimer = () => {
    songTimer = setInterval(() => {
      const percentage = (player.getCurrentTime() / player.getDuration()) * 100;

      setTimeInfo({
        duration: transTime(player.getDuration()),
        currentTime: transTime(player.getCurrentTime()),
      });
      if (percentage) {
        setBarPercentage((prev) => ({
          volume: prev.volume,
          progress: `${roundDecimal(percentage, 2)}%`,
        }));
      } else {
        setBarPercentage((prev) => ({
          volume: prev.volume,
          progress: '0%',
        }));
      }
    }, 1000);
  };

  const onPlayVideo = () => {
    player.playVideo();
    setSongTimer();
  };

  const onPauseVideo = () => {
    player.pauseVideo();
    clearInterval(songTimer);
  };

  const onPrevSong = () => {
    // 第一首沒有上一首，所以讓它去搜尋歌單最後一首
    if (nowPlayingSong.songIndex === 0) {
      setNowPlayingSong({
        ...nowPlayingSong,
        songIndex: tracks.data.length - 1,
      });
      handleSearch(tracks.data[tracks.data.length - 1].name);
    } else {
      setNowPlayingSong({
        ...nowPlayingSong,
        songIndex: tracks.data.length - 1,
      });
      handleSearch(tracks.data[nowPlayingSong.songIndex - 1].name);
    }
  };

  const onNextSong = () => {
    if (nowPlayingSong.songIndex === tracks.data.length - 1) {
      setNowPlayingSong({
        ...nowPlayingSong,
        songIndex: 0,
      });
      handleSearch(tracks.data[0].name);
    } else {
      setNowPlayingSong({
        ...nowPlayingSong,
        songIndex: nowPlayingSong.songIndex + 1,
      });
      handleSearch(tracks.data[nowPlayingSong.songIndex + 1].name);
    }
  };

  const onLoopVideo = () => {
    player.setLoop(true);
    setSongInfo({
      ...songInfo,
      isLoop: !songInfo.isLoop,
    });
  };

  const onChangeVolume = (event) => {
    let mousedown = false;
    const dragVolume = Math.floor((event.nativeEvent.offsetX / rangeRef.current.offsetWidth) * 100);
    if (!mousedown) {
      setBarPercentage({
        ...barPercentage,
        volume: `${roundDecimal(dragVolume, 2)}%`,
      });
      setVolumeInfo({
        isMuted: Number(dragVolume) ? false : true,
        volume: dragVolume,
      });
      player.setVolume(dragVolume);
      mousedown = !mousedown;
    } else {
      mousedown = !mousedown;
    }
  };

  const onMuted = () => {
    // 紀錄每次的聲音大小
    const volume = volumeInfo.volume;

    if (!volumeInfo.isMuted) {
      player.setVolume(0);
      setVolumeInfo({
        ...volumeInfo,
        isMuted: true,
      });
    } else {
      player.setVolume(volumeInfo.volume);
      setVolumeInfo({
        isMuted: false,
        volume: volume,
      });
    }
  };

  const onPlayerStateChange = (event) => {
    if (event.target.getPlayerState() === 1) {
      setState(true);
      handleSetSongInfo(event);
    } else if (event.target.getPlayerState() === 5 && nowPlayingSong.method === 'change') {
      onPlayVideo();
    } else if (!event.target.getPlayerState() && songInfo.isLoop) {
      event.target.clearVideo();
      event.target.playVideo();
    } else if (!event.target.getPlayerState()) {
      // 接續下一首播放
      setNowPlayingSong({
        songIndex: nowPlayingSong.songIndex + 1,
        method: 'change',
      });
      handleSearch(tracks.data[nowPlayingSong.songIndex + 1].name);
    } else {
      setState(false);
    }
  };

  // mouseUp才去改變時間軸
  const clickSliderBar = (event) => {
    const dragTime = (event.nativeEvent.offsetX / sliderRef.current.offsetWidth) * player.getDuration();
    if (!mousedown) {
      songTimer = setTimeout(() => {
        setSongTimer();
        player.seekTo(dragTime, true);
      }, 1000);
      setMouseDown(!mousedown);
    } else {
      player.seekTo(transTime(dragTime), false);
      setMouseDown(!mousedown);
    }
  };

  if (!images) {
    return false;
  }
  return (
    <MainWrapper>
      <Playlists style={{ backgroundImage: `url(${images[0].url})` }}>
        <AlbumTop>
          <UserProfile>
            <UserIcon></UserIcon>
            <UserName>William</UserName>
          </UserProfile>
        </AlbumTop>
        <AlbumBanner>
          <img src={images[0].url} alt={description} />
          <AlbumInfo>
            <AlbumTitle>{title}</AlbumTitle>
            <AlbumUpdatedTime>更新時間：{moment(updatedAt).format('YYYY.MM.DD')}</AlbumUpdatedTime>
          </AlbumInfo>
          <AlbumBtnGroup>
            {!state ? (
              <PlayBtn onClick={onPlayVideo}>
                <FontAwesomeIcon icon={faPlay} size="3x" />
              </PlayBtn>
            ) : (
              <PlayBtn onClick={onPauseVideo}>
                <FontAwesomeIcon icon={faPause} size="3x" />
              </PlayBtn>
            )}
          </AlbumBtnGroup>
        </AlbumBanner>
      </Playlists>
      <List>
        {tracks.data.map((item, index) => (
          <ListItem
            className={`${nowPlayingSong.songIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => handleChangeSong(item, index)}
          >
            <ListNumber>{index + 1}</ListNumber>
            <ListTitle>{item.name}</ListTitle>
            <ListInfo>
              <ListDuration>{transTime(item.duration, item.name)}</ListDuration>
              <ListAddBtn>
                <FontAwesomeIcon icon={faPlus} />
              </ListAddBtn>
              <ListRemoveBtn>
                <FontAwesomeIcon icon={faMinus} />
              </ListRemoveBtn>
            </ListInfo>
          </ListItem>
        ))}
      </List>
      <footer>
        <SliderWrapper ref={sliderRef} onMouseDown={clickSliderBar} onMouseUp={clickSliderBar}>
          <SliderBtn
            onMouseDown={clickSliderBar}
            onMouseUp={clickSliderBar}
            style={{ left: barPercentage.progress }}
          ></SliderBtn>
          <Slider style={{ width: barPercentage.progress }}></Slider>
        </SliderWrapper>
        <PlayerWrapper>
          <PlayTime>
            {timeInfo.currentTime}/{timeInfo.duration}
          </PlayTime>
          <BtnWrapper>
            <Prev onClick={onPrevSong}>
              <FontAwesomeIcon icon={faStepBackward} size="2x" />
            </Prev>
            {!state ? (
              <Play onClick={onPlayVideo}>
                <FontAwesomeIcon icon={faPlayCircle} size="2x" />
              </Play>
            ) : (
              <Play onClick={onPauseVideo}>
                <FontAwesomeIcon icon={faPauseCircle} size="2x" />
              </Play>
            )}
            <Next onClick={onNextSong}>
              <FontAwesomeIcon icon={faStepForward} size="2x" />
            </Next>
            <Repeat className={`${songInfo.isLoop ? 'active' : ''}`} onClick={onLoopVideo}>
              <FontAwesomeIcon icon={faRedoAlt} size="2x" />
            </Repeat>
          </BtnWrapper>
          <Volume>
            {volumeInfo.isMuted ? (
              <FontAwesomeIcon onClick={onMuted} icon={faVolumeMute} size="2x" />
            ) : (
              <FontAwesomeIcon onClick={onMuted} icon={faVolumeUp} size="2x" />
            )}
            <RangeBar ref={rangeRef} onMouseUp={onChangeVolume}>
              <RangeBtn onMouseUp={onChangeVolume} style={{ left: barPercentage.volume }}></RangeBtn>
              <Range style={{ width: barPercentage.volume }}></Range>
            </RangeBar>
          </Volume>
        </PlayerWrapper>
      </footer>
      <YouTube videoId={videoId} onReady={onReady} opts={opts} onStateChange={(e) => onPlayerStateChange(e)} />
    </MainWrapper>
  );
};
export default MainFrame;
