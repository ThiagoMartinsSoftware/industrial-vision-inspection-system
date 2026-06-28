import "./StatusPanel.module.css";

type StatusPanelProps = {

    cameraOnline: boolean;

    backendOnline: boolean;

    inspecao: string;

};

export default function StatusPanel({

    cameraOnline,

    backendOnline,

    inspecao

}: StatusPanelProps) {

    return (

        <div className="status">

            <h2>SYSTEM STATUS</h2>

            <div className="status-grid">

                <div>

                    Camera

                    <span>

                        {

                            cameraOnline

                                ? "🟢 ONLINE"

                                : "🔴 OFFLINE"

                        }

                    </span>

                </div>

                <div>

                    AI Model

                    <span>

                        🟢 IVIS 1.0

                    </span>

                </div>

                <div>

                    Backend

                    <span>

                        {

                            backendOnline

                                ? "🟢 ONLINE"

                                : "🔴 OFFLINE"

                        }

                    </span>

                </div>

                <div>

                    Inspection

                    <span>

                        {inspecao}

                    </span>

                </div>

            </div>

        </div>

    );

}