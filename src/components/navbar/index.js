import { 
  Button,
  Heading,
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const userData = useSelector(state => state.token.user);
  const isLogin = useSelector(state => state.token.isLogin);
  console.log(userData);
  
  return(
    <header>
      <div className="navbar">
        <Flex 
          justifyContent='space-between'
          alignItems='center'
          m='5'
        >
          <div className="logo">
            <Heading as='h1' size='2xl'>Pamaantify</Heading>
          </div>
          <div className="user-info">
            <Menu>
              {isLogin ? (
                <MenuButton
                as={Button}
                colorScheme='teal'
                variant='ghost'
                rightIcon={<ChevronDownIcon />}
              >
                <Flex alignItems='center'>
                  <Avatar size='sm' mr='2' src={userData.images[0]?.url} />
                  {userData.display_name}
                </Flex>
              </MenuButton>
              ) : ('')}
              <MenuList>
                <MenuGroup>
                  <a href='https://www.spotify.com/us/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account'><MenuItem>My Account</MenuItem></a>
                  <Link to='/user-profile'><MenuItem>Profile</MenuItem></Link>
                </MenuGroup>
                <Link to='/create-playlist'><MenuItem>Create Playlist</MenuItem></Link>
                <MenuDivider />
                <MenuGroup>
                  <a href='/'><MenuItem>Logout</MenuItem></a>
                </MenuGroup>
              </MenuList>
            </Menu>
          </div>
        </Flex>
      </div>
    </header>
  )
}

export default Navbar;