export const mockPortfolioData = {
  totalValue: 2847650.5,
  dailyPnL: 12450.75,
  positions: [
    {
      symbol: "SOJA",
      quantity: "15000",
      avgPrice: "1575.20",
      currentPrice: "1580.50",
      pnl: "79500.00",
      pnlPercent: "0.34",
    },
    {
      symbol: "MILHO",
      quantity: "8500",
      avgPrice: "885.40",
      currentPrice: "890.25",
      pnl: "41225.00",
      pnlPercent: "0.55",
    },
    {
      symbol: "CAFE",
      quantity: "3200",
      avgPrice: "2320.80",
      currentPrice: "2340.80",
      pnl: "64000.00",
      pnlPercent: "0.86",
    },
  ],
}

export const mockVaultData = [
  {
    id: "vault-001",
    name: "Soja Yield Vault",
    strategy: "Liquidity Mining + Futures Arbitrage",
    tvl: "12500000",
    apy: "18.5",
    userDeposit: "50000",
    userShare: "0.4",
    riskLevel: "Medium",
  },
  {
    id: "vault-002",
    name: "Stablecoin Farming",
    strategy: "Multi-Protocol Yield Farming",
    tvl: "8750000",
    apy: "12.3",
    userDeposit: "25000",
    userShare: "0.29",
    riskLevel: "Low",
  },
]

export const mockOracleData = [
  {
    pair: "SOJA/USD",
    price: "1580.50",
    confidence: "99.8",
    lastUpdate: "2 seconds ago",
    source: "Chainlink + Custom Feeds",
    deviation: "0.02",
  },
  {
    pair: "MILHO/USD",
    price: "890.25",
    confidence: "99.5",
    lastUpdate: "5 seconds ago",
    source: "Chainlink + Custom Feeds",
    deviation: "0.05",
  },
]
