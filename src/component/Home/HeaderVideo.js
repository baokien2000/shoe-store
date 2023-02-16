import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import pageSlice from "../../redux/Slice/pageSlice";

const HeaderVideo = ({ setActivePage }) => {
    const [VideoPlay, setVideoPlay] = useState(true);
    const [VideoMute, setVideoMute] = useState(true);
    const VideoControl = (action) => {
        const Vid = document.getElementById("Home_video");

        switch (action) {
            case "play":
                Vid.pause();
                setVideoPlay(false);
                break;
            case "stop":
                Vid.play();
                setVideoPlay(true);
                break;
            case "muted":
                setVideoMute(false);
                break;
            case "unMuted":
                setVideoMute(true);
                break;
        }
    };
    const dispatch = useDispatch();
    const ToggleButton = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
        dispatch(pageSlice.actions.TabsChange(1));
    };
    return (
        <div className="HeaderVideo">
            <video muted={VideoMute} autoPlay loop id="Home_video">
                <source src="./video/adidasVietnam.mp4" />
            </video>
            <Container>
                <div className="VideoTitle">
                    <h1>TRENDING SHOES</h1>
                    <p>Take your chance - miss nothing</p>
                    <div className="BuyNowBtn">
                        <Link to="/product">
                            <button onClick={ToggleButton}>Buy Now</button>
                        </Link>
                    </div>
                </div>

                <div className="VideoBtn">
                {VideoPlay ? (
                    <AiOutlinePauseCircle onClick={() => VideoControl("play")} />
                ) : (
                    <AiOutlinePlayCircle onClick={() => VideoControl("stop")} />
                )}
                {VideoMute ? (
                    <FiVolumeX onClick={() => VideoControl("muted")} />
                ) : (
                    <FiVolume2 onClick={() => VideoControl("unMuted")} />
                )}
            </div>
            </Container>


        </div>
    );
};

export default HeaderVideo;
