/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import useScroll from "../../hooks/useScroll";

const MissionItem = ({ index, imageUrl, name, info, flyTo, coords, readClicked, setreadClicked, fadeClass }) => {
    const currElem = useRef();
    const { pos } = useScroll(currElem);
    const currState = useRef(false);
    const mobileOnly = useMediaQuery("(max-width:768px)");
    const [onFocus, setOnFocus] = useState(false);

    useEffect(() => {
        if (!mobileOnly) {
            checkOnFocus();
        }
    }, [pos])

    useEffect(() => {
        if (mobileOnly) { return }
        let timeout;
        setInterval(() => {
            if (timeout) { return }
            timeout = setTimeout(() => {
                if (currState.current === false) { return }
                let top = currElem.current.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: top - 225 })
            }, 50)
        }, 10)

        function scrollFunction() {
            clearTimeout(timeout);
            timeout = null;
        }

        document.addEventListener('scroll', scrollFunction);

        return () => {
            document.removeEventListener('scroll', scrollFunction);
        }
    }, [])

    const clickedHandler = (e) => {
        e.stopPropagation();
        setreadClicked(prevState => {
            return {
                clicked: !prevState.clicked,
                clickedBy: prevState.clicked ? -1 : index
            };
        })
    }

    const checkOnFocus = () => {
        if (pos <= 230 && pos >= 110) {
            if (!readClicked.clicked) {
                flyTo(coords);
                setOnFocus(true);
                currState.current = true;
            }
        } else if (readClicked.clicked && readClicked.clickedBy === index) {
            setOnFocus(true);
            currState.current = true;
        } else {
            setOnFocus(false);
            currState.current = false;
        }
    }

    return <div
        className={`mission-item ${onFocus ? "focused" : ""} 
        ${readClicked.clicked && readClicked.clickedBy === index && !mobileOnly ? "read-more-active" : ""}
        ${readClicked.clicked && readClicked.clickedBy === index && mobileOnly ? "read-more-active-mobile" : ""}\
        ${mobileOnly ? fadeClass ? "fade-in-one" : "fade-in-two" : ""}
        `
        }
        ref={currElem}
        style={{ display: readClicked.clicked && readClicked.clickedBy !== index ? "none" : "inherit" }}
        onClick={() => {
            let top = currElem.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top - 225 })
        }}
    >

        <div className="list-decorator" >
            <img
                src="./images/icons/ring.svg"
                alt="List Decorator"
                style={{ visibility: readClicked.clicked && readClicked.clickedBy === index ? "hidden" : "visible" }}
            />
        </div>

        <div className={`mission_content_wrapper`}>
            <img src={imageUrl} alt={`Mission ${index}`} className="rescue_image" />
            <div className="info">
                <h3>{name}</h3>
                <p>{info}</p>
                <div className="button-container">
                    <button
                        className="button-fill"
                        onClick={clickedHandler}>
                        {!readClicked.clicked && readClicked.clickedBy !== index ? "SHOW MORE" : "SHOW LESS"}
                    </button>
                </div>
            </div>
        </div>
    </div >
};

export default MissionItem;