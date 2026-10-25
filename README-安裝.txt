倉衡 — 離線 PWA 安裝說明
========================

這份壓縮包係可獨立運行嘅靜態網頁 App（Service Worker 快取殼層）。
結單 PDF 用瀏覽器本機 pdf.js 解析，唔經伺服器、唔食 Grok Bot 用量。

重要限制
--------
- 純 file:// 開啟通常會令 Service Worker／模組載入失敗，唔建議。
- 請用本機靜態伺服器（或任何 HTTPS／localhost 靜態托管）打開。

A. 電腦（建議）
---------------
1. 解壓本 zip 到任意資料夾（入面要見到 index.html）。
2. 喺該資料夾開終端機，執行：

   npx --yes serve -s .

   （或：python3 -m http.server 4173）
3. 瀏覽器打開顯示嘅網址（多數係 http://localhost:3000 或 :4173）。
4. 首次打開後可離線使用；Chrome／Edge 可「安裝應用程式」加到桌面。
5. 匯入結單：App 內「匯入」上載最多 3 份富途 PDF（2 孖展 + 1 加密）。

B. 手機
-------
1. 用電腦按 A 起本機伺服器，確保手機同電腦喺同一 Wi‑Fi。
2. 手機瀏覽器打開電腦嘅區網 IP（例如 http://192.168.1.23:3000）。
   （查 IP：macOS/Linux 用 ifconfig／ip addr；Windows 用 ipconfig）
3. iPhone Safari：分享 → 「加入主畫面」。
   Android Chrome：選單 → 「安裝應用程式」／「加到主畫面」。
4. 或者將解壓後嘅檔案放到你自己嘅 HTTPS 靜態空間（GitHub Pages、Cloudflare Pages、
   Netlify、自家 NAS 等），再用手機打開該網址安裝。

C. 資料同私隱
-------------
- 持倉存在瀏覽器 localStorage（鍵名 cangheng-book-v4）。
- 結單只喺你部裝置解析，唔會上載到呢個 zip 附帶嘅任何伺服器。

版本備註
--------
- 內置示例：證券結單 2026/10/22；加密戶示例仍為 2026/10/08（直至你匯入更新 PDF）。
