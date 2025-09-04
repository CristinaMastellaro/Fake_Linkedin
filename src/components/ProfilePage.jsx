import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../components/Main';
import SidebarProfilo from '../components/SidebarProfilo';
import { Row, Col, Spinner } from 'react-bootstrap';
import MiniHero from '../components/MiniHero';
import MyFooter from './MyFooter';
import Messaggistica from './Messaggistica';
import { SAVE_ME_INFO, SAVE_OTHER_INFO, TOKEN } from '../redux/actions';

const ProfilePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.meInfo); // utente loggato dal Redux store
  const loggedUserId = loggedUser?._id;

  const bearer = TOKEN;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const endpoint = id
          ? `https://striveschool-api.herokuapp.com/api/profile/${id}`
          : 'https://striveschool-api.herokuapp.com/api/profile/me';

        const response = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${bearer}` },
        });

        if (!response.ok) throw new Error('Errore nel caricamento del profilo');

        const data = await response.json();

        if (id) {
          dispatch({ type: SAVE_OTHER_INFO, payload: data });
        } else {
          dispatch({ type: SAVE_ME_INFO, payload: data });
        }

        setError(null);
      } catch (err) {
        console.error('Errore!', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  if (loading)
    return (
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <Spinner animation='border' />
        <span className='ms-2'>Caricamento profilo...</span>
      </div>
    );

  if (error)
    return (
      <div className='d-flex justify-content-center align-items-center min-vh-100'>
        <div className='text-center'>
          <h4>Errore nel caricamento</h4>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <>
      <MiniHero />
      <Row>
        <Col xs={12} lg={9}>
          <Main userId={id || 'me'} loggedUserId={loggedUserId} />
        </Col>
        <Col xs={12} lg={3}>
          <SidebarProfilo />
        </Col>
      </Row>
      <div className='mt-5'>
        <Messaggistica />
        <MyFooter />
      </div>
    </>
  );
};

export default ProfilePage;
