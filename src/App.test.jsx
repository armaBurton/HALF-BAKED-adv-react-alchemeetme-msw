// When in doubt check the docs!
// 🚨🚨 https://mswjs.io/docs/ 🚨🚨

import fetch from 'cross-fetch';
import { screen, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
// 🚨
// import rest
import { rest } from 'msw';
// import setupServer
import { setupServer } from 'msw/node';
import handlers from './mocks/handlers';
import App from './App'

const user = {
  id: 1,
  created_at: '2021-12-13T00:17:29+00:00',
  // 🚨 Add a name here
  name: 'nermal 🌬️🔥',
  avatar: 'https://thumbs.gfycat.com/NiceRequiredGrunion-size_restricted.gif',
  header: 'https://static.wikia.nocookie.net/naruto/images/5/50/Team_Kakashi.png',
  likes: ['React', 'Anime', 'Traveling', 'Living', 'Tower Defense Games', 'Card Games'],
  motto: 'Res Non Verba',
  color: 'crimson',
}

const server = setupServer(
  rest.get(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/users`, (req, res, ctx) => {
    return res(ctx.json([user]));
  })  
)

global.fetch = fetch;

// 🚨 Listen for server start
beforeAll(() => server.listen());

// 🚨 Close server when complete
afterAll(() => server.close());

describe('App', () => {
  test('Should render the header', async () => {
    render(<App />)
    const banner = screen.getByRole('banner')
    const headerImg = screen.getByAltText(/alchemy/i)
    const profileName = await screen.findByText(user.name)

    expect(banner).toHaveStyle({
      background: 'var(--grey)',
    })
    expect(headerImg).toBeInTheDocument()
    expect(profileName).toBeInTheDocument()
  })

  test('Should render the header with Sasuke 🌬️🔥', async () => {
    const sasuke = {
      id: 1,
      created_at: '2021-12-13T00:17:29+00:00',
      name: 'Sasuke 🌬️🔥',
      avatar: 'https://thumbs.gfycat.com/NiceRequiredGrunion-size_restricted.gif',
      header: 'https://static.wikia.nocookie.net/naruto/images/5/50/Team_Kakashi.png',
      likes: ['React', 'Anime', 'Traveling', 'Living', 'Tower Defense Games', 'Card Games'],
      motto: 'Res Non Verba',
      color: 'crimson',
    }

    server.use(
      rest.get(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/users`, (req, res, ctx) => {
        return res(ctx.json([sasuke]));
      })  
    )

    // 🚨 Use the server to change the response for this test
    render(<App />)
    await waitForElementToBeRemoved(screen.getByText(/loading.../i))
    const profileName = await screen.findByRole('heading', {
      name: sasuke.name
    })
    
    console.log('75', sasuke.name);


    expect(profileName).toBeInTheDocument();
  })
});
