import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("wallet", "routes/wallet.tsx"),
  route("tokens", "routes/tokens.tsx"),
  route("nft", "routes/nft.tsx"),
  route("voting", "routes/voting.tsx"),
  route("send-eth", "routes/send-eth.tsx"),
] satisfies RouteConfig;
