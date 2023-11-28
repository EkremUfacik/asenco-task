This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description
There are two channels, each functioning as a random number generator. They
produce a random number between 0 and 10 every second. Implement "Start" and
"Stop" buttons. The "Start" button initializes and runs the generators, while the "Stop"
button instructs them to cease operations.
Each channel displays its data on a separate bar chart, with the two charts stacked
vertically. Whenever a new number is produced by a channel, it's added as a new bar
to the right of the previous one, running horizontally on the X-axis. The bar's height
corresponds to the number generated. The generators operate synchronously,
generating one number per second from each channel.

## Build with

- Typescript
- Tailwind CSS
- Shadcn
- React-chartjs-2

## Live 

- https://asenco-task.netlify.app/

## Getting Started

First, run the development server:

```bash
npm install
# and
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

