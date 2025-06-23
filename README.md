# next-sdlc-faq

Project ini adalah aplikasi FAQ berbasis Next.js.

## Fitur

- Menggunakan Next.js App Router.
- Mendukung TypeScript.
- API endpoint untuk chat dan pengambilan SOP.
- Integrasi dengan layanan eksternal (misal: Google Gemini API) untuk menjawab pertanyaan.
- Styling dengan Tailwind CSS.

## Cara Menjalankan

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Ubah file `.env.example` menjadi `.env` dan isi variabel berikut:**
   ```bash
   cp .env.example .env
   ```
   ```
   GOOGLE_API_URL=...
   GOOGLE_API_KEY=...
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```

4. Buka [http://localhost:3000](http://localhost:3000) di browser.

## Penggunaan

- Upload file SOP ke folder `public/assets/`.
- Gunakan halaman utama untuk mengajukan pertanyaan terkait SOP.

## Skrip

- `npm run dev` — Menjalankan server development.
- `npm run build` — Build aplikasi untuk production.
- `npm run start` — Menjalankan aplikasi production.
- `npm run lint` — Menjalankan linter.

## Teknologi

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)