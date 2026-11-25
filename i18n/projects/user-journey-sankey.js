window.__I18N_VI__ = window.__I18N_VI__ || {};

window.__I18N_VI__["user-journey-sankey"] = {
  "NETWORK VISUALIZATION &bull; CASE STUDY": "TRỰC QUAN HÓA LUỒNG &bull; CASE STUDY",
  "User Journey &amp; Traffic Flow Analysis via Plotly Sankey":
    "Phân tích Hành trình Người dùng &amp; Luồng Truy cập qua Plotly Sankey",
  "<strong>Role:</strong> Data Analyst (Personal Analytics Project)":
    "<strong>Vai trò:</strong> Data Analyst (Dự án Phân tích Cá nhân)",
  "<strong>Timeline:</strong> Sep 2026": "<strong>Thời gian:</strong> 09/2026",
  "<strong>Stack:</strong> Python 3.x, Pandas, NumPy, Plotly (graph_objects.Sankey)":
    "<strong>Công nghệ:</strong> Python 3.x, Pandas, NumPy, Plotly (graph_objects.Sankey)",
  "<strong>Scope:</strong> 32,313 Orders &bull; 472,871 Sessions &bull; 1,188,124 Pageviews":
    "<strong>Phạm vi:</strong> 32.313 Đơn hàng &bull; 472.871 Phiên truy cập &bull; 1.188.124 Lượt xem trang",

  "1. Dataset, Scope &amp; Business Context": "1. Tập dữ liệu, Phạm vi &amp; Bối cảnh Kinh doanh",
  "<strong>Project Type</strong> Personal Project / Simulated Business Case (Maven Fuzzy Factory)":
    "<strong>Loại dự án</strong> Dự án Cá nhân / Tình huống Kinh doanh Mô phỏng (Maven Fuzzy Factory)",
  "<strong>Dataset Source</strong> Maven Fuzzy Factory Teaching Dataset (5 CSVs: orders, order_items, products, website_sessions, website_pageviews)":
    "<strong>Nguồn dữ liệu</strong> Bộ dữ liệu Maven Fuzzy Factory (5 file CSV: orders, order_items, products, website_sessions, website_pageviews)",
  "<strong>Data Scale</strong> 32,313 orders &bull; 472,871 sessions &bull; 1,188,124 pageviews":
    "<strong>Quy mô dữ liệu</strong> 32.313 đơn hàng &bull; 472.871 phiên &bull; 1.188.124 lượt xem trang",
  "<strong>Time Range &amp; Currency</strong> Mar 2012 – Mar 2015 (3 Years) &bull; USD ($)":
    "<strong>Thời gian &amp; Tiền tệ</strong> 03/2012 – 03/2015 (3 năm) &bull; USD ($)",

  "Standard aggregate bar charts failed to capture how traffic sources filtered into landing pages or the exact product transitions adopted by repeat buyers across multi-touch sessions.":
    "Các biểu đồ cột tổng hợp thông thường không thể hiện được cách nguồn truy cập phân rẽ qua từng trang đích hay lộ trình chuyển đổi sản phẩm của khách mua lặp lại qua nhiều phiên.",
  "Build an <strong>Acquisition Sankey Flow:</strong> <code>UTM Source &rarr; Device &rarr; Landing Page &rarr; Conversion / Drop-off</code>.":
    "Xây dựng <strong>Luồng Sankey Thu hút (Acquisition):</strong> <code>UTM Source &rarr; Thiết bị &rarr; Trang đích &rarr; Chuyển đổi / Rời bỏ</code>.",
  "Build a <strong>Retention Sankey Flow:</strong> <code>1st Purchase &rarr; 2nd Purchase &rarr; 3rd Purchase</code>.":
    "Xây dựng <strong>Luồng Sankey Mua lại (Retention):</strong> <code>Đơn 1 &rarr; Đơn 2 &rarr; Đơn 3</code>.",
  "Apply visual data storytelling via selective opacity to emphasize \"happy paths\" (Conversions &amp; Repurchases) while muting terminal drop-offs.":
    "Áp dụng kể chuyện bằng dữ liệu qua độ mờ chọn lọc nhằm làm nổi bật \"luồng chuyển đổi thành công\" và làm dịu các nhánh thoát.",

  "2. Key Findings &amp; Behavioral Flow Insights":
    "2. Phát hiện Chính &amp; Insight Hành vi Luồng truy cập",
  "Engaged Multi-Page Sessions (261.2k) Conversion by Device (Desktop 14.5% vs. Mobile 6.5%) and Top Repeat-Purchase Transitions. Click image to zoom.":
    "Tỷ lệ chuyển đổi theo Thiết bị trên các Phiên tương tác nhiều trang (261,2k: Desktop 14,5% so với Mobile 6,5%) và Các lộ trình Mua lặp lại hàng đầu. Bấm vào ảnh để phóng to.",
  "<strong>Denominator Scope &amp; the \"Engaged Leaver\" Pattern:</strong> Out of <strong>472,871 total sessions</strong>, <strong>211,640 (44.8%)</strong> were single-pageview bounce sessions and were excluded via a <code>pageviews &gt; 1</code> filter so Sankey 1 focuses strictly on the <strong>261,231 (55.2%)</strong> engaged multi-page sessions. Even within this engaged denominator, the mid-funnel drop-off node dominates over <code>Converted</code>—pinpointing catalog/checkout UX hypotheses beyond initial ad-click quality.":
    "<strong>Phạm vi Mẫu số &amp; Hiện tượng \"Người dùng Tương tác rồi Rời đi\":</strong> Trong <strong>472.871 tổng số phiên</strong>, có <strong>211.640 phiên (44,8%)</strong> chỉ xem đúng 1 trang (bounce) và được lọc bỏ bằng điều kiện <code>pageviews &gt; 1</code> để Sankey 1 tập trung đúng vào <strong>261.231 phiên (55,2%)</strong> tương tác nhiều trang. Ngay cả trong nhóm đã tương tác sâu này, nút rơi rụng giữa phễu vẫn áp đảo nút <code>Converted</code>—cho thấy vấn đề nằm ở trải nghiệm danh mục/thanh toán chứ không chỉ do chất lượng click quảng cáo.",
  "<strong>Device Conversion Discrepancy:</strong> Desktop sessions flow smoothly into the <code>Converted</code> node, whereas Mobile traffic disproportionately terminates at the <code>Drop-off</code> node.":
    "<strong>Chênh lệch Chuyển đổi theo Thiết bị:</strong> Phiên trên Desktop đi khá mượt về nút <code>Converted</code>, trong khi lưu lượng Mobile đổ dồn bất thường về nút <code>Drop-off</code>.",
  "<strong>The Gateway &amp; Cross-Pollination Journey:</strong> <ul> <li><em>The Original Mr. Fuzzy</em> serves as the primary top-of-funnel gateway item, dominating Node 1.</li> <li>Repeat-purchase paths consistently transition from <em>Mr. Fuzzy (Purchase 1)</em> &rarr; <em>Love Bear (Purchase 2)</em>. Customers rarely purchase the exact same plush toy twice, favoring cross-catalog exploration.</li> </ul>":
    "<strong>Sản phẩm Cửa ngõ &amp; Hành trình Mua chéo:</strong> <ul> <li><em>The Original Mr. Fuzzy</em> đóng vai trò sản phẩm cửa ngõ chính ở đầu phễu, chiếm ưu thế ở Nút 1.</li> <li>Các luồng mua lại liên tục chuyển dịch từ <em>Mr. Fuzzy (Đơn 1)</em> &rarr; <em>Love Bear (Đơn 2)</em>. Khách hàng hiếm khi mua trùng cùng một mẫu thú bông hai lần mà có xu hướng khám phá sang mẫu khác.</li> </ul>",

  "3. Methodology &amp; Analysis Fixes": "3. Phương pháp &amp; Cải tiến Kỹ thuật",
  "<strong>Preventing Circular Link Kernel Crashes:</strong> Plotly Sankey diagrams fail when target nodes loop back into identical source nodes. Resolved by prefixing chronological order rankings (<code>1 - Product A</code> &rarr; <code>2 - Product A</code>), ensuring every node in the directed acyclic graph (DAG) remains strictly unique.":
    "<strong>Ngăn lỗi Crash do Vòng lặp Đồ thị:</strong> Biểu đồ Sankey của Plotly bị lỗi khi nút đích quay ngược về cùng tên nút nguồn. Khắc phục bằng cách gắn tiền tố thứ tự đơn hàng theo thời gian (<code>1 - Product A</code> &rarr; <code>2 - Product A</code>), đảm bảo mọi nút trong đồ thị có hướng không chu trình (DAG) đều duy nhất.",
  "<strong>Memory Optimization on 1M+ Row Joins:</strong> Reduced RAM overhead by specifying <code>usecols</code> during <code>pd.read_csv()</code> and aggregating standalone tables via <code>.groupby().first()</code> before performing final joins.":
    "<strong>Tối ưu RAM khi Join hơn 1 triệu dòng:</strong> Giảm tải bộ nhớ bằng cách chỉ định <code>usecols</code> khi đọc <code>pd.read_csv()</code> và tổng hợp các bảng phụ bằng <code>.groupby().first()</code> trước khi thực hiện join.",
  "<strong>Visual De-Noising via Dynamic Link Alpha:</strong> Engineered an automated link-coloring loop: assigned terminal paths (Drop-off/End) a muted gray <code>rgba(200, 200, 200, 0.4)</code> while highlighting converted progression paths in vivid amber/emerald.":
    "<strong>Khử nhiễu Thị giác qua Độ mờ Động:</strong> Viết vòng lặp tô màu luồng tự động: gán màu xám mờ <code>rgba(200, 200, 200, 0.4)</code> cho nhánh thoát (Drop-off/End) và làm nổi bật các luồng chuyển đổi thành công bằng sắc hổ phách/ngọc lục bảo.",
  "<strong>Standardized Acquisition Imputation:</strong> Cleaned fragmented <code>NaN</code> and arbitrary <code>unknown</code> UTM source strings into a unified, business-readable <code>Direct Traffic</code> node.":
    "<strong>Chuẩn hóa Nguồn Truy cập Thiếu nhãn:</strong> Gom các giá trị <code>NaN</code> và chuỗi <code>unknown</code> rời rạc trong UTM thành một nút thống nhất, dễ hiểu là <code>Direct Traffic</code>.",

  "4. Proposed UX &amp; CRM Experiments": "4. Đề xuất Thử nghiệm UX &amp; CRM",
  "<strong>Mobile UI/UX Audit:</strong> Test sticky \"Add to Cart\" CTAs and lighter mobile media payloads to test whether mobile checkout friction drives the observed drop-off discrepancy.":
    "<strong>Rà soát UI/UX trên Mobile:</strong> Thử nghiệm nút \"Thêm vào giỏ\" cố định (sticky CTA) và tối ưu dung lượng ảnh/trang trên mobile để kiểm chứng xem ma sát thanh toán có phải nguyên nhân gây chênh lệch drop-off hay không.",
  "<strong>Lifecycle Cross-Sell Trigger:</strong> Suppress <em>Mr. Fuzzy</em> promos to existing <em>Mr. Fuzzy</em> owners and A/B test a 14-day post-purchase <em>Love Bear</em> email trigger aligned with the observed repurchase flow.":
    "<strong>Kích hoạt Bán chéo theo Vòng đời:</strong> Dừng quảng cáo <em>Mr. Fuzzy</em> với những người đã mua mẫu này và A/B test email gợi ý <em>Love Bear</em> sau 14 ngày mua hàng khớp với quy luật mua lặp lại quan sát được.",

  "Market Basket Analysis": "Phân tích Giỏ hàng &amp; Apriori",

  "<strong>Evaluation Metrics:</strong> Track <strong>Mobile Cart-to-Order Conversion Rate</strong> (UX audit) and <strong>Incremental 30-Day Second-Purchase Rate</strong> vs. control group (CRM trigger).":
    "<strong>Chỉ số Đánh giá:</strong> Theo dõi <strong>Tỷ lệ Chuyển đổi Giỏ hàng &rarr; Đặt đơn trên Mobile</strong> (cho kiểm toán UX) và <strong>Tỷ lệ Mua đơn Thứ 2 sau 30 ngày Tăng thêm</strong> so với nhóm đối chứng (cho kịch bản CRM).",
};
