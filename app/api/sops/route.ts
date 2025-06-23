import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  const files = await fs.readdir(path.join(process.cwd(), 'public/assets'))
  const txtFiles = files.filter(f => f.endsWith('.txt'))
  return NextResponse.json({ files: txtFiles })
}
