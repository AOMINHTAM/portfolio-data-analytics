# Từ điển Thuật ngữ SEO & Hướng dẫn Google Search Console cho Portfolio

Tài liệu này giải thích ngắn gọn các kỹ thuật SEO đã áp dụng trực tiếp cho portfolio tại `https://aominhtam-portfolio.vercel.app/`, giúp bạn hiểu bản chất và tự tin trả lời nếu có câu hỏi về cách tổ chức website cá nhân.

---

## 1. Giải thích các thuật ngữ SEO đã áp dụng

| Thuật ngữ | Ý nghĩa đơn giản | Tác dụng thực tế trên Portfolio của bạn |
| :--- | :--- | :--- |
| **`<title>` (Title Tag)** | Tiêu đề chính thức của một trang web hiển thị trên tab trình duyệt và dòng chữ xanh lớn nhất trên kết quả tìm kiếm Google. | Khi HR gõ tên bạn (`Ao Minh Tam Data Analyst`), Google lấy `<title>` để hiển thị tiêu đề trang chủ hoặc từng trang case study con. |
| **`<meta name="description">`** | Đoạn tóm tắt 140–160 ký tự mô tả nội dung chính của trang đó. | Giúp Google hiển thị phần mô tả gọn gàng ngay dưới tiêu đề thay vì tự cắt ghép ngẫu nhiên các chữ trong thanh menu/nút bấm. |
| **`<link rel="canonical">`** | Khai báo "địa chỉ URL gốc duy nhất" của trang web. | Tránh tình trạng Google coi `aominhtam-portfolio.vercel.app/` và `aominhtam-portfolio.vercel.app/index.html` (hoặc link có `?utm_source=...`) là hai trang trùng lặp nhau. |
| **`robots.txt`** | File văn bản ở thư mục gốc (`.../robots.txt`) hướng dẫn các bot tìm kiếm (Googlebot, Bingbot) được phép đọc phần nào của website. | Cho phép bot thu thập toàn bộ các trang công khai và chỉ thẳng đường tới file `sitemap.xml`. |
| **`sitemap.xml`** | Bản đồ XML liệt kê danh sách tất cả các trang quan trọng trên website kèm ngày cập nhật gần nhất (`<lastmod>`). | Giúp Google phát hiện và lập chỉ mục (index) đầy đủ cả 1 trang chủ + 9 trang Case Study con nhanh hơn nhiều so với việc chờ bot tự mò link. |
| **Open Graph (`og:*`) & Twitter Card** | Bộ thẻ `<meta property="og:...">` chuẩn hóa cách hiển thị khi bạn dán URL lên mạng xã hội (LinkedIn, Facebook, Zalo, Slack, Discord). | Khi bạn gửi link case study `aws-data-pipeline.html` cho HR hoặc đăng lên LinkedIn, khung xem trước sẽ hiện đúng Tiêu đề + Mô tả chuyên nghiệp. |
| **Structured Data (`Schema.org JSON-LD`)** | Đoạn JSON ẩn trong `<head>` viết theo chuẩn từ điển dữ liệu của Google (`Person` cho trang chủ, `CreativeWork` cho từng Case Study). | Giúp máy tìm kiếm hiểu rõ thực thể: tác giả là *Ao Minh Tâm*, công nghệ sử dụng là *AWS / dbt / Airflow / Python / SQL*, và liên kết trực tiếp tới mã nguồn GitHub (`codeRepository`). |
| **Semantic HTML & Heading (`H1 → H2 → H3`)** | Dùng đúng thẻ ngữ nghĩa (`<nav>`, `<main>`, `<footer>`, `<h1>` chỉ xuất hiện 1 lần cho tiêu đề chính, không nhảy cóc từ `<h2>` xuống `<h4>`). | Vừa giúp trình đọc màn hình (Accessibility) và Google hiểu cấu trúc nội dung phân cấp rõ ràng. |
| **Image SEO (`alt` & `loading="lazy"`)** | Thuộc tính `alt` mô tả nội dung ảnh bằng văn bản; `loading="lazy"` trì hoãn tải các ảnh nằm dưới màn hình đầu tiên cho tới khi người dùng cuộn xuống. | `alt` giúp Google Hình ảnh hiểu nội dung sơ đồ kiến trúc; `loading="lazy"` giúp trang `aws-data-pipeline.html` (với 7 ảnh lớn) mở nhanh hơn trên di động mà không làm giảm chất lượng ảnh. |

---

## 2. Những thứ KHÔNG làm (và lý do)

* **Không đổi cấu trúc URL đang chạy (`/projects/*.html`):** Toàn bộ 10 repository GitHub của bạn và Google Analytics đã gắn cứng link tới `/projects/*.html`. Đổi URL mà không cấu hình redirect trên static host sẽ tạo ra hàng loạt lỗi `404 Not Found`.
* **Không nhồi nhét từ khóa (Keyword Stuffing) hay viết blog câu view:** Google phạt nội dung lặp từ khóa máy móc, và HR đọc vào sẽ mất cảm tình. Mục tiêu SEO của portfolio là **Personal Branding Search** (HR search đúng tên + vị trí của bạn là ra trang chuẩn đẹp).

---

## 3. Hướng dẫn kết nối Google Search Console (Làm 1 lần trong 3 phút)

Sau khi code đã deploy xong lên Vercel (`https://aominhtam-portfolio.vercel.app/`):

1. Truy cập [Google Search Console](https://search.google.com/search-console) và đăng nhập bằng Gmail cá nhân.
2. Chọn **Add property** → Chọn cột bên phải **URL prefix** → Dán `https://aominhtam-portfolio.vercel.app/` → Bấm **Continue**.
3. **Xác minh quyền sở hữu (Verify):**
   * Chọn phương thức **HTML tag** (Google sẽ cấp 1 dòng `<meta name="google-site-verification" content="..." />`).
   * Copy dòng đó gắn vào `<head>` của `index.html`, push lên GitHub để Vercel deploy xong, rồi quay lại bấm **Verify** (hoặc nếu bạn đã đăng nhập Google Analytics cùng Gmail `G-VRB4RENV7J`, có thể chọn xác minh tự động bằng **Google Analytics** không cần sửa code).
4. **Khai báo Sitemap:**
   * Ở menu bên trái, vào mục **Indexing → Sitemaps**.
   * Ở ô *Add a new sitemap*, nhập `sitemap.xml` → Bấm **Submit**.
5. **Kiểm tra trạng thái:**
   * Dùng thanh tìm kiếm **URL Inspection** ở trên cùng, dán link `https://aominhtam-portfolio.vercel.app/` và `.../projects/aws-data-pipeline.html` rồi bấm **Request Indexing** để Google ưu tiên đưa lên kết quả tìm kiếm ngay trong vài ngày thay vì chờ tự động.
   * Sau 1–2 tuần, bạn có thể thử gõ trên Google: `site:aominhtam-portfolio.vercel.app` để xem bao nhiêu trang đã được đưa vào chỉ mục.
