import { server } from '../mocks/server';
import { screen, render, waitFor } from '@testing-library/react';
import CreatePlaylistPage from 'pages/CreatePlaylist';
import { Provider } from 'react-redux';
import store from 'store/store';

describe('CreatePlaylistPage', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('shoould fetch api', async () => {
    render(
      <Provider store={store}>
        <CreatePlaylistPage />
      </Provider>
    )
    await waitFor(()=> {
      expect(screen.getByText('takayan')).toBeInTheDocument()
    })
  });
});
