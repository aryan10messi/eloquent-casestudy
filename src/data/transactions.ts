import { users, type User } from "./users";

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  date: string;
  status: "completed" | "failed";
  category: "Add-on" | "Subscription";
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 4294967295;
    return (s >>> 0) / 4294967295;
  };
}

function generateTransactions(userList: User[]): Transaction[] {
  const txs: Transaction[] = [];
  const rand = seededRandom(42);
  const refDate = new Date("2026-03-04T12:00:00Z");
  const atRiskUserIds = ["u5", "u13", "u17"];

  userList.forEach((user) => {
    const txCount =
      user.segment === "Enterprise" ? 15 : user.segment === "SME" ? 8 : 3;

    for (let i = 0; i < txCount; i++) {
      const date = new Date(refDate);
      if (atRiskUserIds.includes(user.id)) {
        date.setDate(date.getDate() - (75 + Math.floor(rand() * 30)));
      } else {
        date.setDate(date.getDate() - Math.floor(rand() * 90));
      }

      txs.push({
        id: `tx_${user.id}_${i}`,
        userId: user.id,
        amount:
          user.segment === "Enterprise"
            ? Math.floor(rand() * 5000) + 1000
            : Math.floor(rand() * 500) + 50,
        date: date.toISOString(),
        status: rand() > 0.1 ? "completed" : "failed",
        category: rand() > 0.7 ? "Add-on" : "Subscription",
      });
    }
  });
  return txs;
}

export const transactions: Transaction[] = generateTransactions(users);
