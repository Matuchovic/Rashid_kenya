import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'data', 'reviews.json')
const ADMIN_PASSWORD = 'rashid2026'

function getReviews() {
  try { return JSON.parse(readFileSync(DATA_FILE, 'utf-8')) } catch { return [] }
}

export async function GET() {
  const reviews = getReviews()
  return NextResponse.json(reviews)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, country, text, stars } = body
    if (!name || !country || !text || !stars) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    const reviews = getReviews()
    const newReview = {
      id: Date.now().toString(),
      name: name.trim().slice(0, 60),
      country: country.trim().slice(0, 40),
      text: text.trim().slice(0, 500),
      stars: Math.min(5, Math.max(1, parseInt(stars))),
      date: new Date().toISOString().split('T')[0],
    }
    reviews.unshift(newReview)
    writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2))
    return NextResponse.json(newReview, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, password } = body
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const reviews = getReviews()
    const filtered = reviews.filter((r: any) => r.id !== id)
    writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
