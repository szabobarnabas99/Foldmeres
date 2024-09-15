import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import logo2 from "../assets/logo2.svg";
import "../App.css";

const Nav = () => {
    let Links = [
        { name: "KEZDŐLAP", link: "#" },
        { name: "RÓLUNK", link: "#about" },
        { name: "MUNKÁINK", link: "#projects" },
        { name: "KAPCSOLAT", link: "#contact" },
    ];
    let [open, setOpen] = useState(false);
    let [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = () => {
        setOpen(false); // Close the navigation menu when a link is clicked
    };

    const handleMobileMenuClick = () => {
        setOpen(!open); // Toggle the state to open/close the menu
    };

    return (
        <div className="  fixed top-0 left-0 z-50 w-[100svw]">
            <div
                className={`md:flex items-center md:justify-between md:bg-opacity-100  max-md:bg-black transition-all duration-500 py-4 max-xl:px-5 xl:px-10 px-7 ${
                    scrolling ? "bg-white shadow-md" : "bg-transparent"
                }`}
            >
                {/* logo section */}
                <div className="font-bold text-2xl cursor-pointer flex justify-between gap-1 z-50">
                    <a href="#" className="max-md:hidden">
                        <img
                            className="w-36 max-md:hidden"
                            src={logo}
                            alt="logo"
                            title="logo"
                            loading="eager"
                            width={144}
                            height={38}
                        />
                    </a>
                    <img
                        className="w-[1.75rem] md:hidden z-50"
                        src={logo2}
                        alt="logo"
                        title="small logo"
                        loading="eager"
                        width={28}
                        height={28}
                    />
                    <div
                        className="mt-[5px] md:hidden z-50"
                        onClick={handleMobileMenuClick}
                    >
                        <div
                            className={`patty ${open ? "active" : ""}`} // Apply active class based on state
                        ></div>
                    </div>
                </div>
                {/* Menu icon */}

                {/* link items */}
                <ul
                    className={`md:flex md:items-center md:justify-center md:pb-0 max-md:pb-0 absolute md:static max-md:bg-white md:z-50 z-[-1] left-0 max-md:w-[100svw] md:w-[100svw] md:pl-0 pl-9 transition-all duration-[800ms] ease-out ${
                        open ? "top-10" : "top-[-240px]"
                    }`}
                >
                    {Links.map((link, index) => (
                        <li
                            className="md:ml-8 md:my-0 my-7 font-semibold first:ml-0 relative "
                            key={index}
                        >
                            {" "}
                            {/* Added key prop */}
                            <a
                                href={link.link}
                                className="md:text-gray-800  max-md:text-black duration-500  hover:text-red-500 "
                                onClick={handleClick} // Close the menu when a link is clicked
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
                {/* button */}
                <a href="#contact">
                    <button className="hidden relative md:flex  text-black bg-[#FFA63D] hover:bg-red-500 hover:text-white duration-500  font-medium rounded-3xl text-sm px-5 py-2.5 text-center ">
                        <span>Beszéljünk!</span>
                    </button>
                </a>
            </div>
        </div>
    );
};

export default Nav;
