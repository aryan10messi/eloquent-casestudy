import { createContext, useContext, useState, type ReactNode } from "react";
import { users as initialUsers, type User } from "../data/users";
import { transactions as generatedTransactions, type Transaction } from "../data/transactions";

interface DataContextType {
  users: User[];
  transactions: Transaction[];
  updateUser: (userId: string, changes: Partial<User>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [transactions] = useState<Transaction[]>(generatedTransactions);

  const updateUser = async (userId: string, changes: Partial<User>) =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, ...changes } : u))
        );
        resolve();
      }, 800);
    });

  return (
    <DataContext.Provider value={{ users, transactions, updateUser }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextType {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
}
