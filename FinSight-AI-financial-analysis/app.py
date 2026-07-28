import streamlit as st
import pandas as pd
import numpy as np
import yfinance as yf
import plotly.express as px
import plotly.graph_objects as go
from sklearn.cluster import KMeans

# -----------------------------
# CONFIG
# -----------------------------
st.set_page_config(page_title="Financial Intelligence System", layout="wide")

# -----------------------------
# THEME
# -----------------------------
st.markdown("""
<style>
body { background-color: #0e1117; color: white; }
.stMetric { background-color: #1c1f26; padding: 10px; border-radius: 10px; }
</style>
""", unsafe_allow_html=True)

# -----------------------------
# HEADER
# -----------------------------
st.title("🚀 Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence")
st.markdown("### BTC vs Traditional Assets | Portfolio | ML Regime Detection")

# -----------------------------
# SIDEBAR
# -----------------------------
st.sidebar.header("⚙️ Controls")

start = st.sidebar.date_input("Start Date", pd.to_datetime("2014-01-01"))
end = st.sidebar.date_input("End Date", pd.to_datetime("today"))

assets = ["BTC-USD", "^GSPC", "GLD", "^VIX"]

data = yf.download(assets, start=start, end=end)["Close"]

if data.empty:
    st.error("No data found. Change date range.")
    st.stop()

data.columns = ["BTC", "SP500", "GOLD", "VIX"]
data = data.dropna()

returns = np.log(data / data.shift(1)).dropna()

# -----------------------------
# KPI
# -----------------------------
st.subheader("📊 Market Snapshot")

col1, col2, col3, col4 = st.columns(4)

col1.metric("BTC", f"${data['BTC'].iloc[-1]:,.0f}")
col2.metric("SP500", f"{data['SP500'].iloc[-1]:,.0f}")
col3.metric("Gold", f"{data['GOLD'].iloc[-1]:,.0f}")
col4.metric("VIX", f"{data['VIX'].iloc[-1]:,.0f}")

# -----------------------------
# AUTO PORTFOLIO
# -----------------------------
st.sidebar.subheader("⚡ Portfolio Recommendation")

risk = st.sidebar.selectbox("Risk Level", ["Low", "Medium", "High"])

if risk == "Low":
    weights = [0.1, 0.4, 0.5]
elif risk == "Medium":
    weights = [0.3, 0.5, 0.2]
else:
    weights = [0.6, 0.3, 0.1]

st.sidebar.write("BTC:", weights[0]*100, "%")
st.sidebar.write("SP500:", weights[1]*100, "%")
st.sidebar.write("GOLD:", weights[2]*100, "%")

# -----------------------------
# RULE-BASED AI INSIGHTS
# -----------------------------
st.subheader("🧠 Smart Insights")

insights = []

if data["VIX"].iloc[-1] > 25:
    insights.append("⚠️ High volatility market (risk elevated)")
else:
    insights.append("✅ Market volatility under control")

if returns["BTC"].mean()*252 > returns["SP500"].mean()*252:
    insights.append("🚀 BTC outperforming traditional markets")
else:
    insights.append("📉 Traditional markets stronger than BTC")

corr = returns.corr().loc["BTC", "SP500"]

if corr < 0:
    insights.append("🛡️ BTC acting as diversification hedge")
else:
    insights.append("⚠️ BTC highly correlated with equities")

for i in insights:
    st.write(i)

# -----------------------------
# REGIME DETECTION (ML)
# -----------------------------
features = pd.DataFrame({
    "vol": returns.std(axis=1),
    "vix": data["VIX"],
    "ret": returns.mean(axis=1)
}).dropna()

kmeans = KMeans(n_clusters=3, random_state=0).fit(features)
features["Regime"] = kmeans.labels_

# -----------------------------
# TABS
# -----------------------------
tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
    "📈 Market",
    "📉 Risk",
    "🔗 Correlation",
    "💼 Portfolio 3D",
    "🧠 Strategy",
    "💰 SIP"
])

# -----------------------------
# MARKET
# -----------------------------
with tab1:
    norm = data / data.iloc[0]
    st.plotly_chart(px.line(norm, title="Asset Growth"), use_container_width=True)

    st.plotly_chart(px.histogram(returns, barmode="overlay"), use_container_width=True)

# -----------------------------
# RISK
# -----------------------------
with tab2:
    vol = returns.std() * np.sqrt(252)
    st.plotly_chart(px.bar(vol, title="Volatility"), use_container_width=True)

    rolling = returns.rolling(30).std() * np.sqrt(252)
    st.plotly_chart(px.line(rolling, title="Rolling Volatility"), use_container_width=True)

# -----------------------------
# CORRELATION
# -----------------------------
with tab3:
    st.plotly_chart(px.imshow(returns.corr(), text_auto=True, title="Correlation Matrix"), use_container_width=True)

# -----------------------------
# 3D PORTFOLIO
# -----------------------------
with tab4:
    results = []
    assets_port = ["BTC", "SP500", "GOLD"]

    for _ in range(1200):
        w = np.random.random(3)
        w /= w.sum()

        mean = returns[assets_port].mean()
        cov = returns[assets_port].cov()

        ret = np.sum(mean * w) * 252
        vol = np.sqrt(np.dot(w.T, np.dot(cov * 252, w)))
        sharpe = ret / vol

        results.append([ret, vol, sharpe])

    df = pd.DataFrame(results, columns=["Return", "Volatility", "Sharpe"])

    fig = go.Figure(data=[go.Scatter3d(
        x=df["Volatility"],
        y=df["Return"],
        z=df["Sharpe"],
        mode='markers',
        marker=dict(size=5, color=df["Sharpe"], colorscale='Viridis')
    )])

    fig.update_layout(
        height=800,
        scene=dict(
            xaxis_title='Risk (Volatility)',
            yaxis_title='Expected Return',
            zaxis_title='Sharpe Ratio'
        )
    )

    st.plotly_chart(fig, use_container_width=True)

# -----------------------------
# STRATEGY
# -----------------------------
with tab5:
    vix = data["VIX"].reindex(returns.index)
    signal = (vix < 25).astype(int)
    signal = signal.shift(1)

    strat_returns = (returns["BTC"] * signal).dropna()

    equity = (1 + strat_returns).cumprod()

    st.plotly_chart(px.line(equity, title="Strategy Performance"), use_container_width=True)

# -----------------------------
# SIP
# -----------------------------
with tab6:
    invest = st.slider("Monthly Investment ₹", 1000, 50000, 5000)
    asset = st.selectbox("Asset", ["BTC", "SP500", "GOLD"])

    monthly = returns[asset].resample("M").sum()

    value = 0
    portfolio = []

    for r in monthly:
        value = (value + invest) * (1 + r)
        portfolio.append(value)

    sip = pd.Series(portfolio, index=monthly.index)

    st.plotly_chart(px.line(sip, title="SIP Growth"), use_container_width=True)
    st.metric("Final Value", f"₹{sip.iloc[-1]:,.0f}")