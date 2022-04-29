// import { rest } from 'msw';

// const user = {
//   id: 1,
//   created_at: '2021-12-13T00:17:29+00:00',
//   // 🚨 Add a name here
//   name: 'Sasuke 🌬️🔥',
//   avatar: 'https://thumbs.gfycat.com/NiceRequiredGrunion-size_restricted.gif',
//   header: 'https://static.wikia.nocookie.net/naruto/images/5/50/Team_Kakashi.png',
//   likes: ['React', 'Anime', 'Traveling', 'Living', 'Tower Defense Games', 'Card Games'],
//   motto: 'Res Non Verba',
//   color: 'crimson',
// }

// const handlers = [
//   rest.get('/users', (req, res, ctx) => {
//     return res(
//       ctx.json(user)
//     )
//   }),

//   rest.get('/users?select=*', (req, res, ctx) => {
//     return res(
//       ctx.json(user)
//     )
//   })
// ]

// export default handlers;