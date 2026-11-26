# 🌐 Ao Minh Tâm — Data & Analytics Engineering Portfolio

Personal portfolio website of **Ao Minh Tâm** (Third-Year IT Undergraduate at HCMUNRE, open to **Data Intern** roles with a strong passion for **Analytics Engineering**), showcasing **Data Engineering** (AWS CloudFormation IaC, Event-Driven ELT V5.0.1, Snowflake, dbt, Airflow 3) and **Data Analytics** case studies (RFM, Conversion Funnels, Cohort Retention, Sankey Flows, Market Basket, Pareto ABC).

🔗 **Live Website:** https://aominhtam-portfolio.vercel.app/  
📄 **Public Resume (PDF):** [assets/Ao-Minh-Tam-Resume.pdf](assets/Ao-Minh-Tam-Resume.pdf)  
💼 **LinkedIn:** https://www.linkedin.com/in/ao-minh-tam/  
👤 **GitHub Profile:** https://github.com/AOMINHTAM

---

## 📜 Credentials & Training

* **dbt Fundamentals — Verified Credential** (`dbt Labs`, Credential ID: `daf3523f-38ca-48fe-9b95-548d6ca7da8d`)
* **AI Career Readiness Training — Certificate of Completion** (`ASEAN Foundation & LinkedIn`, Issued Nov 21, 2026)

---

## 🛠️ Architecture & Features

* **Frontend:** Semantic HTML5, Vanilla CSS3 (Custom "Cyber Amber" Theme with Dark/Light modes, Hero & Case Study cyber-grids, mouse-tracking card spotlights, interactive live ELT pipeline flow & `1.2s` entry preloader), JavaScript (ES6+ with ScrollSpy `history.replaceState` URL hash syncing, sliding navbar indicator, `Ctrl+K` Command Palette, Lightbox gallery navigation, Case Study mini-TOC & read time, progress-ring Back-to-Top, toast feedback, terminal typewriter reveals & staggered scroll animations).
* **Bilingual Support (EN / VI):** Dynamic `EN / VI` language switcher in the navbar (`i18n/common.js`, `i18n/home.js`, and 9 page-scoped modules in `i18n/projects/`) persisting preference in `localStorage` across the homepage and all 9 case studies.
* **Dual-Track HR Navigation, Resume & 3D Roadmap:** Hero track shortcuts (`Explore DA Projects` / `Explore DE Projects`) wired to interactive category filters, public 1-page PDF resume (`assets/Ao-Minh-Tam-Resume.pdf`), **Education & Activities** (HCMUNRE + AWS First Cloud Journey), and a **Career Roadmap** section featuring interactive 3D flip cards (`3 / 5 / 10 Years`). Defaults to **4 Featured Flagship Projects** (2 DE + 2 DA) with an expand toggle (`Show All 9 Projects`).
* **Transparent Case Studies:** Every project details its `Dataset & Scope` (source, exact row count, date range, simulated vs. public nature), methodological formulas/denominators, embedded AWS V5.0.1 architecture diagrams & live evidence (`images/aws/`), and explicit separation between observed insights and A/B test hypotheses.
* **Technical SEO, PWA & Analytics:** Configured `robots.txt`, `sitemap.xml`, `site.webmanifest`, `apple-touch-icon.png` (`180×180`), `icon-192.png` / `icon-512.png`, per-page Open Graph (`og:image` `1200x630` banner) & `canonical` tags, connected `@graph` JSON-LD schemas (`WebSite`, `ProfilePage`, `Person` with `hasCredential`, `CreativeWork`, `BreadcrumbList`), semantic `H1 → H2 → H3` headings, explicit `width`/`height` + `loading="lazy"` on diagrams, GA4 (`G-VRB4RENV7J`) across all pages, and a floating Back-to-Top control.
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
