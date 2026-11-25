window.__I18N_VI__ = window.__I18N_VI__ || {};

window.__I18N_VI__["cohort-retention"] = {
  "BEHAVIORAL ANALYTICS &bull; CASE STUDY": "PHÂN TÍCH HÀNH VI &bull; CASE STUDY",
  "Cohort Analysis &amp; Customer Retention Dynamics":
    "Phân tích Cohort &amp; Động lực Giữ chân Khách hàng",
  "<strong>Role:</strong> Data Analyst (Personal Analytics Project)":
    "<strong>Vai trò:</strong> Data Analyst (Dự án Phân tích Cá nhân)",
  "<strong>Timeline:</strong> Sep 2026": "<strong>Thời gian:</strong> 09/2026",
  "<strong>Stack:</strong> Python 3.x, Pandas, NumPy, Matplotlib, Seaborn":
    "<strong>Công nghệ:</strong> Python 3.x, Pandas, NumPy, Matplotlib, Seaborn",
  "<strong>Scope:</strong> 51,290 Line-Items (25,728 Orders) / 17,415 Customers":
    "<strong>Phạm vi:</strong> 51.290 Dòng đơn hàng (25.728 Đơn hàng) / 17.415 Khách hàng",

  "1. Dataset, Scope &amp; The \"Leaky Bucket\" Problem":
    "1. Tập dữ liệu, Phạm vi &amp; Bài toán \"Chiếc xô thủng\" (Leaky Bucket)",
  "<strong>Project Type</strong> Personal Project / Simulated Business Case":
    "<strong>Loại dự án</strong> Dự án Cá nhân / Tình huống Kinh doanh Mô phỏng",
  "<strong>Dataset Source</strong> Simulated E-Commerce CSVs (<code>EcomSales</code>, <code>Customer</code>, <code>Product</code>, <code>Region</code>)":
    "<strong>Nguồn dữ liệu</strong> Bộ CSV E-Commerce mô phỏng (<code>EcomSales</code>, <code>Customer</code>, <code>Product</code>, <code>Region</code>)",
  "<strong>Scale &amp; Anchoring</strong> 51,290 line-items (25,728 orders) across 17,415 customers; 2022 cohorts anchored against 2020–2023 history":
    "<strong>Quy mô &amp; Neo mốc</strong> 51.290 dòng chi tiết (25.728 đơn) trên 17.415 khách hàng; các cohort 2022 được neo theo lịch sử 2020–2023",
  "<strong>Time Range &amp; Currency</strong> Jan 2020 – Dec 2023 (4 Years) &bull; Simulated USD ($)":
    "<strong>Thời gian &amp; Tiền tệ</strong> 01/2020 – 12/2023 (4 năm) &bull; USD mô phỏng ($)",

  "Despite steady acquisition volumes, revenue fluctuated unpredictably—suggesting a \"leaky bucket\" dynamic where newly acquired customers churned prematurely before returning positive ROI.":
    "Dù lượng khách hàng mới thu hút vẫn đều đặn, doanh thu lại biến động thất thường—dấu hiệu của hiệu ứng \"chiếc xô thủng\", nơi khách mới rời bỏ quá sớm trước khi kịp mang lại ROI dương.",
  "Build a granular Time-Based Cohort model (Acquisition Month vs. Elapsed Months).":
    "Xây dựng mô hình Cohort theo thời gian chi tiết (Tháng mua đầu tiên so với Số tháng trôi qua).",
  "Segment retention performance to identify structural differences between Corporate (B2B) and Consumer (B2C) units.":
    "Phân tách hiệu suất giữ chân để tìm ra khác biệt cấu trúc giữa khối Doanh nghiệp (B2B) và Người tiêu dùng (B2C).",
  "Evaluate the Scale vs. Efficiency trade-off across customer income brackets.":
    "Đánh giá sự đánh đổi giữa Quy mô và Hiệu quả qua các nhóm thu nhập khách hàng.",
  "Audit and resolve data engineering traps including left-truncation bias in cohort tracking.":
    "Kiểm toán và xử lý các bẫy kỹ thuật dữ liệu bao gồm sai lệch cắt trái (left-truncation bias) khi theo dõi cohort.",

  "2. Key Findings &amp; Behavioral Discoveries":
    "2. Phát hiện Chính &amp; Quy luật Hành vi",
  "2022 Monthly Acquisition Cohort Retention Heatmap (Months 1–11) paired with Month-0 Cohort Size using global FirstPurchaseDate anchoring. Click image to zoom.":
    "Heatmap Tỷ lệ Giữ chân Cohort theo Tháng năm 2022 (Tháng 1–11) đặt cạnh Quy mô Cohort Tháng 0 với neo FirstPurchaseDate toàn cục. Bấm vào ảnh để phóng to.",
  "<strong>The Month-1 Churn Cliff:</strong> Across 2022 cohorts, Month-1 repeat purchase rates drop sharply to a <strong>1% to 3% baseline</strong>, highlighting an early post-purchase retention gap to test via lifecycle onboarding (clickstream engagement itself is not directly measured in order logs).":
    "<strong>Vực thẳm Rời bỏ Tháng 1:</strong> Xuyên suốt các cohort 2022, tỷ lệ mua lại ở tháng 1 lao dốc xuống nền <strong>1% đến 3%</strong>, bộc lộ khoảng trống giữ chân sau mua cần thử nghiệm onboarding (lưu ý tương tác clickstream không nằm trong log đơn hàng).",
  "<strong>Corporate (B2B) Restock Cyclicality (Sample Caveat):</strong> Unlike flatter B2C buying, the Corporate segment shows observable retention bumps (+5% to 6%) around <strong>Month 5</strong> and <strong>Month 8</strong>; because the B2B cohort base is smaller than B2C, persistence should be monitored across future periods.":
    "<strong>Chu kỳ Nhập hàng lại của B2B (Lưu ý cỡ mẫu):</strong> Khác với hành vi phẳng của B2C, phân khúc Doanh nghiệp ghi nhận các nhịp tăng giữ chân (+5% đến 6%) quanh <strong>Tháng 5</strong> và <strong>Tháng 8</strong>; do cỡ mẫu B2B nhỏ hơn B2C nên cần tiếp tục theo dõi ở các kỳ sau.",
  "<strong>The Income Profitability Paradox:</strong> <ul> <li><em>Low-Income Cohort (The Cash Cow):</em> Generated lowest AOV per transaction, but their high volume and consistency produced the largest cumulative profit pool.</li> <li><em>High-Income Cohort (The Cash Grab):</em> Highest profit margin per single order, but had the worst repurchase retention rates.</li> </ul>":
    "<strong>Nghịch lý Lợi nhuận theo Thu nhập:</strong> <ul> <li><em>Nhóm Thu nhập Thấp (\"Con bò sữa\" bền bỉ):</em> AOV mỗi đơn thấp nhất, nhưng nhờ sản lượng lớn và đều đặn nên tạo ra tổng lợi nhuận tích lũy lớn nhất.</li> <li><em>Nhóm Thu nhập Cao (\"Ăn xổi\" đơn lẻ):</em> Biên lợi nhuận trên từng đơn cao nhất, nhưng tỷ lệ quay lại mua tiếp lại thấp nhất.</li> </ul>",

  "3. Methodology &amp; Analysis Fixes": "3. Phương pháp &amp; Cải tiến Kỹ thuật Phân tích",
  "<strong>Eliminated Left-Truncation Bias:</strong> Identified that computing <code>FirstPurchaseDate</code> *after* subsetting 2022 data falsely misclassified returning 2020–2021 buyers as Month-0 acquisitions. Fixed by anchoring first-purchase dates globally across the unpartitioned master table.":
    "<strong>Loại bỏ Sai lệch Cắt trái (Left-Truncation Bias):</strong> Phát hiện việc tính <code>FirstPurchaseDate</code> *sau* khi lọc dữ liệu 2022 đã gán nhầm khách quay lại từ 2020–2021 thành khách mới Tháng 0. Khắc phục bằng cách neo ngày mua đầu tiên trên toàn bộ bảng dữ liệu gốc trước khi cắt lọc.",
  "<strong>Cohort Size Weighting Layout:</strong> Paired absolute acquisition volume bar charts side-by-side with retention heatmaps using <code>gridspec_kw={'width_ratios': [1, 4]}</code> to ensure small cohorts were not over-interpreted.":
    "<strong>Bố cục Cân trọng số Quy mô Cohort:</strong> Ghép biểu đồ cột quy mô khách mới ngay cạnh heatmap tỷ lệ giữ chân bằng <code>gridspec_kw={'width_ratios': [1, 4]}</code> để tránh diễn giải quá mức các cohort cỡ nhỏ.",
  "<strong>Execution Scope Consolidation:</strong> Merged disparate plotting cells into a single Object-Oriented pipeline, resolving broken Matplotlib axes across subplots.":
    "<strong>Hợp nhất Luồng Vẽ biểu đồ:</strong> Gộp các cell rời rạc thành một pipeline hướng đối tượng thống nhất, xử lý lỗi lệch trục Matplotlib giữa các subplot.",
  "<strong>Consolidated Master Ingestion:</strong> Refactored repeated relational joins into an upstream unified <code>df_master</code> table to optimize memory overhead.":
    "<strong>Chuẩn hóa Nạp Dữ liệu Nguồn:</strong> Tái cấu trúc các phép join lặp lại thành một bảng <code>df_master</code> thống nhất ở đầu vào để tối ưu bộ nhớ.",

  "4. Proposed Retention Experiments": "4. Đề xuất Thử nghiệm Giữ chân Khách hàng",
  "<strong>Automated Post-Purchase Nurture:</strong> Pilot an automated re-engagement or \"Subscribe &amp; Save\" sequence triggering at Day 20–25 to address the observed Month-1 drop-off cliff.":
    "<strong>Chăm sóc Tự động Sau mua:</strong> Thử nghiệm chuỗi tái tương tác hoặc gói \"Đăng ký &amp; Tiết kiệm\" kích hoạt ở ngày 20–25 để chặn đà rơi rụng ở tháng 1.",
  "<strong>B2B Restock CRM Alerts:</strong> Schedule outbound prompts for corporate account managers at Month 4 and Month 7 ahead of the observed Month 5 / Month 8 B2B restock cycles.":
    "<strong>Cảnh báo CRM Nhắc nhập hàng B2B:</strong> Lên lịch nhắc chuyên viên phụ trách khách hàng doanh nghiệp vào tháng 4 và tháng 7, đón đầu chu kỳ nhập lại tháng 5 / tháng 8.",
  "<strong>First-Session Cart Upsells:</strong> Test first-order bundle incentives for high-income buyers where single-purchase margin is high but repeat frequency is low.":
    "<strong>Upsell Ngay đơn Đầu tiên:</strong> Thử nghiệm ưu đãi combo ngay từ đơn đầu cho nhóm khách thu nhập cao—nơi biên lợi nhuận mỗi đơn cao nhưng tần suất quay lại thấp.",

  "Product Conversion Funnel": "Hiệu suất Sản phẩm &amp; Phễu Chuyển đổi",
  "User Journey Sankey Flow": "Hành trình Người dùng (Sankey)",

  "<strong>Measurement Framework:</strong> Evaluate via cohort holdout groups tracking <strong>Month-1 &amp; Month-3 Retention Rate</strong>, <strong>B2B Reorder Conversion</strong>, and <strong>Contribution Margin After Discount</strong>.":
    "<strong>Khung Đo lường:</strong> Đánh giá qua các nhóm đối chứng theo cohort (holdout), theo dõi <strong>Tỷ lệ Giữ chân Tháng 1 &amp; Tháng 3</strong>, <strong>Tỷ lệ Đặt lại của B2B</strong> và <strong>Biên đóng góp Sau Giảm giá</strong>.",
};
