import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const exchange = searchParams.get("exchange") || "ALL"
  const latency = searchParams.get("latency") || "delayed15"

  if (request.headers.get("upgrade") !== "websocket") {
    return new Response("Expected websocket", {
      status: 426,
      headers: {
        Upgrade: "websocket",
        Connection: "Upgrade",
      },
    })
  }

  const mockQuotes = [
    { symbol: "SOJA", price: 1456.78, change: 2.34, exchange: "B3" },
    { symbol: "MILHO", price: 687.45, change: -5.67, exchange: "B3" },
    { symbol: "CAFE", price: 2134.56, change: 12.45, exchange: "B3" },
    { symbol: "ZCZ5", price: 450.25, change: 1.25, exchange: "CME" },
    { symbol: "ZSZ5", price: 1150.5, change: -3.75, exchange: "CME" },
  ]

  return new Response(
    JSON.stringify({
      message: "WebSocket endpoint ready for market data streaming",
      exchange,
      latency,
      protocols: ["realtime", "delayed15", "eod"],
      operations: ["sub", "unsub", "ping", "pong"],
      connectionInfo: {
        maxSubscriptions: 100,
        heartbeatInterval: 30000,
        reconnectDelay: 5000,
        supportedExchanges: ["CME", "ICE", "B3", "DCE", "SHFE", "MCX"],
      },
      examples: {
        subscribe: {
          op: "sub",
          symbols: ["SOJA", "MILHO", "ZCZ5"],
          latency: latency,
          exchange: exchange,
        },
        unsubscribe: {
          op: "unsub",
          symbols: ["SOJA"],
        },
        heartbeat: {
          op: "ping",
        },
      },
      mockData: {
        sampleQuotes: mockQuotes,
        updateFrequency: latency === "realtime" ? "immediate" : "15min",
        dataFields: [
          "symbol",
          "price",
          "bid",
          "ask",
          "volume",
          "change",
          "changePercent",
          "high",
          "low",
          "open",
          "timestamp",
        ],
      },
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Upgrade, Connection",
      },
    },
  )
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Upgrade, Connection",
    },
  })
}
