import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import siteConfig from 'config'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            padding: '0 150px',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          <svg
            width="150"
            height="120"
            viewBox="0 0 150 120"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000"
          >
            <path d="M46.1538 0H69.2307L57.6923 19.9852L46.1538 39.9704L57.6923 59.9556L69.2307 79.9408L46.1538 79.9408L34.6154 59.9556L23.0769 79.9408H0L11.5385 59.9556L23.0769 39.9704L11.5385 19.9852L0 0H23.0769L34.6154 19.9852L46.1538 0Z" />
            <path d="M126.923 19.9852H150L138.462 39.9704L126.923 59.9556L115.385 79.9408L103.846 99.926L92.3077 119.911H69.2307L57.6923 99.926H80.7692L92.3077 79.9408L103.846 59.9556L115.385 39.9704H92.3077L103.846 19.9852H126.923Z" />
          </svg>
          <h1 style={{ fontSize: 84, color: '#000' }}>{siteConfig.name}</h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
