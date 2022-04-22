import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePlaylist from "components/playlist";

test('click create button', () => {
  render(<CreatePlaylist />)

  userEvent.click(screen.getByText('Create'));
  expect(screen.getByRole('button')).toHaveTextContent('Create');
})