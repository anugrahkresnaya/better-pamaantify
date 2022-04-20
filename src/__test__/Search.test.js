import { render, screen } from '@testing-library/react';
import CreatePlaylist from '../components/playlist';
import { server } from '../mocks/server';
import { waitFor } from '@testing-library/dom';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('shoould render track component', async () => {
  const spotData = await fetch('https://api.spotify.com/v1/search?q=takayan&type=track')
  .then(data => data.json())
  .catch(err => console.log(err))
  await waitFor(() => {
    expect(spotData.items).toBeTruthy()
  })
});
