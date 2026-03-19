import type { User } from "./users";
import type { Transaction } from "./transactions";

function isWithinDays(dateStr: string, days: number): boolean {
  const d = new Date(dateStr);
  const diff = Math.abs(new Date().getTime() - d.getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) <= days;
}

export interface UserMetrics {
  totalSpent: number;
  txCount: number;
  lastTxDate: string;
  lastTxDateISO: string;
}

export function getUserMetrics(user: User, transactions: Transaction[]): UserMetrics {
  const completed = transactions.filter(
    (tx) => tx.userId === user.id && tx.status === "completed"
  );

  const totalSpent =
    user.lifetimeValueOverride !== undefined
      ? user.lifetimeValueOverride
      : completed.reduce((sum, tx) => sum + tx.amount, 0);

  const txCount =
    user.transactionCountOverride !== undefined
      ? user.transactionCountOverride
      : completed.length;

  const sorted = [...completed].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let lastTxDate = "Never";
  if (user.lastActivityOverride) {
    lastTxDate = new Date(user.lastActivityOverride).toLocaleDateString();
  } else if (sorted.length > 0) {
    lastTxDate = new Date(sorted[0].date).toLocaleDateString();
  }

  const lastTxDateISO =
    user.lastActivityOverride || (sorted.length > 0 ? sorted[0].date : "");

  return { totalSpent, txCount, lastTxDate, lastTxDateISO };
}

export interface KPIs {
  avgCustomerLTV: number;
  enterpriseShare: string;
  atRiskCount: number;
}

export function getKPIs(userList: User[], transactions: Transaction[]): KPIs {
  let totalLTV = 0;
  userList.forEach((user) => {
    if (user.lifetimeValueOverride !== undefined) {
      totalLTV += user.lifetimeValueOverride;
    } else {
      const completed = transactions.filter(
        (tx) => tx.userId === user.id && tx.status === "completed"
      );
      totalLTV += completed.reduce((sum, tx) => sum + tx.amount, 0);
    }
  });

  const avgCustomerLTV = userList.length > 0 ? Math.round(totalLTV / userList.length) : 0;

  const enterpriseIds = new Set(
    userList.filter((u) => u.segment === "Enterprise").map((u) => u.id)
  );

  const allCompletedTotal = transactions
    .filter((tx) => tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const enterpriseTotal = transactions
    .filter((tx) => tx.status === "completed" && enterpriseIds.has(tx.userId))
    .reduce((sum, tx) => sum + tx.amount, 0);

  const enterpriseShare =
    allCompletedTotal > 0 ? ((enterpriseTotal / allCompletedTotal) * 100).toFixed(1) : "0.0";

  const eligibleSegments = ["Enterprise", "SME"];
  const atRiskUsers = userList.filter((user) => {
    if (user.status !== "active" || !eligibleSegments.includes(user.segment)) return false;

    let lastActivity: string | null = null;
    if (user.lastActivityOverride) {
      lastActivity = user.lastActivityOverride;
    } else {
      const completed = transactions
        .filter((tx) => tx.userId === user.id && tx.status === "completed")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      if (completed.length > 0) lastActivity = completed[0].date;
    }

    if (lastActivity) return !isWithinDays(lastActivity, 60);
    return true;
  });

  return { avgCustomerLTV, enterpriseShare, atRiskCount: atRiskUsers.length };
}
