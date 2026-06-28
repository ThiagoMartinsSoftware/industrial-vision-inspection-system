import "./CameraFeed.module.css";

import { useEffect, useRef, useState } from "react";

type CameraFeedProps = {
    onCapture: (file: File) => void;
};

export default function CameraFeed({
    onCapture
}: CameraFeedProps) {

    const videoRef = useRef<HTMLVideoElement>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [cameraOnline, setCameraOnline] = useState(false);

    const [ultimaCaptura, setUltimaCaptura] = useState("--:--:--");

    const [fps] = useState(30);

    const [resolucao] = useState("1280 x 720");

    const [status] = useState("READY");

    useEffect(() => {

        async function iniciarCamera() {

            try {

                const stream =
                    await navigator.mediaDevices.getUserMedia({

                        video: {

                            width: 1280,

                            height: 720,

                            facingMode: "environment"

                        },

                        audio: false

                    });

                if (videoRef.current) {

                    videoRef.current.srcObject = stream;

                    setCameraOnline(true);

                }

            }

            catch {

                setCameraOnline(false);

            }

        }

        iniciarCamera();

        return () => {

            const stream =
                videoRef.current?.srcObject as MediaStream;

            stream?.getTracks().forEach(track => track.stop());

        };

    }, []);

    function selecionarImagem(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const file = event.target.files?.[0];

        if (!file) return;

        setUltimaCaptura(

            new Date().toLocaleTimeString()

        );

        onCapture(file);

    }

    return (

        <div className="camera">

            <h2>CAMERA</h2>

            <div className="camera-box">

                {

                    cameraOnline

                        ?

                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                        />

                        :

                        <div className="camera-offline">

                            NO CAMERA DETECTED

                            <small>

                                Connect a USB camera
                                or use TEST IMAGE.

                            </small>

                        </div>

                }

            </div>

            <canvas
                ref={canvasRef}
                style={{ display: "none" }}
            />

            <div className="camera-info">

                <div>

                    <strong>Status</strong>

                    {cameraOnline ? " 🟢 ONLINE" : " 🔴 OFFLINE"}

                </div>

                <div>

                    <strong>FPS</strong>

                    {fps}

                </div>

                <div>

                    <strong>Resolution</strong>

                    {resolucao}

                </div>

                <div>

                    <strong>Inspection</strong>

                    {status}

                </div>

                <div>

                    <strong>Last Capture</strong>

                    {ultimaCaptura}

                </div>

            </div>

            <label className="capture-button">

                TEST IMAGE

                <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={selecionarImagem}
                />

            </label>

        </div>

    );

}