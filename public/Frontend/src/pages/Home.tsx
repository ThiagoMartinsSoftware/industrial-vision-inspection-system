import CameraFeed from "../components/CameraFeed/CameraFeed";
import ResultCard from "../components/ResultCard/ResultCard";
import StatusPanel from "../components/StatusPanel/StatusPanel";
import HistoryPanel from "../components/HistoryPanel/HistoryPanel";
import ShiftPanel from "../components/ShiftPanel/ShiftPanel";

import "../styles/dashboard.css";

export default function Home() {
  return (
    <div className="dashboard">

      <header className="topbar">
        <h1>INDUSTRIAL VISION INSPECTION SYSTEM</h1>

        <div className="running">
          <span className="dot"></span>
          RUNNING
        </div>
      </header>

      <section className="inspection">

        <CameraFeed />

        <ResultCard />

      </section>

      <StatusPanel />

      <HistoryPanel />

      <ShiftPanel />

    </div>
  );
}