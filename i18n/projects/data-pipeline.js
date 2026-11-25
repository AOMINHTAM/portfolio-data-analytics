window.__I18N_VI__ = window.__I18N_VI__ || {};

window.__I18N_VI__["data-pipeline"] = {
  "CLOUD ELT &bull; DATA ENGINEERING &bull; CASE STUDY":
    "CLOUD ELT &bull; DATA ENGINEERING &bull; CASE STUDY",
  "Automated End-to-End Cloud ELT Pipeline &amp; Dimensional Modeling":
    "Cloud ELT Pipeline Tự động End-to-End &amp; Mô hình hóa Dữ liệu",
  "<strong>Role:</strong> Data Engineer": "<strong>Vai trò:</strong> Data Engineer",
  "<strong>Timeline:</strong> Jun 2026": "<strong>Thời gian:</strong> 06/2026",
  "<strong>Stack:</strong> Snowflake Data Cloud, dbt Core, Apache Airflow, Astronomer Cosmos, Astro CLI, Docker, Python, SQL":
    "<strong>Công nghệ:</strong> Snowflake Data Cloud, dbt Core, Apache Airflow, Astronomer Cosmos, Astro CLI, Docker, Python, SQL",

  "1. Dataset, Scope &amp; Objectives": "1. Tập dữ liệu, Phạm vi &amp; Mục tiêu",
  "<strong>Project Type</strong> Personal Data Engineering Project (Cloud ELT Architecture)":
    "<strong>Loại dự án</strong> Dự án Data Engineering Cá nhân (Kiến trúc Cloud ELT)",
  "<strong>Dataset Source</strong> Snowflake Sample Data (TPC-H Benchmark Schema)":
    "<strong>Nguồn dữ liệu</strong> Dữ liệu mẫu Snowflake (Lược đồ chuẩn TPC-H)",
  "<strong>Modeling Layers</strong> Medallion Staging Views &rarr; Kimball Star Schema Marts":
    "<strong>Tầng mô hình hóa</strong> Medallion Staging Views &rarr; Kimball Star Schema Marts",
  "<strong>Quality Scope</strong> Schema &amp; referential tests (<code>unique</code>, <code>not_null</code>, FK integrity)":
    "<strong>Phạm vi chất lượng</strong> Kiểm thử schema &amp; tham chiếu (<code>unique</code>, <code>not_null</code>, toàn vẹn khóa ngoại)",

  "In production environments, disparate source data often suffers from schema fragmentation, redundant records, and recurrent manual script execution. This leads to fragile operational reporting and inconsistent metrics across downstream consumers.":
    "Trong môi trường thực tế, dữ liệu nguồn phân tán thường gặp tình trạng phân mảnh schema, bản ghi dư thừa và phải chạy script thủ công lặp lại. Điều này khiến báo cáo vận hành dễ gãy và sai lệch chỉ số giữa các bộ phận sử dụng dữ liệu.",
  "The objective of this project was to architect a fully automated, containerized cloud ELT platform decoupling Snowflake storage/compute from Apache Airflow orchestration, transforming raw TPC-H operational records into clean Kimball Star Schema Data Marts.":
    "Mục tiêu của dự án là thiết kế nền tảng cloud ELT tự động hoàn toàn trong container, tách biệt lưu trữ/tính toán trên Snowflake với điều phối trên Apache Airflow, biến dữ liệu vận hành TPC-H thô thành các bảng Data Mart chuẩn Kimball Star Schema.",

  "2. System Architecture &amp; Workflow": "2. Kiến trúc Hệ thống &amp; Luồng Xử lý",
  "End-to-End Snowflake + dbt Core + Airflow (Astronomer Cosmos) Cloud ELT Architecture. (Click image to zoom)":
    "Kiến trúc Cloud ELT End-to-End: Snowflake + dbt Core + Airflow (Astronomer Cosmos). (Bấm vào ảnh để phóng to)",
  "<strong>Storage &amp; Compute (Snowflake Data Cloud):</strong> Serves as the central data warehouse, decoupling compute from storage and isolating raw TPC-H landing zones from clean analytical marts.":
    "<strong>Lưu trữ &amp; Tính toán (Snowflake Data Cloud):</strong> Đóng vai trò kho dữ liệu trung tâm, tách biệt compute khỏi storage và cô lập vùng dữ liệu TPC-H thô với tầng mart phân tích sạch.",
  "<strong>Transformation (dbt Core &amp; <code>dbt_utils</code>):</strong> Implements Medallion Staging (<code>stg_tpch_orders</code>) and Kimball Star Schema Mart layers (<code>fct_orders</code>) via modular SQL models.":
    "<strong>Biến đổi dữ liệu (dbt Core &amp; <code>dbt_utils</code>):</strong> Triển khai tầng Medallion Staging (<code>stg_tpch_orders</code>) và tầng Kimball Star Schema Mart (<code>fct_orders</code>) bằng các model SQL dạng module.",
  "<strong>Orchestration (Apache Airflow &amp; Astronomer Cosmos):</strong> Dynamically parses dbt lineage into granular Airflow DAG tasks inside an isolated <code>dbt_venv</code>, triggering runs and schema checks sequentially.":
    "<strong>Điều phối (Apache Airflow &amp; Astronomer Cosmos):</strong> Tự động phân tích dbt lineage thành các task chi tiết trong Airflow DAG bên trong môi trường ảo <code>dbt_venv</code> độc lập, chạy model và kiểm thử schema tuần tự.",
  "<strong>Reproducibility (Docker &amp; Astro CLI):</strong> Ensures identical runtime dependencies across local development and containerized deployment.":
    "<strong>Khả năng tái lập (Docker &amp; Astro CLI):</strong> Đảm bảo môi trường và thư viện đồng nhất tuyệt đối giữa máy phát triển local và container triển khai.",
  "<strong>Airflow &amp; Cosmos DAG Run:</strong> Dynamic dbt staging, mart, and schema test tasks completing green inside Docker.":
    "<strong>Lượt chạy Airflow &amp; Cosmos DAG:</strong> Các task dbt staging, mart và schema test tự động sinh đều hoàn thành xanh trong Docker.",
  "<strong>Snowflake Materialized Objects:</strong> Verified <code>DBT_DB.DBT_SCHEMA</code> staging views and <code>fct_orders</code> Star Schema mart tables.":
    "<strong>Đối tượng trên Snowflake:</strong> Đã xác minh các staging view trong <code>DBT_DB.DBT_SCHEMA</code> và bảng mart Star Schema <code>fct_orders</code>.",

  "3. Data Quality Assurance &amp; Testing": "3. Đảm bảo Chất lượng Dữ liệu &amp; Kiểm thử",
  "To guarantee the principle of <em>\"Trustworthy data before reporting\"</em>, continuous automated testing was integrated into the pipeline:":
    "Để đảm bảo nguyên tắc <em>\"Dữ liệu tin cậy trước khi lên báo cáo\"</em>, quy trình kiểm thử tự động liên tục đã được tích hợp thẳng vào pipeline:",
  "Enforced Primary Key integrity (<code>unique</code> and <code>not_null</code> constraints) across staging and mart entities.":
    "Áp đặt toàn vẹn khóa chính (ràng buộc <code>unique</code> và <code>not_null</code>) trên các bảng staging và mart.",
  "Validated Referential Integrity relationships between Fact and Dimension tables.":
    "Kiểm chứng toàn vẹn tham chiếu (Referential Integrity) giữa bảng Fact và các bảng Dimension.",
  "Automated task halting upon detecting anomalous schema changes or ingestion discrepancies.":
    "Tự động dừng task ngay khi phát hiện thay đổi schema bất thường hoặc sai lệch dữ liệu nạp.",

  "4. Key Outcomes &amp; Scope Notes": "4. Kết quả Chính &amp; Ghi chú Phạm vi",
  "The pipeline eliminated manual script execution via containerized Airflow scheduling, materialized pre-joined Kimball Star Schema marts (<code>fct_orders</code>) to reduce repetitive multi-table joins in downstream BI workflows, and enforced automated dbt schema/referential quality gates prior to analytical consumption. <em>Note: Timing claims were omitted because no controlled cross-warehouse cache benchmark was logged.</em>":
    "Pipeline đã loại bỏ việc chạy script SQL thủ công nhờ lập lịch Airflow trong container, vật chất hóa các bảng mart Kimball Star Schema nối sẵn (<code>fct_orders</code>) để giảm phép join lặp lại ở tầng BI, và áp đặt kiểm tra schema/tham chiếu tự động bằng dbt trước khi phân tích. <em>Ghi chú: Không đưa ra con số so sánh thời gian chạy vì không thực hiện đo kiểm (benchmark) có đối chứng cache giữa các warehouse.</em>",
  "Community Share (Xóm Data) ↗": "Bài chia sẻ Cộng đồng (Xóm Data) ↗",
};
