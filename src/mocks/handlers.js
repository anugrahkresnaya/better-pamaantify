// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  rest.get('https://api.spotify.com/v1/search?q=takayan&type=track', 
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([{
          artists: { 
            name: 'takayan',
          }
        }]),
      )
    }
  ),
]