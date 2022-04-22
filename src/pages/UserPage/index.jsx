import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import Navbar from "components/navbar";
import { useSelector } from "react-redux"

const UserPage = () => {
  const userData = useSelector(state => state.token.user)
  console.log(userData);
  return (
    <>
      <Navbar />
      <div className="heading">
        <Heading as="h1" size='2xl' color='teal.200' m={10}>User Profile</Heading>
      </div>
      <div className="profile">
        <Flex mt='10' ml='10'>
          <div className="profile-image">
            <Image 
              src={userData.images[0].url}
              alt="profile image"
            />
          </div>
          <div className="profile-info">
            <Heading as="h1" size='4xl' ml={5} color='teal.200'>{userData.display_name}</Heading>
            <Text fontSize='lg' ml={5} mt='10'>Followers: {userData.followers.total}</Text>
          </div>
        </Flex>
      </div>
    </>
  )
};

export default UserPage;