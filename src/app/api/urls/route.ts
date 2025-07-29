import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'linkwise';
const COLLECTION = 'urls';


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const urls = await db.collection(COLLECTION).find({}).toArray();
    return NextResponse.json(urls);
  } catch (error) {
    console.error('GET /api/urls error:', error);
    return NextResponse.json({ error: 'Failed to fetch URLs', details: String(error) }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const data = await req.json();
    const result = await db.collection(COLLECTION).insertOne(data);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error) {
    console.error('POST /api/urls error:', error);
    return NextResponse.json({ error: 'Failed to add URL', details: String(error) }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { id } = await req.json();
    const result = await db.collection(COLLECTION).deleteOne({ id });
    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error('DELETE /api/urls error:', error);
    return NextResponse.json({ error: 'Failed to delete URL', details: String(error) }, { status: 500 });
  }
}
