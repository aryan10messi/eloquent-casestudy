import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Building2,
  FileText,
  Mail,
  Calendar,
  Pencil,
  X,
} from "lucide-react";
import { useData } from "../context/DataContext";
import { getUserMetrics } from "../data/formulas";
import Card from "../components/Card";
import Button from "../components/Button";

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, transactions, updateUser } = useData();

  const [user, setUser] = useState<(typeof users)[0] | undefined>(undefined);
  const [segment, setSegment] = useState("Individual");
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [ltv, setLtv] = useState(0);
  const [txCount, setTxCount] = useState(0);
  const [lastActivity, setLastActivity] = useState("");

  useEffect(() => {
    document.title = "Eloquent Case Study";
  }, []);

  useEffect(() => {
    const found = users.find((u) => u.id === id);
    if (found) {
      setUser(found);
      setSegment(found.segment);
      const m = getUserMetrics(found, transactions);
      setLtv(m.totalSpent);
      setTxCount(m.txCount);
      const iso = m.lastTxDateISO
        ? new Date(m.lastTxDateISO).toISOString().split("T")[0]
        : "";
      setLastActivity(iso);
    }
  }, [id, users, transactions]);

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-500">Loading entity...</div>
    );
  }

  const computed = getUserMetrics(user, transactions);

  const handleSave = async () => {
    setSaving(true);
    const changes: Record<string, unknown> = { segment };
    if (editing) {
      changes.lifetimeValueOverride = ltv;
      changes.transactionCountOverride = txCount;
      if (lastActivity) {
        changes.lastActivityOverride = new Date(lastActivity).toISOString();
      }
    }
    await updateUser(user.id, changes);
    setSaving(false);
    setEditing(false);
    navigate("/");
  };

  const toggleEdit = () => {
    if (editing) {
      setLtv(computed.totalSpent);
      setTxCount(computed.txCount);
      const iso = computed.lastTxDateISO
        ? new Date(computed.lastTxDateISO).toISOString().split("T")[0]
        : "";
      setLastActivity(iso);
    }
    setEditing(!editing);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-gray-500 hover:text-[#57288F] transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.name}
          </h1>
          <div className="flex items-center text-gray-500 text-sm">
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-medium mr-3">
              ID: {user.id}
            </span>
            <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
          </div>
        </div>
        <Button
          variant="success"
          onClick={handleSave}
          isLoading={saving}
          className="shadow-md hover:shadow-lg"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Entity Configuration */}
        <Card className="border-l-4 border-l-[#57288F]">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Entity Configuration
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Segment
              </label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-[#57288F] focus:ring-[#57288F] transition-all"
              >
                <option value="Enterprise">Enterprise</option>
                <option value="SME">SME</option>
                <option value="Startup">Startup</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-600 border border-gray-100 flex items-center justify-between">
                <span className="capitalize">{user.status}</span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    user.status === "active" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Contact + Financial */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
              <Building2 className="w-4 h-4 mr-2" /> Contact Details
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-400">Email Address</div>
                <div className="text-gray-900 font-medium flex items-center">
                  <Mail className="w-3 h-3 mr-2 text-gray-400" />
                  {user.email}
                </div>
              </div>
            </div>
          </Card>

          <Card
            className={`transition-all duration-300 ${
              editing ? "ring-2 ring-[#57288F]/20 shadow-md" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 flex items-center">
                <FileText className="w-4 h-4 mr-2" /> Financial Overview
              </h3>
              <Button
                variant="ghost"
                className="h-8 px-2 text-xs"
                onClick={toggleEdit}
              >
                {editing ? (
                  <span className="flex items-center text-gray-500">
                    <X className="w-3 h-3 mr-1" /> Cancel
                  </span>
                ) : (
                  <span className="flex items-center text-[#57288F]">
                    <Pencil className="w-3 h-3 mr-1" /> Edit
                  </span>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Lifetime Value</div>
                {editing ? (
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      value={ltv}
                      onChange={(e) => setLtv(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 text-sm font-bold text-[#57288F] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#57288F] focus:ring-1 focus:ring-[#57288F]"
                    />
                  </div>
                ) : (
                  <div className="text-xl font-bold text-[#57288F]">
                    ${computed.totalSpent.toLocaleString()}
                  </div>
                )}
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-1">
                  Total Transactions
                </div>
                {editing ? (
                  <input
                    type="number"
                    value={txCount}
                    onChange={(e) => setTxCount(Number(e.target.value))}
                    className="w-full px-4 py-2 text-sm font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#57288F] focus:ring-1 focus:ring-[#57288F]"
                  />
                ) : (
                  <div className="text-xl font-bold text-gray-900">
                    {computed.txCount}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs text-gray-400 mb-1">Last Activity</div>
              {editing ? (
                <input
                  type="date"
                  value={lastActivity}
                  onChange={(e) => setLastActivity(e.target.value)}
                  className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#57288F] focus:ring-1 focus:ring-[#57288F]"
                />
              ) : (
                <div className="text-gray-600 flex items-center">
                  <Calendar className="w-3 h-3 mr-2 text-gray-400" />
                  {computed.lastTxDate}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
