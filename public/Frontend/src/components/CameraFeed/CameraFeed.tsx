import { useEffect, useRef } from "react";

export default function CameraFeed() {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {

        async function iniciarCamera() {

            try {

                const stream = await navigator.mediaDevices.getUserMedia({

                    video: {
                        width: 1280,
                        height: 720,
                        facingMode: "environment"
                    },

                    audio: false

                });

                if (videoRef.current) {

                    videoRef.current.srcObject = stream;

                }

            } catch (error) {

                console.error("Erro ao acessar câmera:", error);

                alert("Não foi possível acessar a câmera.");

            }

        }

        iniciarCamera();

        return () => {

            const stream = videoRef.current?.srcObject as MediaStream;

            stream?.getTracks().forEach(track => track.stop());

        };

    }, []);

    return (

        <div className="camera">

            <h2>CAMERA</h2>

            <div className="camera-box">

                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                />

            </div>

        </div>

    );

}