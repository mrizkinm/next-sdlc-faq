import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from 'path';

export async function POST(req: NextRequest) {
  const { question, sop } = await req.json();
  const sopPath = path.join(process.cwd(), 'public/assets', sop)

  const sourceText = await fs.readFile(sopPath, 'utf-8')

  const prompt = `Jawablah pertanyaan berdasarkan sumber SOP berikut:\n\n${sourceText}\n\nJawab hanya berdasarkan sumber\n\nPertanyaan: ${question}`;

  try {
    const geminiRes = await fetch(`${process.env.GOOGLE_API_URL}?key=${process.env.GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    })

    const data = await geminiRes.json()

    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Maaf, tidak ada jawaban.'

    return NextResponse.json({ answer })
  } catch (error) {
    console.error('Error fetching from Gemini:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil jawaban.' }, { status: 500 });
  }

}