import { ImageResponse } from '@vercel/og'
import type { NextApiRequest } from 'next'

export const config = {
  runtime: 'experimental-edge',
}

export default async function (req: NextApiRequest) {
  const { searchParams } = new URL(req.url!)
  const title = searchParams.get('title')
  const fontData = await fetch(
    'https://rawcdn.githack.com/xiaojundebug/fonts/a503a5eb4b366306d946a4bb9af0206d70fa5fe0/SmileySans-Oblique.otf',
  ).then(res => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: `linear-gradient(30deg, #fc7474, #ffb26a)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '0 150px',
          }}
        >
          <h1 style={{ fontFamily: 'smiley-sans', fontSize: 64, color: '#fff' }}>{title}</h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'smiley-sans',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  )
}
