import { render, screen } from '@testing-library/react';
import Music from 'components/music';
// import { Provider } from 'react-redux';
// import CreatePlaylistPage from 'pages/CreatePlaylist';
// import data from 'components/data';
// import store from '../store/store';

test('render track component', () => {
  render(<Music />);

  const image = screen.getByTestId('image-preview');
  const title = screen.getByTestId('title');
  const album = screen.getByTestId('album');
  const artist = screen.getByTestId('artist');

  expect(image).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(album).toBeInTheDocument();
  expect(artist).toBeInTheDocument();
})