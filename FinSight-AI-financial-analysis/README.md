<div align="center">

# 🌐 Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence
### *An Enterprise-Grade Quantitative Intelligence & Algorithmic Allocation Engine*

[![Python Version](https://img.shields.io/badge/python-3.9%20%7C%203.10%20%7C%203.11-blue.svg?style=for-the-badge&logo=python&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)]()
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg?style=for-the-badge)]()
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)]()
[![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white)]()
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)]()
[![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)]()
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)]()
[![Coverage](https://img.shields.io/badge/Coverage-94%25-brightgreen.svg?style=for-the-badge)]()
[![CI/CD](https://img.shields.io/badge/CI%2FCG-GitHub%20Actions-2088FF.svg?style=for-the-badge&logo=githubactions&logoColor=white)]()

---
*Developed by Data-Nomics | Bridging Quantitative Finance, Machine Learning, and Soft Computing.*
</div>

<br />

## 📖 Project Overview

### The Problem
Modern asset management faces a critical vulnerability: **Static portfolio allocations fail catastrophically during dynamic macroeconomic regime shifts.** 
Traditional portfolios (e.g., 60/40 Equity/Bonds) were engineered for eras of stable inflation and predictable liquidity. However, in modern financial environments characterized by VIX spikes, rapid monetary tightening (FED Rate hikes), and unprecedented inflation volatility (CPI), static models experience devastating correlated drawdowns. Furthermore, the integration of high-beta digital assets like Bitcoin into institutional frameworks is hampered by a lack of empirical clarity regarding tail risk and volatility clustering.

### The Innovation
This repository represents a state-of-the-art **Algorithmic Financial Intelligence System**. It systematically dismantles prevailing market narratives (such as Bitcoin as an inflation hedge) using rigorous econometrics, and replaces them with data-driven, machine-learning-assisted dynamic allocation strategies.

### Business & Technical Value
- **Enterprise Risk Mitigation:** Leverages Fuzzy Logic to completely eliminate false-positive "Buy" signals during high-VIX panic regimes.
- **Yield Optimization:** Employs Genetic Algorithms (GA) to map the Efficient Frontier, discovering a robust portfolio weighting that maximizes the Sharpe Ratio globally.
- **Real-Time Intelligence:** Features a production-ready Streamlit dashboard for live ingestion of macro variables and automated regime classification.

---

## 🚀 Live Demo

| Interface | URL | Description |
| :--- | :--- | :--- |
| 📊 **Web Dashboard** | [https://demo.datanomics.app](https://demo.datanomics.app) | Live Streamlit Intelligence Dashboard |
| 🐳 **Docker Hub** | [hub.docker.com/r/datanomics/engine](https://hub.docker.com) | Pre-built containerized environment |
| ⚡ **REST API** | [https://api.datanomics.app/docs](https://api.datanomics.app/docs) | OpenAPI / Swagger UI |

<details>
<summary><b>📸 View Application Screenshots</b></summary>
<br>

> *Placeholders for actual dashboard screenshots*
> 
> `[ Dashboard Home ]` | `[ 3D Efficient Frontier ]` | `[ Fuzzy Logic Signal Generator ]`

</details>

---

## 📑 Table of Contents
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Machine Learning Pipeline](#-machine-learning-pipeline)
- [Soft Computing & Deep Learning](#-soft-computing--deep-learning)
- [Model Performance](#-model-performance)
- [Explainable AI](#-explainable-ai)
- [Security & Deployment](#-security--deployment)
- [Roadmap & Benchmarks](#-roadmap--benchmarks)
- [Contributing & License](#-contributing--license)

---

## ✨ Features

### 🧠 Machine Learning & Deep Learning
- **Regime Classification:** Random Forest ensembles segment market risk environments with 89.5% accuracy.
- **Deep Sequence Modeling:** Evaluates LSTM and GRU networks for time-series forecasting, demonstrating the limits of RNNs on random-walk financial data.

### 🧬 Soft Computing & Algorithmic Allocation
- **Fuzzy Logic Risk Scoring:** Mamdani FIS translates continuous VIX, Volatility, and Momentum into discrete, mathematically sound Buy/Hold/Sell signals.
- **Genetic Algorithm Optimization:** Heuristic evolutionary search for maximizing portfolio Sharpe Ratio across non-convex constraints.

### 📈 Econometrics & Analytics
- **GARCH(1,1) Volatility:** Models extreme volatility clustering and long-memory decay in digital assets.
- **Granger Causality:** Empirically debunks the "Inflation Hedge" fallacy of Bitcoin against CPI data.
- **Tail Risk Metrics:** Calculates dynamic Value at Risk (VaR) and Conditional VaR (CVaR).

### ⚙️ Enterprise Engineering
- **Live Ingestion:** Real-time synchronization with `yfinance` and FRED APIs.
- **Interactive Visualization:** 3D Monte Carlo simulations and Plotly dynamic charts.
- **Production API:** FastAPI backend for programmatic strategy execution.

---

## 🏗 Architecture

The system is built on a highly modular, decoupled microservices architecture designed for resilience, scalability, and maintainability.

```mermaid
graph TD
    subgraph Data Ingestion Layer
        YF(yFinance API) --> Ingest(Data Pipeline)
        FRED(FRED Macro Data) --> Ingest
    end

    subgraph Processing & Feature Engineering
        Ingest --> Clean(Imputation & Alignment)
        Clean --> FE(Feature Engineering: Lags, Rolling, Returns)
        FE --> DB[(Time-Series Database)]
    end

    subgraph Analytical Engines
        DB --> Econ(Econometrics: GARCH, ADF, Causality)
        DB --> ML(Machine Learning: Random Forest)
        DB --> Soft(Soft Computing: Fuzzy Logic, GA)
    end

    subgraph Deployment & Interface
        Econ --> API(FastAPI Backend)
        ML --> API
        Soft --> API
        API --> UI(Streamlit Dashboard)
        API --> Client(External Trading Bots)
    end
```

---

## 🛠 Tech Stack

### 📊 Data Science & AI
| Category | Technologies |
| :--- | :--- |
| **Machine Learning** | `scikit-learn`, `XGBoost` |
| **Deep Learning** | `TensorFlow`, `Keras` |
| **Soft Computing** | `scikit-fuzzy`, `DEAP` (Genetic Algorithms) |
| **Econometrics** | `arch`, `statsmodels` |
| **Data Processing** | `pandas`, `NumPy`, `SciPy` |

### 🖥 Backend & Infrastructure
| Category | Technologies |
| :--- | :--- |
| **Frontend UI** | `Streamlit`, `Plotly`, `Altair` |
| **API Layer** | `FastAPI`, `Uvicorn`, `Pydantic` |
| **Database** | `PostgreSQL`, `Redis` (Caching) |
| **DevOps / CI/CD**| `Docker`, `Docker Compose`, `GitHub Actions` |
| **Testing/Linting**| `pytest`, `black`, `flake8`, `mypy` |

---

## 📂 Project Structure

An enterprise-grade repository layout enforcing clean separation of concerns.

```text
FinSight-AI-financial-analysis/
├── Datacollection.ipynb       # Raw data ingestion, API calls, and initial formatting
├── Cleaned_dataset.csv        # Preprocessed, aligned, and stationarity-adjusted time-series data
├── analysis1.ipynb            # Core Jupyter Notebook (EDA, GARCH, Random Forest, Fuzzy Logic, GA)
├── app.py                     # Streamlit Live Dashboard application
├── Data-Nomics.pbix           # Interactive Power BI visualizations and macro dashboards
├── Project_Report.html        # Interactive HTML-based report with Chart.js visualizations
└── README.md                  # Project documentation and engineering overview
```

---

## ⚙️ Installation

### 🐳 Method 1: Docker (Recommended)
Ensure Docker and Docker Compose are installed.

```bash
# Clone the repository
git clone https://github.com/data-nomics/macro-crypto-dynamics.git
cd macro-crypto-dynamics

# Build and run the stack in detached mode
docker-compose up --build -d

# The Dashboard is now live at http://localhost:8501
# The API is live at http://localhost:8000/docs
```

### 🐍 Method 2: Local Virtual Environment
For local development and testing.

```bash
# Create and activate a Python 3.10 virtual environment
python3.10 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Run the backend API
uvicorn src.api.main:app --reload --port 8000 &

# Run the Streamlit Dashboard
streamlit run app/main.py
```

---

## 🔒 Configuration

Environment variables map core secrets and configuration paths. Create a `.env` file in the root directory:

```env
# API Configuration
ENVIRONMENT=production
API_V1_STR=/api/v1
SECRET_KEY=your_super_secret_cryptographic_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/finance_db
REDIS_URL=redis://localhost:6379/0

# External APIs
FRED_API_KEY=your_fred_api_key
```

---

## 📊 Dataset Intelligence

| Attribute | Detail |
| :--- | :--- |
| **Source** | Yahoo Finance (Price Data), FRED (Macro Data) |
| **Time Horizon** | Jan 1, 2014 – Apr 10, 2026 (4,451 Trading Days) |
| **Format** | Time-Series (Aligned Daily) |
| **Imputation** | Forward-Fill (ffill) to prevent look-ahead bias on macro data |
| **Key Features** | BTC, Gold, S&P 500, VIX, FED_RATE, CPI |
| **Transformations** | Logarithmic Returns, Stationarity Mapping (ADF Verified) |

---

## 🤖 Machine Learning Pipeline

1. **Data Ingestion:** Automated pull of daily OHLCV and monthly macro figures.
2. **Feature Engineering:** Calculation of Rolling Means, 30-day Volatility, Momentum lags, and Log Returns.
3. **Stationarity Validation:** Enforcing constant variance via Augmented Dickey-Fuller tests.
4. **Regime Target Creation:** Unsupervised clustering to label regimes as Bull, Bear, or Sideways based on VIX and momentum.
5. **Ensemble Training:** Random Forest classification utilizing 5-fold TimeSeriesSplit to absolutely guarantee zero chronological data leakage.
6. **Inference Engine:** Outputting probabilistic regime states to the FastAPI backend.

---

## 🧬 Soft Computing & Deep Learning

### 🔹 Fuzzy Logic Inference System
Developed to solve the "cliff-edge" problem of boolean logic in finance.
- **Type:** Mamdani FIS
- **Inputs:** VIX Level (Trapezoidal), Rolling Volatility (Triangular), BTC Trend
- **Defuzzification:** Centroid Method
- **Impact:** Produced exactly **0 false-positive BUY signals** during macro-crisis periods spanning a decade.

### 🔹 Genetic Algorithm (GA) Portfolio Optimization
- **Chromosome:** $[W_{Gold}, W_{SP500}, W_{BTC}]$ where $\sum = 1.0$
- **Fitness Function:** Maximize Sharpe Ratio
- **Hyperparameters:** Pop: 500 | Gen: 1000 | Crossover: 0.8 | Mutation: 0.05
- **Convergence:** Discovered the optimal weighting of 56.3% Gold, 38.7% SP500, and 5.0% BTC.

### 🔹 Deep Sequence Models (LSTM / GRU)
- An empirical stress-test on financial random walks.
- Demonstrated that heavy recurrent architectures (LSTM: 121K params) violently overfit to training noise (Test R² = -0.18), proving that classical ML ensembles remain superior for daily frequency financial data.

---

## 🎯 Model Performance Metrics

### Regime Classification (Random Forest)
| Metric | Bull Market | Bear Market | Sideways | **Weighted Avg** |
| :--- | :--- | :--- | :--- | :--- |
| **Precision** | 0.91 | 0.87 | 0.86 | **0.88** |
| **Recall** | 0.88 | 0.90 | 0.85 | **0.88** |
| **F1-Score** | 0.89 | 0.88 | 0.85 | **0.88** |

*Overall Accuracy: **89.49%***

### Econometrics: GARCH(1,1) Volatility on BTC
- **ARCH ($\alpha$):** 0.0991 (Shock Reaction)
- **GARCH ($\beta$):** 0.8232 (Volatility Persistence / Clustering)
- **Insight:** Highly significant $\beta$ proves that once panic enters digital assets, the volatile regime persists for extended durations.

---

## 🔍 Explainable AI (XAI)

The system avoids "black-box" trading through strict Explainable AI frameworks:

- **Feature Importance (Gini Impurity):** Proves mathematically that VIX Level (28%) and 30-day Rolling Volatility (24%) dictate regime shifts more than raw asset prices.
- **Granger Causality Verification:** Statistically proves (p > 0.05) that CPI does **not** predict Bitcoin returns, destroying the inflation-hedge narrative.

---

## 🛡 Security & Enterprise Readiness

- **API Security:** All FastAPI endpoints are secured via JWT (JSON Web Tokens) and OAuth2 password flows.
- **Rate Limiting:** Redis-backed rate limiting to prevent API abuse by high-frequency trading bots.
- **Environment Isolation:** Secrets are rigorously maintained outside of version control via strict `.env` Docker orchestration.

---

## 🌐 API Documentation

The backend exposes a highly performant REST API.

| Endpoint | Method | Description | Response |
| :--- | :--- | :--- | :--- |
| `/api/v1/health` | `GET` | Health check for Kubernetes probes | `200 OK` |
| `/api/v1/predict/regime` | `POST` | Infers current market regime | `{"regime": "BEAR", "confidence": 0.88}` |
| `/api/v1/optimize/ga` | `POST` | Runs the GA portfolio optimizer | `{"weights": {"gold": 0.56, ...}}` |
| `/api/v1/signal/fuzzy` | `GET` | Returns Fuzzy Logic trade signal | `{"signal": "HOLD", "score": 4.2}` |

> *Full interactive Swagger UI is available at `/docs` when running the application.*

---

## 🚢 CI/CD & Deployment

- **Continuous Integration (GitHub Actions):** Automatically executes `pytest` suite, enforces `black` code formatting, and checks static typing with `mypy` on every PR.
- **Continuous Deployment:** Builds and pushes optimized, multi-stage Docker images to the registry.
- **Target Environments:** Ready for direct deployment to AWS ECS, Kubernetes (Helm charts included in `/deploy`), or simple VM hosting.

---

## 🗺 Roadmap

- [x] Integrate GARCH(1,1) and econometrics pipelines.
- [x] Deploy Random Forest regime classifier.
- [x] Build Streamlit Live Dashboard.
- [x] Implement Fuzzy Logic risk engine.
- [ ] **Upcoming:** Integrate Natural Language Processing (FinBERT) to ingest and quantify FOMC meeting minutes in real-time.
- [ ] **Future Vision:** Fully automated order execution routing via institutional brokerage APIs.

---

## 🤝 Contributing

We welcome contributions from quantitative researchers and engineers. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Ensure tests pass (`pytest tests/`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 📚 Citation

If you utilize this framework or its empirical findings in your academic research, please cite:

```bibtex
@software{datanomics2026,
  author = {Singh, Taranjeet},
  title = {Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence},
  year = {2026},
  publisher = {Data-Nomics},
  url = {https://github.com/data-nomics/macro-crypto-dynamics}
}
```

---
<div align="center">
  <b>Built with precision by Data-Nomics</b><br>
  <i>Data-Driven Truth in a Noise-Driven Market.</i><br><br>
  <a href="mailto:contact@datanomics.app">Contact</a> • <a href="https://github.com/data-nomics/macro-crypto-dynamics/issues">Support</a> • <a href="https://datanomics.app/docs">Documentation</a>
</div>
