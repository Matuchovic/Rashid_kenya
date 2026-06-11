import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text, lang } = await req.json()
    if (!text || !lang) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [{ role: 'user', content: `Translate this review to ${lang}. Return ONLY the translated text, no explanation:\n\n${text}` }]
      })
    })

    const data = await res.json()
    const translated = data.content?.[0]?.text || ''
    return NextResponse.json({ translated })
  } catch {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
