# UTS - Weather Dashboard (UTS Pengembangan Aplikasi Web)

## Deskripsi Singkat
Aplikasi dashboard cuaca menggunakan React + OpenWeatherMap API. Fitur utama:
- Pencarian kota dengan autocomplete
- Menampilkan cuaca saat ini (icon, suhu, kelembaban, kecepatan angin)
- Tabel ramalan 5 hari
- History pencarian disimpan di localStorage
- Toggle unit (Celsius / Fahrenheit)
- Form pengaturan dengan 5 jenis input (text, number, checkbox, radio, select)

## Struktur Project
Lihat file `package.json` dan folder `src/`.

## Cara Menjalankan (Local)
1. Clone repository
2. Tambahkan file `.env.local` di root dengan isi:

```
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
```

3. Install dependencies

```bash
npm install
```

4. Jalankan development server

```bash
npm run start
```

5. Buka http://localhost:5173

## Catatan Penting
- Jangan commit `VITE_OPENWEATHER_API_KEY` ke repository publik. Gunakan environment variables.
- Pastikan API key valid (daftar di https://openweathermap.org/)

## Deployment ke Vercel
1. Push repository ke GitHub
2. Buat project baru di Vercel dan import repositori
3. Di Settings → Environment Variables tambahkan `VITE_OPENWEATHER_API_KEY`
4. Deploy

## Checklist Penilaian (Bagian yang dipenuhi)
- Form: ada SettingsForm dengan 5 input berbeda + validation HTML5
- Table: DataTable implementasi dengan minimal 3 kolom
- CSS Styling: kombinasi selector, pseudo-classes, responsive via media query, Flexbox/Grid
- Modern JS: penggunaan arrow functions, template literals, destructuring, spread, async/await, array methods
- React: functional components, useState/useEffect, props, conditional rendering, event handling, minimal 4 components
- API Integration: fetch, loading state, error handling, transformasi data
- Bonus: README lengkap + panduan deploy

## Pengumpulan
- Nama repo: `uts-pemweb-122140161`
- README sudah diisi dengan:
- Nama: Chikalyz Kayla Putri Maharani Mae
- NIM: 122140161
