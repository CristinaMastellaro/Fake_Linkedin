import { useEffect, useState } from 'react';
import Main from '../components/Main';
import SidebarProfilo from '../components/SidebarProfilo';
import { Row, Col } from 'react-bootstrap';
import MiniHero from '../components/MiniHero';
import FooterProfile from './MyFooter';
import { useDispatch } from 'react-redux';
import { SAVE_ME_INFO, saveMeInfoAction } from '../redux/actions';

const ProfilePage = () => {
  const [showMiniHero, setShow] = useState(false);
  const bearer =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1YTFkOTE2MjdjNjAwMTVmOGM1NmMiLCJpYXQiOjE3NTY3MzM5MTMsImV4cCI6MTc1Nzk0MzUxM30.SOLseepU4Ysb0KnFQYR3yWP1jikhGc89-HCynCKAhuY';

  const dispatch = useDispatch();

  fetch('https://striveschool-api.herokuapp.com/api/profile/me', {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  })
    .then((data) => {
      if (data.ok) {
        return data.json();
      } else {
        throw new Error('Erroreeee');
      }
    })
    .then((data) => {
      console.log('data', data);
      dispatch({ type: SAVE_ME_INFO, payload: data });
    })
    .catch((err) => console.log('Errore!', err));

  // useEffect(() => {
  //   dispatch(saveMeInfoAction(bearer));
  // }, []);

  window.addEventListener('scroll', () => {
    const positionY = window.scrollY;
    if (positionY > 300) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  return (
    <>
      <MiniHero showMiniHero={showMiniHero} />
      <Row>
        <Col xs={12} lg={9}>
          <Main />
        </Col>
        <Col xs={12} lg={3}>
          <SidebarProfilo />
        </Col>
      </Row>
      <FooterProfile />
    </>
  );
};

export default ProfilePage;
