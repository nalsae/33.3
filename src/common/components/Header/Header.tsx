import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import {
  LogoLink,
  SearchInput,
  SquareLink,
  ProfileLink,
} from '@/common/components';
import useHandleSubmit from '@/hooks/useHandleSubmit';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, userState } from '@/recoil/globalState';

export interface HeaderProps {
  isLogin: boolean;
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background-color: var(--white);
  min-width: 680px;
  padding: 12px 16px;
  gap: 12px;
  box-shadow: var(--shadow-Header);
  z-index: 2000;

  > a:first-child {
    margin-right: auto;
  }
`;

const Header = ({ ...props }) => {
  // const [isLogin, setIsLogin] = useState(false);
  // const [userId, setUserId] = useState('');

  // const [auth, setAuth] = useRecoilState(authState);
  const isLogIn = useRecoilValue(loginState);
  const userId = useRecoilValue(userState);

  const isMain: boolean = window.location.pathname === '/';

  const SearchInputRender = useHandleSubmit();

  // useEffect(() => {
  //   async function auth() {
  //     try {
  //       const res = await axios.get(`${import.meta.env.VITE_DB_SERVER}auth`, {
  //         withCredentials: true,
  //       });
  //       const {
  //         data: { isLogin, userId },
  //       } = res;

  //       setIsLogIn(isLogin);
  //       setUserId(userId);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   auth();
  // }, [isLogIn, userId]);

  console.log('****', isLogIn);

  return (
    <StyledHeader style={{ height: 64, width: '100vw' }} {...props}>
      <LogoLink height="40px" width="74px" />
      {!isMain && isLogIn !== undefined && (
        <SearchInput size="small" handleSubmit={SearchInputRender} />
      )}
      {isLogIn !== undefined && (
        <SquareLink
          link={isLogIn ? `/mycollections/${userId}` : '/signin'}
          width={178}
        >
          My Collections
        </SquareLink>
      )}
      {isLogIn !== undefined &&
        (isLogIn === true ? (
          <ProfileLink />
        ) : (
          <SquareLink
            backgroundColor="var(--white)"
            color="var(--purple-900)"
            link="/signin"
            transition
            width={97}
          >
            Sign In
          </SquareLink>
        ))}
    </StyledHeader>
  );
};

// Header.defaultProps = {
//   isLogin: false,
// };

export default Header;
