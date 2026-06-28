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

    const fps = 30;
    const resolucao = "1280 x 720";
    const status = "READY";

    useEffect(() => {

        async function iniciarCamera() {

            try {

                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {

                    throw new Error("Navegador não suporta acesso à câmera.");

                }

                const stream = await navigator.mediaDevices.getUserMedia({

                    video: {

                        width: {
                            ideal: 1280
                        },

                        height: {
                            ideal: 720
                        }

                    },

                    audio: false

                });

                if (videoRef.current) {

                    videoRef.current.srcObject = stream;

                    await videoRef.current.play();

                }

                setCameraOnline(true);

            }

            catch (erro) {

                console.error("Erro ao acessar câmera:", erro);

                setCameraOnline(false);

            }

        }

        iniciarCamera();

        return () => {

            const stream = videoRef.current?.srcObject as MediaStream;

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

                            playsInline

                            muted

                            controls={false}

                        />

                        :

                        <div className="camera-offline">

                            <h3>NO CAMERA DETECTED</h3>

                            <small>

                                Connect a USB camera or use TEST IMAGE.

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