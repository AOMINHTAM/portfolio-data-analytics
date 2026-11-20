# 🌐 Data Analytics & Data Engineering Portfolio

An interactive, responsive portfolio website showcasing **Data Engineering** (AWS CloudFormation IaC, Event-Driven ELT V5.0.1, Snowflake, dbt, Airflow 3) and **Data Analytics** case studies (RFM, Conversion Funnels, Cohort Retention, Sankey Flows, Market Basket, Pareto ABC).

🔗 **Live Website:** https://aominhtam-portfolio.vercel.app/

---

## 🛠️ Architecture & Features

* **Frontend:** Semantic HTML5, Vanilla CSS3 (Custom "Cyber Amber" Theme), JavaScript (ES6+).
* **Dual-Track HR Navigation:** Hero track shortcuts (`Explore DA Projects` / `Explore DE Projects`) wired directly to interactive project category filters (`All` / `DA` / `DE`).
* **Transparent Case Studies:** Every project details its `Dataset & Scope` (source, exact row count, date range, simulated vs. public nature), embedded AWS V5.0.1 architecture diagrams & live evidence (`images/aws/`), and explicit separation between observed insights and A/B test hypotheses.
* **Hosting & Deployment:** Continuous Deployment (CI/CD) via Vercel connected to GitHub.

---

## 📂 Project Showcase & Case Studies

| Project | Track & Focus | Dataset & Scale | Stack |
| :--- | :--- | :--- | :--- |
| **[aws-data-pipeline](https://github.com/AOMINHTAM/aws-data-pipeline)** | Data Engineering (`V5.0.1` IaC & Event-Driven ELT) | Olist Kaggle (`99,441` orders, Sep 2016–Oct 2018) | AWS CloudFormation, S3, SQS + DLQ, CloudWatch, SNS, Redshift Serverless, Airflow 3 (`AssetWatcher`), dbt Core |
| **[dbt-snowflake-data-pipeline](https://github.com/AOMINHTAM/dbt-snowflake-data-pipeline)** | Data Engineering (Cloud ELT & Star Schema) | Snowflake TPC-H Sample Data | Snowflake, dbt Core, Apache Airflow (Cosmos), Docker |
| **[customer-rfm-segmentation-analysis](https://github.com/AOMINHTAM/customer-rfm-segmentation-analysis)** | Data Analytics (Customer 360 & RFM) | Simulated E-Commerce (`51,290` line-items / `25,728` orders / `17,415` customers, 2020–2023) | Python, Pandas, NumPy, Squarify, Seaborn |
| **[product-conversion-funnel-analysis](https://github.com/AOMINHTAM/product-conversion-funnel-analysis)** | Data Analytics (Funnel Diagnostics) | Maven Fuzzy Factory (`32,313` orders, `472,871` sessions, 2012–2015) | Python, Pandas, Plotly Funnel, Seaborn |
| **[cohort-retention-analysis](https://github.com/AOMINHTAM/cohort-retention-analysis)** | Data Analytics (Retention Modeling) | Simulated E-Commerce (`51,290` line-items / `17,415` customers, 2020–2023) | Python, Pandas, Cohort Heatmaps |
| **[user-journey-sankey-analysis](https://github.com/AOMINHTAM/user-journey-sankey-analysis)** | Data Analytics (Clickstream Flow DAGs) | Maven Fuzzy Factory (`1,188,124` pageviews, `472,871` sessions, 2012–2015) | Python, Pandas, Plotly (Sankey DAG) |
| **[market-basket-analysis](https://github.com/AOMINHTAM/market-basket-analysis)** | Data Analytics (Apriori Association Rules) | Simulated E-Commerce (`25,728` baskets / `51,290` items, 2020–2023) | Python, mlxtend (Apriori), TransactionEncoder |
| **[abc-inventory-analysis](https://github.com/AOMINHTAM/abc-inventory-analysis)** | Data Analytics (Pareto ABC Profitability) | Simulated E-Commerce (`51,290` line-items / `17,415` customers, 2020–2023) | Python, Pandas, Pareto ABC, IQR Auditing |
| **[pareto-revenue-analysis](https://github.com/AOMINHTAM/pareto-revenue-analysis)** | Data Analytics (Pareto 80/20 Revenue) | Maven Fuzzy Factory (`32,313` orders, 2012–2015) | Python, Pandas, Dual-Axis Pareto |

---

## 🚀 Local Development Setup

```bash
git clone https://github.com/AOMINHTAM/portfolio-data-analytics.git
cd portfolio-data-analytics
python -m http.server 8000
```
