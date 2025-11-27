import React from "react";
import TypingText from "./TypingText";

const Home = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <TypingText className="md:text-[180px] text-[112px] text-redy font-semibold" text={"English"} speed={0.35} delay={2} />
        </div>
    );
};

export default Home;
