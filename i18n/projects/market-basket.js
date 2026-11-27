window.__I18N_VI__ = window.__I18N_VI__ || {};

window.__I18N_VI__["market-basket"] = {
  "ASSOCIATION RULES &bull; CASE STUDY": "LUẬT KẾT HỢP &bull; CASE STUDY",
  "Market Basket Analysis &amp; Product Bundling Strategy":
    "Phân tích Giỏ hàng &amp; Chiến lược Bán kèm Sản phẩm",
  "<strong>Role:</strong> Data Analyst (Personal Analytics Project)":
    "<strong>Vai trò:</strong> Data Analyst (Dự án Phân tích Cá nhân)",
  "<strong>Timeline:</strong> Aug – Sep 2026": "<strong>Thời gian:</strong> 08 – 09/2026",
  "<strong>Stack:</strong> Python 3.x, mlxtend (Apriori), TransactionEncoder, Pandas, NumPy, Seaborn":
    "<strong>Công nghệ:</strong> Python 3.x, mlxtend (Apriori), TransactionEncoder, Pandas, NumPy, Seaborn",
  "<strong>Scope:</strong> 51,290 Line-Items across 25,728 Distinct Order Baskets":
    "<strong>Phạm vi:</strong> 51.290 Dòng sản phẩm trên 25.728 Giỏ hàng duy nhất",

  "1. Dataset, Scope &amp; Business Context": "1. Tập dữ liệu, Phạm vi &amp; Bối cảnh Kinh doanh",
  "<strong>Project Type</strong> Personal Project / Simulated Business Case":
    "<strong>Loại dự án</strong> Dự án Cá nhân / Tình huống Kinh doanh Mô phỏng",
  "<strong>Dataset Source</strong> Simulated E-Commerce CSVs (<code>EcomSales</code>, <code>Product</code>)":
    "<strong>Nguồn dữ liệu</strong> Bộ CSV E-Commerce mô phỏng (<code>EcomSales</code>, <code>Product</code>)",
  "<strong>Scale &amp; Deduplication</strong> 51,290 line-items grouped into 25,728 unique <code>OrderID</code> baskets":
    "<strong>Quy mô &amp; Khử trùng</strong> 51.290 dòng sản phẩm gom thành 25.728 giỏ hàng <code>OrderID</code> duy nhất",
  "<strong>Time Range &amp; Currency</strong> Jan 2020 – Dec 2023 (4 Years) &bull; Simulated USD ($)":
    "<strong>Thời gian &amp; Tiền tệ</strong> 01/2020 – 12/2023 (4 năm) &bull; USD mô phỏng ($)",

  "<strong>Business Pain-Point:</strong> Generic storewide discounts erode gross margin without guaranteeing larger baskets, while intuition-based cross-selling misses real buyer habits. This analysis replaces guesswork with Apriori association rule mining across deduplicated order baskets to design margin-conscious bundles that lift Average Order Value (AOV).":
    "<strong>Bài toán Kinh doanh:</strong> Giảm giá đại trà toàn sàn làm xói mòn biên lợi nhuận gộp mà không chắc tăng kích thước giỏ hàng, trong khi bán chéo cảm tính bỏ lỡ thói quen mua thật. Phân tích này thay thế suy đoán bằng khai phá luật kết hợp Apriori trên giỏ hàng đã khử trùng để thiết kế các combo tối ưu biên lợi nhuận nhằm tăng Giá trị Đơn hàng Trung bình (AOV).",
  "Perform Exploratory Data Analysis (EDA) on basket size distributions and top-moving categories.":
    "Thực hiện Phân tích Khám phá (EDA) về phân bố kích thước giỏ hàng và các nhóm hàng bán chạy nhất.",
  "Apply the <strong>Apriori Algorithm</strong> to compute Support, Confidence, and Lift for co-occurring product combinations.":
    "Áp dụng <strong>Thuật toán Apriori</strong> để tính các chỉ số Support, Confidence và Lift cho những tổ hợp sản phẩm hay đi cùng nhau.",
  "Identify cohesive \"Shopping Ecosystems\" to engineer high-margin product bundles (e.g., <em>Weekend Reset Kit</em>).":
    "Nhận diện các \"Hệ sinh thái Mua sắm\" gắn kết nhằm thiết kế các gói combo biên lợi nhuận cao (ví dụ: <em>Weekend Reset Kit</em>).",

  "2. Key Findings &amp; Behavioral Affinity Rules":
    "2. Phát hiện Chính &amp; Luật Gắn kết Hành vi",
  "Top 10 Subcategories by Order Presence &amp; Deduplicated Basket Size Distribution (25,728 OrderIDs, min_support = 0.005). Click image to zoom.":
    "Top 10 Nhóm hàng theo Tần suất xuất hiện &amp; Phân bố Kích thước Giỏ hàng đã khử trùng (25.728 OrderIDs, min_support = 0,005). Bấm vào ảnh để phóng to.",
  "<strong>Highest Lift Linkage:</strong> <br/><code>[Candles, Room Sprays, Face Masks] &rarr; [Nail Care, Bath Oils/Bombs]</code> <ul> <li><strong>Lift: 4.25</strong> (Customers purchasing the antecedent set are 4.25x more likely to co-purchase the consequent set compared to random baseline).</li> <li><strong>Confidence: 45%</strong> of baskets containing Candles, Room Sprays, and Face Masks also include Nail Care or Bath Oils/Bombs within the same <code>OrderID</code>.</li> </ul>":
    "<strong>Liên kết có độ Lift cao nhất:</strong> <br/><code>[Nến thơm, Xịt phòng, Mặt nạ] &rarr; [Chăm sóc móng, Tinh dầu/Viên sủi bồn tắm]</code> <ul> <li><strong>Lift: 4.25</strong> (Khách mua nhóm sản phẩm vế trước có xác suất mua kèm nhóm vế sau cao gấp 4,25 lần so với mức ngẫu nhiên).</li> <li><strong>Confidence: 45%</strong> số giỏ hàng chứa Nến thơm, Xịt phòng và Mặt nạ cũng đồng thời chứa Chăm sóc móng hoặc Tinh dầu/Viên sủi tắm trong cùng một <code>OrderID</code>.</li> </ul>",
  "<strong>Shopping Ecosystem A (\"Home Spa\"):</strong> A self-care basket containing <em>Candles + Face Masks + Bath Oils + Nail Care</em> purchased to simulate an at-home spa experience.":
    "<strong>Hệ sinh thái Mua sắm A (\"Home Spa\"):</strong> Giỏ hàng tự chăm sóc gồm <em>Nến thơm + Mặt nạ + Tinh dầu tắm + Chăm sóc móng</em> cho trải nghiệm spa thư giãn tại nhà.",
  "<strong>Shopping Ecosystem B (\"Beauty from Within\"):</strong> A wellness-driven basket combining <em>Vitamins/Supplements + Hand Creams + Face Care</em>, representing a disciplined health-conscious demographic.":
    "<strong>Hệ sinh thái Mua sắm B (\"Đẹp từ bên trong\"):</strong> Giỏ hàng chăm sóc sức khỏe kết hợp <em>Vitamin/Thực phẩm bổ sung + Kem tay + Chăm sóc da mặt</em>, đại diện cho nhóm khách quan tâm sức khỏe đều đặn.",

  "3. Methodology &amp; Analysis Fixes": "3. Phương pháp &amp; Cải tiến Kỹ thuật",
  "<strong>Out-of-Memory (OOM) Prevention via Support Tuning:</strong> Initial <code>min_support</code> of <code>0.001</code> (0.1%) generated millions of combinatorial itemsets, crashing kernel RAM. Recalibrated threshold to <code>0.005</code> (0.5%) to maintain compute stability without losing high-lift rules.":
    "<strong>Ngăn Tràn bộ nhớ (OOM) bằng Tinh chỉnh Support:</strong> Ngưỡng <code>min_support</code> ban đầu ở <code>0.001</code> (0,1%) sinh ra hàng triệu tập tổ hợp làm sập RAM kernel. Hiệu chỉnh ngưỡng về <code>0.005</code> (0,5%) giúp tính toán ổn định mà vẫn giữ được các luật có Lift cao.",
  "<strong>In-Basket Deduplication:</strong> Refactored raw item aggregation using <code>.unique()</code>, eliminating repeated subcategories within a single <code>OrderID</code> prior to <code>TransactionEncoder</code> processing.":
    "<strong>Khử trùng Trong cùng Giỏ hàng:</strong> Tái cấu trúc bước gom sản phẩm bằng <code>.unique()</code> để loại bỏ các danh mục con lặp lại trong cùng một <code>OrderID</code> trước khi đưa vào <code>TransactionEncoder</code>.",
  "<strong>Pre-Algorithmic EDA Pipeline:</strong> Engineered exploratory subplots visualizing top-10 category velocity and basket-size distributions before model execution.":
    "<strong>Pipeline EDA Tiền thuật toán:</strong> Xây dựng cụm biểu đồ khám phá tốc độ tiêu thụ Top 10 nhóm hàng và phân bố kích thước giỏ trước khi chạy mô hình.",

  "4. Proposed Commercial Experiments": "4. Đề xuất Thử nghiệm Thương mại",
  "<strong>Bundle Pilot (\"Weekend Reset Kit\"):</strong> Test packaging Ecosystem A items with a 10% bundle discount against standalone pricing to evaluate net AOV lift vs. margin dilution.":
    "<strong>Thử nghiệm Combo (\"Weekend Reset Kit\"):</strong> Đóng gói nhóm sản phẩm Hệ sinh thái A kèm ưu đãi 10% so với mua lẻ để đánh giá mức tăng AOV ròng so với độ pha loãng biên lợi nhuận.",
  "<strong>Dynamic Checkout Cross-Selling:</strong> When a user adds <em>Candles</em> to cart, test triggering a complementary prompt for <em>Bath Bombs</em> instead of competing candle brands.":
    "<strong>Bán chéo Động tại Giỏ hàng:</strong> Khi khách thêm <em>Nến thơm</em> vào giỏ, thử nghiệm gợi ý sản phẩm bổ trợ như <em>Viên sủi tắm</em> thay vì gợi ý các mẫu nến cạnh tranh lẫn nhau.",
  "<strong>Content Marketing Alignment:</strong> Test short-form campaign creatives around the 4-item Ecosystem A self-care routine.":
    "<strong>Đồng bộ Nội dung Tiếp thị:</strong> Thử nghiệm nội dung chiến dịch ngắn xoay quanh chu trình tự chăm sóc 4 món của Hệ sinh thái A.",

  "User Journey Sankey Flow": "Hành trình Người dùng (Sankey)",
  "ABC Customer Profitability": "Phân khúc Lợi nhuận Pareto ABC",

  "<strong>Methodological Scope &amp; Caveats:</strong> Baskets are grouped by distinct <code>OrderID</code> (<strong>25,728</strong> unique orders) with duplicate <code>Subcategory</code> entries removed per basket via <code>.unique()</code>. Mining used <code>min_support = 0.005</code> (&ge;129 co-occurring orders), <code>min_threshold = 0.1</code> (confidence), and <code>lift &gt; 1.2</code>. Note that <code>EcomSales.csv</code> has no refund/cancellation column and <strong>association rules measure co-occurrence, not causal revenue lift</strong>.":
    "<strong>Phạm vi Phương pháp &amp; Lưu ý:</strong> Giỏ hàng được gom theo từng <code>OrderID</code> duy nhất (<strong>25.728</strong> đơn) và loại bỏ <code>Subcategory</code> trùng lặp trong cùng giỏ bằng <code>.unique()</code>. Quá trình khai phá dùng <code>min_support = 0.005</code> (&ge;129 đơn đồng xuất hiện), <code>min_threshold = 0.1</code> (confidence) và <code>lift &gt; 1.2</code>. Lưu ý <code>EcomSales.csv</code> không có cột hoàn tiền/hủy đơn và <strong>luật kết hợp chỉ đo sự đồng xuất hiện, không khẳng định quan hệ nhân quả tăng doanh thu</strong>.",
  "<strong>Validation Plan:</strong> Because bundle discounts impact unit margin, validate via a 50/50 checkout A/B test measuring <strong>Incremental Gross Profit per Order</strong>, <strong>Basket Attach Rate</strong>, and <strong>AOV Lift</strong>.":
    "<strong>Kế hoạch Kiểm chứng:</strong> Vì giảm giá combo tác động đến biên lợi nhuận đơn vị, cần kiểm chứng qua A/B test 50/50 tại bước thanh toán để đo <strong>Lợi nhuận Gộp Tăng thêm mỗi Đơn</strong>, <strong>Tỷ lệ Gắn kèm vào Giỏ</strong> và <strong>Mức tăng AOV</strong>.",
};
