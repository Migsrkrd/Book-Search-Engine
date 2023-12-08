
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { removeBookId } from '../utils/localStorage';
import Auth from '../utils/auth';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  const [removeBook] = useMutation(REMOVE_BOOK);

  let userData = {};

  // useEffect(() => {
  //   if (data) {
  //     setUserData(data.me);
  //   }
  // }, [data]);

  const id_token = localStorage.getItem('id_token');

  const {loading, data} = useQuery(GET_ME, {
    context: {
    headers: {
      authorization: id_token ? `Bearer ${id_token}` : '',
    },
  },
  });

  if(!data) {
    return <h2>LOADING...</h2>;
  }

  if(data && data.me){
    console.log("data.me", data.me);
   userData = data.me;
}
console.log("userData",userData);

  // console.log(userData);

  const handleDeleteBook = async (bookId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
       await removeBook({
        variables: { bookId },
      });


      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
