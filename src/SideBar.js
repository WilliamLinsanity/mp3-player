import styled from '@emotion/styled';

const SideBar = (props) => {
  let { chartsList, playList, getPlayListInfo } = props;
  const SideBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #222222;
    color: #979797;
    width: 15rem;
    height: 100vh;
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
  `;
  const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #161616;
    padding: 23px;
    color: #7a7a7a;
  `;
  const Title = styled.div`
    font-size: 18px;
    line-height: 40px;
  `;
  const AddButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;

    &:after,
    &:before {
      content: '';
      display: block;
      background-color: #7a7a7a;
      position: absolute;
      transform: translate(-50%, -50%);
    }

    &:before {
      height: 1em;
      width: 0.2em;
    }

    &:after {
      height: 0.2em;
      width: 1em;
    }
  `;
  const Navbar = styled.ul`
    list-style: none;
    font-size: 16px;
    padding: 0;
    margin: 0;
    overflow-y: auto;
  `;
  const NavbarItem = styled.li`
    padding: 12px 0 14px 16px;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-image: linear-gradient(to right, #ffa883, #3927ff);
      color: #ffffff;
    }
  `;

  // const [nowPlayId, setNowPlayId] = useState('');
  const handleChange = (e) => {
    const { id } = e.target;
    const nowPlayList = [{ id }];
    getPlayListInfo(nowPlayList);
  };
  return (
    <SideBarWrapper style={{ display: playList.images ? 'flex' : 'none' }}>
      <TitleWrapper>
        <Title>暢銷榜單</Title>
        <AddButton></AddButton>
      </TitleWrapper>
      <Navbar>
        {chartsList.map((item) => (
          <NavbarItem key={item.id} id={item.id} onClick={handleChange}>
            {item.title}
          </NavbarItem>
        ))}
      </Navbar>
    </SideBarWrapper>
  );
};
export default SideBar;
