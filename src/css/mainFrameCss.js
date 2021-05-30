import styled from '@emotion/styled';

export const MainWrapper = styled.div`
  height: 100vh;
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2a2a2a;
`;
export const Playlists = styled.div`
  display: block;
  height: 30vh;
  object-fit: cover;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(22, 22, 22, 0.8);
    width: 100%;
    height: 30vh;
  }
`;

export const AlbumTop = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  color: #ffffff;
  padding: 0 20px;
  svg {
    color: #ffffff;
  }
`;

export const UserProfile = styled.div`
  z-index: 20;
  display: flex;
  align-items: center;
`;

export const UserIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #3927ff;
  margin: 0 5px;
`;

export const UserName = styled.div`
  font-size: 16px;
`;

export const AlbumBanner = styled.div`
  display: flex;
  padding: 0 70px;
  margin-top: 80px;
  justify-content: space-between;

  img {
    width: 185px;
    height: 185px;
    z-index: 20;
  }
`;

export const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  z-index: 20;
`;

export const AlbumTitle = styled.div`
  font-size: 40px;
  margin-bottom: 30px;
`;

export const AlbumUpdatedTime = styled.div`
  font-size: 16px;
`;

export const AlbumBtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 20;
  justify-content: flex-end;
`;

export const PlayBtn = styled.button`
  width: 82px;
  height: 82px;
  border-radius: 50%;
  border: 0;
  background-image: linear-gradient(to bottom left, #ffa883, #3927ff);
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(to top right, #ffa883, #3927ff);
  }

  svg {
    text-align: center;
    color: #ffffff;
  }
`;

export const List = styled.ul`
  flex: auto;
  width: 100%;
  padding: 80px 0 10px 0;
  background-color: #2a2a2a;
  height: 50vh;
  overflow: hidden;
  overflow-y: scroll;
`;

export const ListItem = styled.li`
  font-size: 18px;
  color: #ffffff;
  margin: 5px 70px;
  padding: 16px 30px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  div {
    margin: 0 5px;
  }

  &:nth-of-type(odd) {
    background-color: #222222;
  }

  &:nth-of-type(even) {
    background-color: #2a2a2a;
  }

  &:hover,
  &.active {
    background-image: linear-gradient(to right, #ffa883, #3927ff);
  }
`;
export const ListTitle = styled.div``;
export const ListNumber = styled.div``;
export const ListInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ListDuration = styled.div`
  margin-right: 70px;
`;

export const ListAddBtn = styled.div`
  margin: 0 10px;
`;

export const ListRemoveBtn = styled.div`
  margin: 0 10px;
`;

export const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justfiy-content: center;
  border-radius: 5px;
  height: 10px;
  margin: 20px 20px 0 20px;
  background-color: #474747;
  cursor: pointer;
`;

export const SliderBtn = styled.div`
  position: absolute;
  margin-left: -5px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  background-color: #d8d8d8;
  z-index: 20;
  cursor: pointer;
`;

export const Slider = styled.div`
  display: flex;
  justfiy-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 10px;
  border-radius: 5px;
  background-image: linear-gradient(to bottom left, #ffa883, #3927ff);
  z-index: 10;
`;

export const PlayerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 30px 10px 0 10px;
`;

export const PlayTime = styled.div`
  color: #474747;
  font-size: 18px;
`;

export const BtnWrapper = styled.div`
  display: flex;

  div {
    padding: 0 20px;
  }
`;

export const Play = styled.div`
  color: #474747;
  cursor: pointer;
  &:hover {
    color: #7a7a7a;
  }
`;

export const Prev = styled.div`
  color: #474747;
  cursor: pointer;
  &:hover {
    color: #7a7a7a;
  }
`;

export const Next = styled.div`
  color: #474747;
  cursor: pointer;
  &:hover {
    color: #7a7a7a;
  }
`;

export const Repeat = styled.div`
  color: #474747;
  cursor: pointer;

  &.active {
    color: #7a7a7a;
  }
`;

export const Volume = styled.div`
  display: flex;
  color: #474747;
  align-items: center;

  svg {
    cursor: pointer;
  }

  &:hover {
    color: #7a7a7a;
  }
`;

export const RangeBar = styled.div`
  width: 150px;
  position: relative;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justfiy-content: center;
  height: 10px;
  margin: 0 10px;
  background-color: #474747;
  cursor: pointer;
`;

export const RangeBtn = styled.div`
  margin-left: -5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #d8d8d8;
  z-index: 20;
  cursor: pointer;
`;

export const Range = styled.div`
  width: 150px;
  display: flex;
  justfiy-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 10px;
  border-radius: 5px;
  background-image: linear-gradient(to bottom left, #ffa883, #3927ff);
  z-index: 10;
`;
