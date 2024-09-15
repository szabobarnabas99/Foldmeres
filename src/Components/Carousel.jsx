import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "flowbite";
import gps from "../assets/gps.jpeg";
import gps2 from "../assets/gps2.png";
import mero from "../assets/mero.jpeg";

const CarouselComponent = () => {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalDuration = 4500;
    const autoCycleRef = useRef(null);

    useEffect(() => {
        const items = [
            { position: 0, el: document.getElementById("carousel-item-1") },
            { position: 1, el: document.getElementById("carousel-item-2") },
            { position: 2, el: document.getElementById("carousel-item-3") },
            { position: 3, el: document.getElementById("carousel-item-4") },
        ];

        const options = {
            defaultPosition: 0,
            interval: intervalDuration,
            indicators: {
                activeClasses: "animate-fillUp bg-red-500",
                inactiveClasses: "bg-transparent",
                items: [
                    {
                        position: 0,
                        el: document.getElementById("carousel-indicator-1"),
                    },
                    {
                        position: 1,
                        el: document.getElementById("carousel-indicator-2"),
                    },
                    {
                        position: 2,
                        el: document.getElementById("carousel-indicator-3"),
                    },
                    {
                        position: 3,
                        el: document.getElementById("carousel-indicator-4"),
                    },
                ],
            },
            onChange: (position) => {
                setActiveIndex(position);
            },
        };

        const carousel = new Carousel(carouselRef.current, items, options);

        const startAutoCycle = () => {
            return setInterval(() => {
                carousel.next();
            }, intervalDuration);
        };

        autoCycleRef.current = startAutoCycle();

        const handlePrev = () => {
            clearInterval(autoCycleRef.current);
            carousel.prev();
            setActiveIndex((prevPosition) =>
                prevPosition === 0 ? items.length - 1 : prevPosition - 1
            );
            autoCycleRef.current = startAutoCycle();
        };

        const handleNext = () => {
            clearInterval(autoCycleRef.current);
            carousel.next();
            setActiveIndex((prevPosition) =>
                prevPosition === items.length - 1 ? 0 : prevPosition + 1
            );
            autoCycleRef.current = startAutoCycle();
        };

        document
            .getElementById("data-carousel-prev")
            .addEventListener("click", handlePrev);
        document
            .getElementById("data-carousel-next")
            .addEventListener("click", handleNext);

        const indicatorButtons = [
            document.getElementById("carousel-indicator-1"),
            document.getElementById("carousel-indicator-2"),
            document.getElementById("carousel-indicator-3"),
            document.getElementById("carousel-indicator-4"),
        ];

        indicatorButtons.forEach((button, position) => {
            const clickHandler = () => {
                clearInterval(autoCycleRef.current);
                carousel.slideTo(position);
                setActiveIndex(position);
                autoCycleRef.current = startAutoCycle();
            };
            button.addEventListener("click", clickHandler);
            button._clickHandler = clickHandler;
        });

        return () => {
            clearInterval(autoCycleRef.current);
            document
                .getElementById("data-carousel-prev")
                .removeEventListener("click", handlePrev);
            document
                .getElementById("data-carousel-next")
                .removeEventListener("click", handleNext);

            indicatorButtons.forEach((button) => {
                button.removeEventListener("click", button._clickHandler);
            });
        };
    }, []);

    useEffect(() => {
        const progressBars = document.querySelectorAll(
            ".carousel-indicator .progress"
        );

        progressBars.forEach((bar) => {
            bar.style.transition = "none";
            bar.style.width = "0%";
        });

        const activeIndicator = document.querySelector(".active .progress");

        if (activeIndicator) {
            // Add the delay before starting the progress bar animation
            setTimeout(() => {
                activeIndicator.style.transition = `width ${
                    intervalDuration / 1000
                }s linear`;
                activeIndicator.style.width = "100%";
            }); // Delay before the animation starts
        }
    }, [activeIndex, intervalDuration]);

    return (
        <div id="carousel-example" className="relative w-full mt-[72px]">
            <div
                ref={carouselRef}
                className="relative h-[600px] overflow-hidden rounded-lg"
            >
                {/* Carousel Items */}
                <div
                    id="carousel-item-1"
                    className="hidden duration-700 ease-in-out"
                >
                    <img
                        src={gps}
                        className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                        alt="Slide 1"
                    />
                </div>
                <div
                    id="carousel-item-2"
                    className="hidden duration-700 ease-in-out"
                >
                    <img
                        src={gps2}
                        className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                        alt="Slide 2"
                    />
                </div>
                <div
                    id="carousel-item-3"
                    className="hidden duration-700 ease-in-out"
                >
                    <img
                        src={mero}
                        className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                        alt="Slide 3"
                    />
                </div>
                <div
                    id="carousel-item-4"
                    className="hidden duration-700 ease-in-out"
                >
                    <img
                        src="https://via.placeholder.com/800x400?text=Slide+4"
                        className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                        alt="Slide 4"
                    />
                </div>
            </div>

            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
                {/* Carousel Indicators */}
                <button
                    aria-label="Slide 1"
                    data-carousel-slide-to="1"
                    className="w-3 carousel-button h-3 rounded-full carousel-indicator"
                    type="button"
                >
                    <div
                        id="carousel-indicator-1"
                        className="w-0 h-3 rounded-full carousel-indicator"
                    ></div>
                </button>
                <button
                    aria-label="Slide 2"
                    data-carousel-slide-to="2"
                    className="w-3 carousel-button h-3 rounded-full carousel-indicator"
                    type="button"
                >
                    <div
                        id="carousel-indicator-2"
                        className="w-0 rounded-full carousel-indicator"
                    ></div>
                </button>
                <button
                    aria-label="Slide 3"
                    data-carousel-slide-to="2"
                    className="w-3 carousel-button h-3 rounded-full carousel-indicator "
                    type="button"
                >
                    <div
                        id="carousel-indicator-3"
                        className="w-0 rounded-full carousel-indicator"
                    ></div>
                </button>
                <button
                    aria-label="Slide 4"
                    data-carousel-slide-to="3"
                    className="w-3 carousel-button h-3 rounded-full carousel-indicator"
                    type="button"
                >
                    <div
                        id="carousel-indicator-4"
                        className="w-0 rounded-full color-black carousel-indicator"
                    ></div>
                </button>
            </div>

            <button
                id="data-carousel-prev"
                type="button"
                className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/50 dark:group-focus:ring-gray-800">
                    <svg
                        className="h-4 w-4 text-white dark:text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m5 1-4 4 4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                id="data-carousel-next"
                type="button"
                className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/50 dark:group-focus:ring-gray-800">
                    <svg
                        className="h-4 w-4 text-white dark:text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default CarouselComponent;
