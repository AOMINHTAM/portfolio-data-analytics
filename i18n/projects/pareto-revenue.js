window.__I18N_VI__ = window.__I18N_VI__ || {};

window.__I18N_VI__["pareto-revenue"] = {
  "E-COMMERCE ANALYTICS &bull; CASE STUDY": "PHÂN TÍCH E-COMMERCE &bull; CASE STUDY",
  "TeddyWorld — Revenue Contribution Analysis via Pareto (80/20)":
    "TeddyWorld — Phân tích Đóng góp Doanh thu theo Quy luật Pareto (80/20)",
  "<strong>Role:</strong> Data Analyst (Personal Analytics Project)":
    "<strong>Vai trò:</strong> Data Analyst (Dự án Phân tích Cá nhân)",
  "<strong>Timeline:</strong> Sep 2026": "<strong>Thời gian:</strong> 09/2026",
  "<strong>Stack:</strong> Python 3.x, Pandas, NumPy, Matplotlib, Seaborn, Jupyter":
    "<strong>Công nghệ:</strong> Python 3.x, Pandas, NumPy, Matplotlib, Seaborn, Jupyter",
  "<strong>Dataset:</strong> 32,313 E-Commerce Orders (Maven Fuzzy Factory)":
    "<strong>Tập dữ liệu:</strong> 32.313 Đơn hàng E-Commerce (Maven Fuzzy Factory)",

  "1. Dataset, Scope &amp; Business Context": "1. Tập dữ liệu, Phạm vi &amp; Bối cảnh Kinh doanh",
  "<strong>Project Type</strong> Personal Project / Simulated Business Case (\"TeddyWorld\")":
    "<strong>Loại dự án</strong> Dự án Cá nhân / Tình huống Kinh doanh Mô phỏng (\"TeddyWorld\")",
  "<strong>Dataset Source</strong> Maven Fuzzy Factory Teaching Dataset (<code>orders</code>, <code>order_items</code>, <code>order_item_refunds</code>, <code>products</code>)":
    "<strong>Nguồn dữ liệu</strong> Bộ dữ liệu Maven Fuzzy Factory (<code>orders</code>, <code>order_items</code>, <code>order_item_refunds</code>, <code>products</code>)",
  "<strong>Scale &amp; Calculation</strong> 32,313 orders &bull; Net Revenue = Gross Revenue &minus; Refunds":
    "<strong>Quy mô &amp; Công thức</strong> 32.313 đơn hàng &bull; Doanh thu Ròng = Doanh thu Gộp &minus; Hoàn tiền",
  "<strong>Time Range &amp; Currency</strong> Mar 2012 – Mar 2015 (3 Years) &bull; USD ($)":
    "<strong>Thời gian &amp; Tiền tệ</strong> 03/2012 – 03/2015 (3 năm) &bull; USD ($)",

  "Using the Maven Fuzzy Factory catalog (\"TeddyWorld\" scenario), this project quantifies SKU-level revenue concentration after refunds to inform inventory safety-stock buffers and ad-spend allocation tests.":
    "Sử dụng danh mục Maven Fuzzy Factory (kịch bản \"TeddyWorld\"), dự án định lượng mức độ tập trung doanh thu theo từng SKU sau hoàn tiền để hỗ trợ thiết lập tồn kho an toàn và thử nghiệm phân bổ ngân sách quảng cáo.",
  "Calculate accurate Net Revenue post-refunds (<code>Net Revenue = Gross Revenue - Refunds</code>).":
    "Tính chính xác Doanh thu Ròng sau hoàn tiền (<code>Net Revenue = Gross Revenue - Refunds</code>).",
  "Determine cumulative revenue contribution per SKU using descending running sums.":
    "Xác định tỷ trọng đóng góp doanh thu tích lũy của từng SKU theo tổng cộng dồn giảm dần.",
  "Segment products into Pareto thresholds: <strong>Top 80% Core</strong> vs. <strong>Bottom 20% Tail</strong>.":
    "Phân nhóm sản phẩm theo ngưỡng Pareto: <strong>Top 80% Cốt lõi</strong> so với <strong>20% Đuôi dài</strong>.",
  "Deliver actionable strategic recommendations for inventory management and digital ad spend.":
    "Đưa ra khuyến nghị chiến lược thực tiễn cho quản trị tồn kho và chi tiêu quảng cáo số.",

  "2. Key Findings &amp; Cumulative Contribution":
    "2. Phát hiện Chính &amp; Tỷ trọng Đóng góp Tích lũy",
  "Dual-Axis Pareto 80/20 Chart: SKU Net Revenue After Refunds &amp; Cumulative Contribution across 32,313 Maven Fuzzy Factory orders. Click image to zoom.":
    "Biểu đồ Pareto 80/20 hai trục: Doanh thu Ròng sau Hoàn tiền theo SKU &amp; Tỷ trọng Tích lũy trên 32.313 đơn hàng Maven Fuzzy Factory. Bấm vào ảnh để phóng to.",
  "The Pareto Principle (80/20 Rule) was clearly validated on the 32,313-order dataset: just <strong>2 core SKUs</strong> account for <strong>80.4% of Net Revenue After Refunds</strong> ($1.49M out of $1.85M total).":
    "Nguyên lý Pareto (Quy tắc 80/20) thể hiện rất rõ trên tập 32.313 đơn hàng: chỉ riêng <strong>2 SKU cốt lõi</strong> đã chiếm tới <strong>80,4% Doanh thu Ròng sau Hoàn tiền</strong> ($1,49M trên tổng $1,85M).",

  "Rank": "Hạng",
  "Product Name": "Tên Sản phẩm",
  "Units Sold": "Số lượng Bán",
  "Net Revenue": "Doanh thu Ròng",
  "Share (%)": "Tỷ trọng (%)",
  "Cumulative (%)": "Tích lũy (%)",
  "Pareto Segment": "Phân nhóm Pareto",
  "Top 80% (Core)": "Top 80% (Cốt lõi)",
  "Secondary Tier": "Nhóm Trung bình",
  "Bottom 20% (Tail)": "20% Đuôi dài",

  "3. Business Insights &amp; Engineering Notes":
    "3. Insight Kinh doanh &amp; Lưu ý Kỹ thuật",
  "<strong>Single SKU Vulnerability:</strong> <strong>62.0%</strong> of net revenue depends on <em>The Original Mr. Fuzzy</em>. Any supply chain bottleneck on this SKU directly disrupts cash flow.":
    "<strong>Rủi ro Phụ thuộc Đơn SKU:</strong> <strong>62,0%</strong> doanh thu ròng phụ thuộc vào <em>The Original Mr. Fuzzy</em>. Bất kỳ gián đoạn chuỗi cung ứng nào ở SKU này đều ảnh hưởng trực tiếp tới dòng tiền.",
  "<strong>Underperforming Long Tail (Inventory Caveat):</strong> Tail SKUs contribute a small fraction of net revenue and gross margin (<code>price_usd - cogs_usd</code>); because the dataset contains no warehouse-holding or storage-cost data, these items are flagged for assortment/margin review rather than assumed storage waste.":
    "<strong>Nhóm Đuôi dài Hiệu suất thấp (Lưu ý dữ liệu kho):</strong> Các SKU đuôi dài đóng góp tỷ trọng nhỏ về doanh thu ròng và biên lợi nhuận gộp (<code>price_usd - cogs_usd</code>); do tập dữ liệu không có chi phí lưu kho, các mã này được gắn cờ rà soát danh mục/biên lợi nhuận thay vì quy kết ngay là lãng phí lưu kho.",
  "<strong>Technical Guardrail:</strong> Refund records must be subtracted prior to grouping to avoid gross revenue inflation. Strict descending sorting (<code>sort_values(ascending=False)</code>) is mandated before <code>.cumsum()</code>.":
    "<strong>Nguyên tắc Kỹ thuật:</strong> Cần trừ các bản ghi hoàn tiền trước khi gom nhóm để tránh thổi phồng doanh thu gộp, và bắt buộc sắp xếp giảm dần (<code>sort_values(ascending=False)</code>) trước khi chạy <code>.cumsum()</code>.",

  "4. Proposed Inventory &amp; Ad-Spend Experiments":
    "4. Đề xuất Thử nghiệm Tồn kho &amp; Ngân sách Quảng cáo",
  "<strong>Prioritized Inventory Buffer:</strong> Enforce stricter safety stocks and supplier lead-time monitoring for the Top 2 core SKUs (<strong>80.4%</strong> net revenue share) to mitigate stockout risk.":
    "<strong>Ưu tiên Đệm Tồn kho An toàn:</strong> Siết chặt mức tồn kho an toàn và theo dõi sát thời gian giao hàng nhà cung cấp cho Top 2 SKU cốt lõi (<strong>80,4%</strong> doanh thu ròng) nhằm giảm rủi ro đứt hàng.",
  "<strong>Tail-SKU Bundling:</strong> Test pairing lower-volume items (<em>Sugar Panda</em> &amp; <em>Mini Bear</em>) with high-traffic flagship plush items to lift basket size without margin-eroding clearance cuts.":
    "<strong>Gom Combo Nhóm Đuôi dài:</strong> Thử nghiệm ghép các mã bán chậm hơn (<em>Sugar Panda</em> &amp; <em>Mini Bear</em>) cùng dòng thú bông chủ lực hút traffic để tăng kích thước giỏ mà không phải xả hàng phá giá.",
  "<strong>Hypothesis — Paid Ad Focus (70–80% Weighting):</strong> Test concentrating 70–80% of paid conversion ad spend toward the Top 2 revenue drivers while monitoring marginal CAC/ROAS so secondary SKU discovery isn't starved.":
    "<strong>Giả thuyết — Tập trung Quảng cáo (Tỷ trọng 70–80%):</strong> Thử nghiệm dồn 70–80% ngân sách quảng cáo chuyển đổi vào Top 2 SKU chủ lực trong khi vẫn theo dõi CAC/ROAS biên để không bóp nghẹt khả năng tiếp cận của các SKU phụ.",

  "ABC Customer Profitability": "Phân khúc Lợi nhuận Pareto ABC",
  "AWS Event-Driven ELT (V5.0.1)": "AWS Event-Driven ELT (V5.0.1)",

  "<strong>Observed Insight vs. Business Hypothesis:</strong> SKU revenue concentration (Top 2 SKUs generating <strong>80.4%</strong> of Net Revenue After Refunds; <em>Mr. Fuzzy</em> alone at <strong>62.0%</strong>) is empirically measured from the 32,313-order dataset. Optimal budget weighting (70–80%) is a proposed allocation hypothesis to verify via channel-level <strong>Incremental ROAS</strong> and <strong>Inventory Turnover</strong> tracking.":
    "<strong>Insight Quan sát so với Giả thuyết Kinh doanh:</strong> Mức độ tập trung doanh thu SKU (Top 2 SKU tạo <strong>80,4%</strong> Doanh thu Ròng sau Hoàn tiền; riêng <em>Mr. Fuzzy</em> chiếm <strong>62,0%</strong>) là số liệu đo đạc thực tế trên 32.313 đơn hàng. Tỷ trọng ngân sách 70–80% là giả thuyết phân bổ đề xuất cần kiểm chứng qua chỉ số <strong>ROAS Tăng thêm</strong> theo kênh và <strong>Vòng quay Tồn kho</strong>.",
};
