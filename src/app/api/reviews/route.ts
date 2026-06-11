import { NextRequest, NextResponse } from 'next/server'
import { put, list, del } from '@vercel/blob'

const BLOB_NAME = 'rashid-reviews.json'
const ADMIN_PASSWORD = 'rashid2026'

async function getReviews() {
  try {
    const { blobs } = await list({ prefix: BLOB_NAME })
    if (!blobs.length) return []
    const res = await fetch(blobs[0].url)
    return await res.json()
  } catch { return [] }
}

async function saveReviews(reviews: any[]) {
  await put(BLOB_NAME, JSON.stringify(reviews), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

export async function GET() {
  const reviews = await getReviews()
  return NextResponse.json(reviews)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, country, text, stars } = body
    if (!name || !country || !text || !stars) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    const reviews = await getReviews()
    const newReview = {
      id: Date.now().toString(),
      name: name.trim().slice(0, 60),
      country: country.trim().slice(0, 40),
      text: text.trim().slice(0, 500),
      stars: Math.min(5, Math.max(1, parseInt(stars))),
      date: new Date().toISOString().split('T')[0],
    }
    reviews.unshift(newReview)
    await saveReviews(reviews)
    return NextResponse.json(newReview, { status: 201 })
  } catch (e) {
    console.error(e)
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
    const reviews = await getReviews()
    const filtered = reviews.filter((r: any) => r.id !== id)
    await saveReviews(filtered)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
