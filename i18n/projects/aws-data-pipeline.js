window.__I18N_VI__ = window.__I18N_VI__ || {};

window.__I18N_VI__["aws-data-pipeline"] = {
  "DATA ENGINEERING &bull; V5.0.1 CLOUDFORMATION IaC &amp; EVENT-DRIVEN ELT":
    "DATA ENGINEERING &bull; V5.0.1 CLOUDFORMATION IaC &amp; EVENT-DRIVEN ELT",
  "AWS E-Commerce Modern Data Pipeline (V5)":
    "Pipeline Dữ liệu E-Commerce Hiện đại trên AWS (V5)",
  "<strong>Role:</strong> Data Engineer (Personal CloudOps Project)":
    "<strong>Vai trò:</strong> Data Engineer (Dự án CloudOps Cá nhân)",
  "<strong>Timeline:</strong> Oct 2026 – Nov 2026 (Tags <code>v4.0.1</code> &rarr; <code>5.0.1</code>)":
    "<strong>Thời gian:</strong> 10/2026 – 11/2026 (Tags <code>v4.0.1</code> &rarr; <code>5.0.1</code>)",
  "<strong>Stack:</strong> AWS (CloudFormation, S3, SQS + DLQ, CloudWatch, SNS, Redshift Serverless, IAM), Apache Airflow 3 (Astro CLI, Cosmos), dbt Core, Docker":
    "<strong>Công nghệ:</strong> AWS (CloudFormation, S3, SQS + DLQ, CloudWatch, SNS, Redshift Serverless, IAM), Apache Airflow 3 (Astro CLI, Cosmos), dbt Core, Docker",

  "1. Business Pain-Points, Dataset &amp; Objectives":
    "1. Bài toán Kinh doanh, Dữ liệu &amp; Mục tiêu",
  "<strong>Project Type</strong> Personal Cloud Engineering Project (AWS First Cloud Journey Standard)":
    "<strong>Loại dự án</strong> Dự án Cloud Engineering Cá nhân (Chuẩn AWS First Cloud Journey)",
  "<strong>Dataset Source</strong> Olist Brazilian E-Commerce Public Dataset (Kaggle, ~120 MB across 9 CSVs)":
    "<strong>Nguồn dữ liệu</strong> Olist Brazilian E-Commerce Public Dataset (Kaggle, ~120 MB gồm 9 file CSV)",
  "<strong>Data Scale &amp; Range</strong> 99,441 orders, 112,650 order items (Sep 2016 – Oct 2018) &rarr; 4 BI CSVs (~56 MB)":
    "<strong>Quy mô &amp; Thời gian</strong> 99.441 đơn hàng, 112.650 chi tiết đơn (09/2016 – 10/2018) &rarr; 4 file BI CSV (~56 MB)",
  "<strong>Verification Status</strong> <code>5.0.0</code> live-verified E2E on AWS; <code>5.0.1</code> hardened (21/21 unit tests &amp; CI pass)":
    "<strong>Trạng thái kiểm thử</strong> Bản <code>5.0.0</code> đã xác minh E2E trực tiếp trên AWS; bản <code>5.0.1</code> đã gia cố (21/21 unit tests &amp; CI đạt)",

  "In marketplace operations, raw transactional exports cannot be queried directly by Finance, Ops, or BI teams without breaking KPIs. Fixed batch polling wastes warehouse compute on empty runs, while naive reloads or multi-table joins introduce duplicate revenue, missed late updates, and miscounted repeat buyers. The goal was to turn a manual ETL prototype (<strong>V2</strong>) into an automated CloudOps platform (<strong>V5.0.1</strong>) delivering trustworthy Star Schema marts at <strong>$0</strong> idle compute.":
    "Trong vận hành sàn thương mại điện tử, dữ liệu giao dịch thô không thể đưa thẳng cho Tài chính, Vận hành hay BI truy vấn vì dễ làm lệch KPI. Việc chạy cron theo lịch cố định gây lãng phí compute cho các lượt chạy rỗng, còn nạp đè đơn giản hoặc join nhiều bảng dễ gây tính trùng doanh thu, sót cập nhật muộn và đếm sai khách mua lại. Mục tiêu của dự án là nâng cấp bản ETL thủ công (<strong>V2</strong>) thành nền tảng CloudOps tự động (<strong>V5.0.1</strong>) cung cấp bảng Star Schema tin cậy với chi phí nhàn rỗi <strong>$0</strong>.",

  "Business Pain-Point": "Bài toán Kinh doanh",
  "Risk to Stakeholders (BI / Ops / Finance)": "Rủi ro với Bộ phận Liên quan (BI / Ops / Tài chính)",
  "Engineering &amp; Modeling Fix": "Giải pháp Kỹ thuật &amp; Modeling",
  "Business Value Delivered": "Giá trị Kinh doanh Mang lại",
  "<strong>Fragmented Feeds &amp; Partial Load Failures</strong>": "<strong>Dữ liệu Phân mảnh &amp; Lỗi Nạp Dở dang</strong>",
  "<code>TRUNCATE</code> + mid-load crashes or SQS retries cause missing orders or double-counted revenue on dashboards.":
    "Lệnh <code>TRUNCATE</code> + lỗi giữa chừng hoặc SQS retry dễ gây mất đơn hàng hoặc tính trùng doanh thu trên dashboard.",
  "Two-Phase <code>TEMP TABLE</code> swap + CSV header/empty-stage guards + <code>ops.pipeline_ingestion_audit</code> Safe ACK.":
    "Hoán đổi <code>TEMP TABLE</code> hai pha + kiểm tra header CSV/bảng tạm rỗng + Safe ACK ghi nhận tại <code>ops.pipeline_ingestion_audit</code>.",
  "<strong>Reconciled Revenue &amp; Order KPIs</strong> across 99,441 orders without manual backfills.":
    "<strong>KPI Doanh thu &amp; Đơn hàng Đồng nhất</strong> trên 99.441 đơn mà không cần xử lý bù tay.",
  "<strong>Late Updates &amp; Split Customer Identities</strong>": "<strong>Cập nhật Muộn &amp; Tách Danh tính Khách hàng</strong>",
  "Reviews/deliveries arrive &gt;3 days late; Olist issues a new <code>customer_id</code> per order, hiding repeat buyers and inflating fan-out joins.":
    "Đánh giá/giao hàng đến trễ &gt;3 ngày; Olist cấp <code>customer_id</code> mới cho mỗi đơn làm ẩn khách quay lại và gây nhân bản dòng khi join.",
  "Multi-source incremental <code>fct_orders</code> (<code>affected_order_ids</code>) + 1:1 <code>dim_customers</code> with window LTV by <code>customer_unique_id</code>.":
    "Bảng <code>fct_orders</code> incremental đa nguồn (<code>affected_order_ids</code>) + <code>dim_customers</code> 1:1 tính window LTV theo <code>customer_unique_id</code>.",
  "<strong>Accurate Cohort LTV &amp; Retention</strong> (<code>total_orders</code>, <code>lifetime_spend</code>) ready for BI.":
    "<strong>LTV &amp; Giữ chân Khách hàng Chính xác</strong> (<code>total_orders</code>, <code>lifetime_spend</code>) sẵn sàng cho BI.",
  "<strong>Stale SLA Alerts &amp; Idle Cron Costs</strong>": "<strong>Chậm Cảnh báo SLA &amp; Lãng phí Cron</strong>",
  "Fixed <code>*/5</code> polling burns warehouse budget when no files arrive, while silent poison CSVs stall <code>delivery_status</code> reporting.":
    "Cron <code>*/5</code> đốt ngân sách warehouse khi không có file mới, còn file lỗi âm thầm làm nghẽn báo cáo <code>delivery_status</code>.",
  "S3 &rarr; SQS (<code>20s</code> Long Poll) &rarr; Airflow 3 <code>AssetWatcher</code> + DLQ (<code>maxReceiveCount=3</code>) + 4 CloudWatch Alarms + SNS.":
    "S3 &rarr; SQS (Long Poll <code>20s</code>) &rarr; Airflow 3 <code>AssetWatcher</code> + DLQ (<code>maxReceiveCount=3</code>) + 4 CloudWatch Alarms + SNS.",
  "<strong>$0 Idle Compute</strong> (0 empty runs) + real-time email alerting before broken data hits BI.":
    "<strong>$0 Chi phí Nhàn rỗi</strong> (0 lần chạy rỗng) + cảnh báo email tức thời trước khi dữ liệu lỗi lọt vào BI.",
  "<strong>BI-Ready Business Outputs (<code>3 Gold Star Schema Marts</code> &rarr; <code>4 BI CSVs, ~56 MB</code>):</strong> Consolidates 9 raw marketplace tables into decision-ready datasets supporting <strong>Revenue &amp; Payment Reconciliation</strong>, <strong>Customer Lifetime Value &amp; Repeat Purchase Tracking</strong> (via <code>customer_unique_id</code>), and <strong>Order Fulfillment &amp; Delivery SLA Monitoring</strong> (via <code>delivery_status</code>).":
    "<strong>Đầu ra Sẵn sàng cho BI (<code>3 Bảng Gold Star Schema</code> &rarr; <code>4 file BI CSV, ~56 MB</code>):</strong> Hợp nhất 9 bảng dữ liệu thô thành bộ dữ liệu chuẩn phục vụ <strong>Đối soát Doanh thu &amp; Thanh toán</strong>, <strong>Theo dõi Giá trị Vòng đời &amp; Mua lặp lại</strong> (qua <code>customer_unique_id</code>) và <strong>Giám sát SLA Giao hàng</strong> (qua <code>delivery_status</code>).",

  "2. V5.0.1 System Architecture &amp; Evolution (V2 &rarr; V4 &rarr; V5)":
    "2. Kiến trúc Hệ thống V5.0.1 &amp; Quá trình Tiến hóa (V2 &rarr; V4 &rarr; V5)",
  "End-to-End V5.0.1 Architecture: CloudFormation IaC, S3 Versioning, SQS + DLQ, 4 CloudWatch Alarms + SNS, Airflow 3 AssetWatcher, and Redshift Serverless. (Click image to open full resolution)":
    "Kiến trúc End-to-End V5.0.1: CloudFormation IaC, S3 Versioning, SQS + DLQ, 4 CloudWatch Alarms + SNS, Airflow 3 AssetWatcher và Redshift Serverless. (Bấm vào ảnh để phóng to)",
  "Architectural evolution across V2, V3, V4 (<code>v4.0.1</code>), V5.0.0 (live E2E verified), and V5.0.1 (13 cross-review blind spots hardened).":
    "Tiến hóa kiến trúc qua các phiên bản V2, V3, V4 (<code>v4.0.1</code>), V5.0.0 (đã kiểm thử E2E trực tiếp) và V5.0.1 (vá 13 điểm mù sau rà soát chéo).",

  "Dimension": "Khía cạnh",
  "V2 (Manual Baseline)": "V2 (Chạy thủ công)",
  "V4 (<code>v4.0.1</code> — Data Core)": "V4 (<code>v4.0.1</code> — Lõi Dữ liệu)",
  "V5 (<code>5.0.0</code> &rarr; <code>5.0.1</code> — CloudOps)": "V5 (<code>5.0.0</code> &rarr; <code>5.0.1</code> — CloudOps)",
  "<strong>Provisioning</strong>": "<strong>Khởi tạo Hạ tầng</strong>",
  "Manual AWS Console / CLI": "Thao tác tay qua AWS Console / CLI",
  "Manual AWS infra + 3-job GitHub Actions CI": "Hạ tầng AWS thủ công + GitHub Actions CI 3 job",
  "<strong>AWS CloudFormation IaC</strong> (15 core + 4 conditional resources), <code>cfn-lint</code> CI, Native Auto-Rollback, <code>make cfn-delete</code>":
    "<strong>AWS CloudFormation IaC</strong> (15 tài nguyên lõi + 4 tùy chọn), CI <code>cfn-lint</code>, Auto-Rollback gốc, <code>make cfn-delete</code>",
  "<strong>Orchestration</strong>": "<strong>Điều phối (Orchestration)</strong>",
  "Manual trigger (<code>schedule=None</code>)": "Kích hoạt thủ công (<code>schedule=None</code>)",
  "Airflow 3 <code>Asset</code> + <code>AssetWatcher</code> (20s SQS Long Poll, zero <code>*/5</code> cron)":
    "Airflow 3 <code>Asset</code> + <code>AssetWatcher</code> (SQS Long Poll 20s, không dùng cron <code>*/5</code>)",
  "<code>AssetWatcher</code> hardened for Airflow 3 <code>Mapping</code> accessor + <code>VisibilityTimeout=900s</code> heartbeat":
    "<code>AssetWatcher</code> tối ưu cho kiểu <code>Mapping</code> của Airflow 3 + heartbeat <code>VisibilityTimeout=900s</code>",
  "<strong>Ingestion &amp; Atomicity</strong>": "<strong>Nạp dữ liệu &amp; Tính nguyên tử</strong>",
  "Static <code>COPY</code> / <code>TRUNCATE</code>": "Lệnh <code>COPY</code> / <code>TRUNCATE</code> tĩnh",
  "Per-table <code>TEMP TABLE</code> + <code>DELETE/INSERT</code> + Empty-Stage Guard":
    "<code>TEMP TABLE</code> từng bảng + <code>DELETE/INSERT</code> + kiểm tra bảng tạm rỗng",
  "<strong>Two-Phase Batch Staging</strong> + CSV Header Guard + <code>ops.pipeline_ingestion_audit</code> + <strong>Two-Proof Safe ACK</strong>":
    "<strong>Staging hai pha theo lô</strong> + kiểm tra Header CSV + sổ kiểm toán <code>ops.pipeline_ingestion_audit</code> + <strong>Safe ACK hai bằng chứng</strong>",
  "<strong>Failure &amp; Alerting</strong>": "<strong>Xử lý Lỗi &amp; Cảnh báo</strong>",
  "Silent failure / manual log check": "Lỗi âm thầm / tự kiểm tra log bằng tay",
  "Transaction rollback + ACK retry safety": "Rollback giao dịch + giữ an toàn ACK khi retry",
  "<strong>SQS DLQ</strong> (<code>maxReceiveCount=3</code>) + <strong>4 CloudWatch Alarms</strong> + <strong>SNS Email</strong> + DLQ Redrive":
    "<strong>SQS DLQ</strong> (<code>maxReceiveCount=3</code>) + <strong>4 CloudWatch Alarms</strong> + <strong>Email SNS</strong> + DLQ Redrive",

  "3. Key Engineering Mechanisms &amp; Bug Fixes":
    "3. Cơ chế Kỹ thuật Trọng tâm &amp; Các Lỗi đã Khắc phục",
  "<strong>Declarative CloudFormation IaC (Dual Circular Dependency Fix):</strong> <code>infra/cloudformation/template.yaml</code> provisions S3 (AES256, Versioning, Lifecycle, HTTPS-only bucket policy), SQS + DLQ, split least-privilege IAM (<code>RedshiftS3ReadOnlyRole</code>, <code>AirflowRuntimePolicy</code>, <code>DlqOperatorPolicy</code>), 4 CloudWatch Alarms, and SNS. Resolved circular references between <code>S3RawBucket &harr; SqsMainQueuePolicy</code> and <code>SqsMainQueue &harr; SqsDeadLetterQueue</code> by constructing deterministic ARNs with <code>!Sub</code> instead of cross-referencing <code>!GetAtt</code>.":
    "<strong>CloudFormation IaC Khai báo (Xử lý tham chiếu vòng kép):</strong> File <code>infra/cloudformation/template.yaml</code> khởi tạo S3 (AES256, Versioning, Lifecycle, chính sách chỉ cho phép HTTPS), SQS + DLQ, phân tách quyền IAM tối thiểu (<code>RedshiftS3ReadOnlyRole</code>, <code>AirflowRuntimePolicy</code>, <code>DlqOperatorPolicy</code>), 4 CloudWatch Alarms và SNS. Xử lý triệt để tham chiếu vòng giữa <code>S3RawBucket &harr; SqsMainQueuePolicy</code> và <code>SqsMainQueue &harr; SqsDeadLetterQueue</code> bằng cách dựng ARN xác định qua <code>!Sub</code> thay vì gọi chéo <code>!GetAtt</code>.",
  "<strong>Live Airflow 3 Task SDK Bug Caught &amp; Fixed:</strong> During live testing, <code>extract_messages_from_asset_events</code> initially skipped runs because Airflow 3's <code>context[\"triggering_asset_events\"]</code> returns a <code>TriggeringAssetEventsAccessor</code> (<code>collections.abc.Mapping</code>, not a plain <code>dict</code>). Updated <code>include/sqs_parser.py</code> to validate against <code>Mapping</code> with unit-test regression coverage.":
    "<strong>Bắt &amp; Sửa lỗi Airflow 3 Task SDK khi chạy thực tế:</strong> Trong lúc test trực tiếp, hàm <code>extract_messages_from_asset_events</code> ban đầu bỏ qua lượt chạy vì <code>context[\"triggering_asset_events\"]</code> của Airflow 3 trả về đối tượng <code>TriggeringAssetEventsAccessor</code> (kiểu <code>collections.abc.Mapping</code> chứ không phải <code>dict</code> thuần). Đã sửa <code>include/sqs_parser.py</code> để kiểm tra theo <code>Mapping</code> kèm unit test phòng ngừa tái diễn.",
  "<strong>Two-Phase Batch Staging (DB Atomicity vs. Cross-System Orchestration):</strong> In Redshift, <code>TRUNCATE</code> auto-commits immediately and cannot be rolled back if <code>COPY</code> fails. Task 1 validates headers (<code>validate_csv_header</code>), stages all batch CSVs into session <code>TEMP TABLE</code>s, and enforces <code>ensure_non_empty_stage (&gt; 0)</code> before touching target tables. Only when 100% of batch files pass staging does Phase B run <code>DELETE + INSERT</code> and write <code>SWAPPED</code> into <code>ops.pipeline_ingestion_audit</code> inside a single <code>autocommit=False</code> Redshift transaction (DB-level atomicity—<em>not</em> a distributed 2PC transaction across S3/SQS).":
    "<strong>Staging Hai Pha Theo Lô (Tính nguyên tử DB so với Điều phối liên hệ thống):</strong> Trên Redshift, <code>TRUNCATE</code> tự động commit ngay lập tức và không thể rollback nếu lệnh <code>COPY</code> lỗi. Task 1 kiểm tra header (<code>validate_csv_header</code>), nạp toàn bộ batch CSV vào các <code>TEMP TABLE</code> của phiên, và buộc thỏa mãn <code>ensure_non_empty_stage (&gt; 0)</code> trước khi chạm vào bảng đích. Chỉ khi 100% file trong batch đạt chuẩn, Pha B mới chạy <code>DELETE + INSERT</code> và ghi trạng thái <code>SWAPPED</code> vào <code>ops.pipeline_ingestion_audit</code> trong cùng một transaction <code>autocommit=False</code> trên Redshift (nguyên tử ở cấp DB—<em>không</em> phải giao dịch 2PC phân tán giữa S3/SQS).",
  "<strong>At-Least-Once Recovery, Deterministic Archive &amp; Safe ACK:</strong> SQS enforces <strong>at-least-once</strong> delivery (not strict exactly-once transport), so crashes between S3 archiving, audit logging, and SQS <code>DeleteMessage</code> trigger controlled redelivery within <code>VisibilityTimeout=900s</code>. To handle duplicates idempotently, each S3 event uses a deterministic <code>event_token</code> (<code>versionId</code> / <code>eTag</code> / <code>sequencer</code>) mapping retries across different DAG Runs to the same <code>audit_id</code> and <code>archive/&lt;audit_id&gt;/&lt;filename&gt;</code> path. If a raw S3 key is missing on redelivery, Task 1 and Task 3 invoke <code>verify_safe_to_ack_when_raw_missing()</code>—permitting SQS ACK <em>only</em> when both <code>ops.pipeline_ingestion_audit</code> shows <code>ARCHIVED</code>/<code>COMPLETED</code> and the archived S3 key exists—while deferring multi-record SQS ACKs until the full batch finishes.":
    "<strong>Phục hồi At-Least-Once, Lưu trữ Xác định &amp; Safe ACK:</strong> SQS đảm bảo gửi tin theo cơ chế <strong>at-least-once</strong>, nên nếu sự cố xảy ra giữa bước lưu trữ S3, ghi audit và <code>DeleteMessage</code>, message sẽ được gửi lại có kiểm soát trong khung <code>VisibilityTimeout=900s</code>. Để xử lý trùng lặp an toàn (idempotent), mỗi sự kiện S3 tạo một <code>event_token</code> cố định (<code>versionId</code> / <code>eTag</code> / <code>sequencer</code>) ánh xạ mọi lần thử lại vào cùng <code>audit_id</code> và đường dẫn <code>archive/&lt;audit_id&gt;/&lt;filename&gt;</code>. Nếu key raw trên S3 không còn khi gửi lại, Task 1 và Task 3 gọi <code>verify_safe_to_ack_when_raw_missing()</code>—chỉ cho phép ACK SQS khi cả <code>ops.pipeline_ingestion_audit</code> ghi nhận <code>ARCHIVED</code>/<code>COMPLETED</code> lẫn file trên S3 archive thực sự tồn tại—đồng thời hoãn ACK cả lô cho tới khi hoàn tất toàn bộ batch.",

  "4. Dimensional Modeling, Quality Scope &amp; FinOps Transparency":
    "4. Mô hình hóa Dữ liệu, Phạm vi Kiểm thử &amp; Minh bạch FinOps",
  "dbt Data Lineage: 9 <code>raw_data</code> Bronze sources &rarr; 7 <code>public_staging</code> Silver views &rarr; 3 <code>public_marts</code> Gold Star Schema tables.":
    "Biểu đồ Lineage dbt: 9 nguồn Bronze <code>raw_data</code> &rarr; 7 view Silver <code>public_staging</code> &rarr; 3 bảng Gold Star Schema <code>public_marts</code>.",
  "<strong>Multi-Source Incremental Modeling &amp; Customer Grain Trade-off:</strong> <code>fct_orders</code> (<code>delete+insert</code>) uses an <code>affected_order_ids</code> CTE across all 4 upstream tables (<code>stg_orders</code>, <code>stg_order_items</code>, <code>stg_payments</code>, <code>stg_reviews</code>) so late updates on older orders (&gt;3 days) are captured. In Olist, every order assigns a new surrogate <code>customer_id</code> even when the same buyer returns (<code>customer_unique_id</code>). <code>dim_customers</code> deliberately keeps <code>customer_id</code> grain (99,441 rows) so downstream BI Star Schema joins with <code>fct_orders</code> remain strictly 1:1 without fan-out, while lifetime metrics (<code>total_orders</code>, <code>lifetime_spend</code>) are window-aggregated by <code>customer_unique_id</code>.":
    "<strong>Mô hình Incremental Đa nguồn &amp; Đánh đổi Grain của Khách hàng:</strong> Bảng <code>fct_orders</code> (<code>delete+insert</code>) sử dụng CTE <code>affected_order_ids</code> quét cả 4 bảng nguồn (<code>stg_orders</code>, <code>stg_order_items</code>, <code>stg_payments</code>, <code>stg_reviews</code>) để bắt kịp các cập nhật muộn trên đơn cũ (&gt;3 ngày). Trong bộ dữ liệu Olist, mỗi đơn hàng tạo một <code>customer_id</code> mới dù cùng một người mua quay lại (<code>customer_unique_id</code>). Do đó <code>dim_customers</code> chủ đích giữ grain theo <code>customer_id</code> (99.441 dòng) để phép join Star Schema 1:1 với <code>fct_orders</code> không bị nhân bản dòng (fan-out), còn các chỉ số vòng đời (<code>total_orders</code>, <code>lifetime_spend</code>) được tính qua window function theo <code>customer_unique_id</code>.",
  "<strong>Scope of Automated Testing &amp; CI (Separated by Execution Layer):</strong> <ul> <li><em>21 Python Unit Tests + 3 DAG Pytests (Executed on every GitHub Actions CI run):</em> Verify SQS event parsing, Airflow 3 <code>Mapping</code> accessors, header/empty-stage guards, multi-record deferred ACKs, recovery gates, and DAG import/retry metadata alongside Ruff, <code>cfn-lint</code>, and Astro Docker build.</li> <li><em>Offline <code>dbt parse</code> (Executed in GitHub Actions CI):</em> Validates SQL syntax, model compilation, and schema YAML graphs at <strong>$0</strong> AWS cost—this checks structural graph validity rather than running data assertions against a live warehouse.</li> <li><em>11 dbt Schema Tests (Declared in <code>schema.yml</code> &amp; executed live in <code>5.0.0</code>):</em> Validate warehouse data contracts (<code>unique</code>, <code>not_null</code>, <code>relationships</code> between <code>fct_orders</code> and <code>dim_customers</code>, and <code>accepted_values</code> on <code>delivery_status</code>) against live Redshift Serverless during the <code>5.0.0</code> E2E verification run.</li> </ul>":
    "<strong>Phạm vi Kiểm thử Tự động &amp; CI (Tách theo từng tầng thực thi):</strong> <ul> <li><em>21 Python Unit Tests + 3 DAG Pytests (Chạy ở mọi lần kích hoạt GitHub Actions CI):</em> Xác minh bộ phân tích sự kiện SQS, kiểu <code>Mapping</code> của Airflow 3, bộ kiểm tra header/bảng tạm rỗng, hoãn ACK đa bản ghi, cổng phục hồi an toàn và metadata DAG cùng Ruff, <code>cfn-lint</code> và Astro Docker build.</li> <li><em><code>dbt parse</code> Offline (Chạy trên GitHub Actions CI):</em> Kiểm tra cú pháp SQL, biên dịch model và đồ thị YAML với chi phí AWS <strong>$0</strong>—đây là kiểm tra cấu trúc đồ thị chứ không chạy truy vấn dữ liệu trên warehouse thật.</li> <li><em>11 dbt Schema Tests (Khai báo trong <code>schema.yml</code> &amp; chạy thực tế ở bản <code>5.0.0</code>):</em> Kiểm chứng hợp đồng dữ liệu trên Redshift Serverless thật (<code>unique</code>, <code>not_null</code>, <code>relationships</code> giữa <code>fct_orders</code> và <code>dim_customers</code>, cùng <code>accepted_values</code> cho <code>delivery_status</code>) trong đợt chạy kiểm thử E2E <code>5.0.0</code>.</li> </ul>",
  "<strong>Transparent FinOps Mechanics:</strong> Idle compute stays at <strong>$0</strong> when local Astro stops polling (<code>astro dev stop</code>), because Redshift Serverless (4 RPUs) bills RPU-seconds only during active queries and <code>AssetWatcher</code> spawns <strong>0 empty DAG runs</strong>. SQS Long Polling (~104k requests/month if kept running 24/7) fits inside the 1M/month AWS Free Tier, backed by a $5/month AWS Budget alert (persistent S3/Redshift storage billed separately per GB/month).":
    "<strong>Cơ chế FinOps Minh bạch:</strong> Chi phí compute nhàn rỗi duy trì ở mức <strong>$0</strong> khi dừng Astro local (<code>astro dev stop</code>), do Redshift Serverless (4 RPUs) chỉ tính tiền theo giây RPU khi có truy vấn hoạt động và <code>AssetWatcher</code> tạo <strong>0 lần chạy DAG rỗng</strong>. SQS Long Polling (~104 nghìn request/tháng nếu bật 24/7) nằm gọn trong gói AWS Free Tier 1 triệu/tháng, đi kèm cảnh báo AWS Budget $5/tháng (phí lưu trữ S3/Redshift tính riêng theo GB/tháng).",

  "5. Live AWS Verification Evidence (<code>5.0.0</code> Run + <code>5.0.1</code> Hardening)":
    "5. Bằng chứng Kiểm thử Thực tế trên AWS (Chạy <code>5.0.0</code> + Gia cố <code>5.0.1</code>)",
  "All AWS screenshots below were captured live on <code>us-east-1</code> during the <code>5.0.0</code> release verification (Happy Path 17/17 + Empty-CSV Poison Isolation &rarr; DLQ &rarr; CloudWatch Alarms &rarr; SNS Gmail &rarr; DLQ Redrive recovery). Following <code>5.0.0</code>, release <code>5.0.1</code> patched 13 cross-review edge cases verified by <code>21/21</code> unit tests, <code>cfn-lint</code>, and <code>aws cloudformation validate-template</code> (pending next live stack re-run).":
    "Toàn bộ ảnh chụp AWS bên dưới được ghi lại trực tiếp trên vùng <code>us-east-1</code> trong đợt xác minh bản <code>5.0.0</code> (Luồng chuẩn 17/17 + Cô lập file CSV rỗng lỗi &rarr; DLQ &rarr; CloudWatch Alarms &rarr; SNS Gmail &rarr; Phục hồi DLQ Redrive). Sau <code>5.0.0</code>, bản <code>5.0.1</code> vá thêm 13 trường hợp biên được xác minh bằng <code>21/21</code> unit tests, <code>cfn-lint</code> và <code>aws cloudformation validate-template</code> (chờ lần chạy lại stack trực tiếp tiếp theo).",
  "<strong>Happy Path (17/17 Tasks):</strong> Triggered automatically by <code>AssetWatcher</code> on S3 file arrival with zero scheduled empty runs.":
    "<strong>Luồng chuẩn (17/17 Tasks):</strong> Tự động kích hoạt bởi <code>AssetWatcher</code> khi file lên S3 mà không có lượt chạy rỗng theo lịch.",
  "<strong>Audit Ledger:</strong> <code>ops.pipeline_ingestion_audit</code> logging <code>FAILED</code> (0-row guard) and recovery <code>SWAPPED &rarr; ARCHIVED &rarr; COMPLETED</code>.":
    "<strong>Sổ kiểm toán (Audit Ledger):</strong> Bảng <code>ops.pipeline_ingestion_audit</code> ghi nhận trạng thái <code>FAILED</code> (bị chặn do 0 dòng) và quá trình phục hồi <code>SWAPPED &rarr; ARCHIVED &rarr; COMPLETED</code>.",
  "<strong>Fault Isolation &amp; CloudWatch:</strong> Poison 0-row CSV moved to SQS DLQ after 3 retries, triggering CloudWatch <code>ALARM</code> state.":
    "<strong>Cô lập lỗi &amp; CloudWatch:</strong> File CSV 0 dòng bị đẩy sang SQS DLQ sau 3 lần thử lại, kích hoạt trạng thái <code>ALARM</code> trên CloudWatch.",
  "<strong>SNS Alert Delivery:</strong> Real-time incident notification delivered to Gmail via <code>PipelineAlertTopicPolicy</code> before DLQ Redrive recovery.":
    "<strong>Cảnh báo SNS tức thời:</strong> Thông báo sự cố gửi thẳng về Gmail qua <code>PipelineAlertTopicPolicy</code> trước khi thực hiện DLQ Redrive khôi phục.",
  "LinkedIn Write-up ↗": "Bài phân tích trên LinkedIn ↗",

  "INTERACTIVE SIMULATOR &bull; TEST V5.0.1 FAULT ISOLATION":
    "MÔ PHỎNG TƯƠNG TÁC &bull; KIỂM THỬ CÔ LẬP LỖI V5.0.1",
  "Break &amp; Recover the Pipeline": "Giả lập Sự cố &amp; Khôi phục Pipeline",
  "&#9654; Push Valid Olist Batch": "&#9654; Chạy lô Olist hợp lệ",
  "&#128165; Inject Corrupt File (Test DLQ)": "&#128165; Bơm file lỗi (Test DLQ)",
  "&#8635; Redrive DLQ": "&#8635; Khôi phục DLQ",
  "INGEST": "NẠP DỮ LIỆU",
  "QUEUE": "HÀNG ĐỢI",
  "TRIGGER": "KÍCH HOẠT",
  "ATOMIC SWAP": "HOÁN ĐỔI AN TOÀN",
  "MARTS &amp; ACK": "BẢNG MART &amp; ACK",
  "MAX RETRIES = 3": "THỬ LẠI TỐI ĐA = 3",
  "METRIC BREACH": "VƯỢT NGƯỠNG CHỈ SỐ",
  "INCIDENT": "CẢNH BÁO SỰ CỐ",

  "INTERACTIVE LINEAGE &bull; DBT DOCS STYLE":
    "LINEAGE TƯƠNG TÁC &bull; PHONG CÁCH DBT DOCS",
  "Trace Upstream Sources &amp; Downstream Business KPIs":
    "Truy vết Nguồn Đầu vào &amp; Chỉ số Kinh doanh Đầu ra",
  "Hover or click any node": "Rê chuột hoặc bấm vào bất kỳ node nào",
  "BRONZE (<code>raw_data</code>)": "TẦNG BRONZE (<code>raw_data</code>)",
  "SILVER (<code>public_staging</code>)": "TẦNG SILVER (<code>public_staging</code>)",
  "GOLD MARTS &amp; KPIs": "TẦNG GOLD MARTS &amp; KPIs",
  "Net Revenue &amp; Delivery SLA": "Doanh thu Ròng &amp; SLA Giao hàng",
  "Cohort LTV (<code>customer_unique_id</code>)": "Giá trị Vòng đời Cohort (<code>customer_unique_id</code>)",
  "Category &amp; Order Item Mix": "Cơ cấu Danh mục &amp; Sản phẩm",

  "BEFORE / AFTER &bull; DRAG SLIDER TO COMPARE":
    "TRƯỚC / SAU &bull; KÉO THANH TRƯỢT ĐỂ SO SÁNH",
  "Raw Olist CSVs &amp; Cron vs. V5.0.1 Star Schema":
    "CSV Thô &amp; Cron Cố định so với Star Schema V5.0.1",
  "AFTER &bull; V5.0.1 GOLD STAR SCHEMA": "SAU &bull; GOLD STAR SCHEMA V5.0.1",
  "BEFORE &bull; RAW CSVs &amp; BATCH CRON": "TRƯỚC &bull; FILE CSV THÔ &amp; CRON",
  "<strong>Unified Star Schema:</strong> <code>3</code> Gold marts &amp; <code>4</code> BI CSVs (~56 MB) ready for instant BI.":
    "<strong>Star Schema Thống nhất:</strong> <code>3</code> bảng Gold mart &amp; <code>4</code> file BI CSV (~56 MB) sẵn sàng kết nối BI tức thì.",
  "<strong>True Repeat-Buyer LTV:</strong> Windowed <code>total_orders</code> &amp; <code>lifetime_spend</code> by <code>customer_unique_id</code>.":
    "<strong>LTV Khách quay lại chính xác:</strong> Tính window <code>total_orders</code> &amp; <code>lifetime_spend</code> theo <code>customer_unique_id</code>.",
  "<strong>Atomic Data Safety:</strong> Two-Phase <code>TEMP TABLE</code> swap + header &amp; 0-row guards.":
    "<strong>An toàn Dữ liệu Nguyên tử:</strong> Hoán đổi 2 pha qua <code>TEMP TABLE</code> + bộ chặn sai header &amp; 0 dòng.",
  "<strong>Event-Driven FinOps:</strong> S3 &rarr; SQS &rarr; Airflow 3 <code>AssetWatcher</code> (<strong>$0</strong> idle compute).":
    "<strong>FinOps Hướng sự kiện:</strong> S3 &rarr; SQS &rarr; Airflow 3 <code>AssetWatcher</code> (<strong>$0</strong> compute nhàn rỗi).",
  "<strong>Fault Isolation:</strong> SQS DLQ + <code>4</code> CloudWatch Alarms + SNS + <strong>11 dbt tests</strong>.":
    "<strong>Cô lập Sự cố:</strong> SQS DLQ + <code>4</code> CloudWatch Alarms + SNS + <strong>11 dbt tests</strong>.",
  "<strong>Fragmented Schema:</strong> <code>9</code> raw CSVs (~120 MB) requiring heavy manual joins per report.":
    "<strong>Schema Phân mảnh:</strong> <code>9</code> file CSV thô (~120 MB) phải join thủ công nặng nề ở mỗi báo cáo.",
  "<strong>Broken Retention KPI:</strong> Olist resets <code>customer_id</code> per order, hiding repeat buyers.":
    "<strong>Sai lệch Retention KPI:</strong> Olist cấp lại <code>customer_id</code> sau mỗi đơn, che khuất khách hàng quay lại.",
  "<strong>Partial-Load Risk:</strong> Unguarded <code>TRUNCATE</code> + <code>COPY</code> wipes tables if load fails mid-batch.":
    "<strong>Rủi ro Nạp dở dang:</strong> <code>TRUNCATE</code> + <code>COPY</code> thiếu bảo vệ sẽ xóa trắng bảng nếu lỗi giữa lô.",
  "<strong>Idle Compute Waste:</strong> Fixed <code>*/5</code> cron polling burns warehouse credits on empty runs.":
    "<strong>Lãng phí Compute Nhàn rỗi:</strong> Lịch cron <code>*/5</code> đốt credit warehouse cho các lượt chạy rỗng.",
  "<strong>Silent Failures:</strong> Poison 0-row feeds fail silently without DLQ or email alerts.":
    "<strong>Lỗi Âm thầm:</strong> File lỗi 0 dòng ngưng trệ lặng lẽ, không có DLQ hay cảnh báo email.",
};
