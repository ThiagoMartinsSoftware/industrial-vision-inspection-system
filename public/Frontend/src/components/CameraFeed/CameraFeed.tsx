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
    const intervalRef = useRef<number | null>(null);

    const analisando = useRef(false);

    const [cameraOnline, setCameraOnline] = useState(false);
    const [ultimaCaptura, setUltimaCaptura] = useState("--:--:--");


    const fps = 30;
    const resolucao = "1280 x 720";
    const status = "READY";

    useEffect(() => {

        let stream: MediaStream | null = null;

        async function iniciarCamera() {

            try {

                const devices =
                    await navigator.mediaDevices.enumerateDevices();

                const possuiCamera = devices.some(

                    device => device.kind === "videoinput"

                );

                if (!possuiCamera) {

                    throw new Error("Nenhuma câmera encontrada.");

                }

                stream =
                    await navigator.mediaDevices.getUserMedia({

                        video: {

                            width: { ideal: 1280 },

                            height: { ideal: 720 },

                            frameRate: { ideal: 30 }

                        },

                        audio: false

                    });

                if (videoRef.current) {

                    videoRef.current.srcObject = stream;

                    await videoRef.current.play();

                }

                setCameraOnline(true);
                intervalRef.current = window.setInterval(() => {

                    if (!analisando.current) {

                        capturarFrame();

                    }

                }, 500);

                console.log("✅ Webcam iniciada.");

            }

            catch (erro) {

                console.error("Erro ao iniciar webcam:", erro);

                setCameraOnline(false);

            }

        }

        iniciarCamera();

        return () => {

            if (intervalRef.current) {

                clearInterval(intervalRef.current);

            }

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

    function capturarFrame() {

        if (!videoRef.current) return;

        if (!canvasRef.current) return;

        const video = videoRef.current;

        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;

        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        ctx.drawImage(

            video,

            0,

            0,

            canvas.width,

            canvas.height

        );

        console.log("📸 Frame capturado");

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

                            controls={false}

                            style={{

                                width: "100%",

                                height: "100%",

                                objectFit: "cover"

                            }}

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