import React from "react";
import { motion } from "framer-motion";
import { cn } from "./cn";

export function LoginForm() {
  return (
    <LampContainer>
      <motion.form
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 px-6 rounded-md shadow-lg text-white"
      >
        <h2 className="text-4xl font-medium mb-6">Login</h2>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full bg-slate-700 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full bg-slate-700 rounded-md py-2 px-3"
          />
        </div>
        <button className="bg-slate-800 py-2 px-4 rounded-md hover:bg-slate-700 transition duration-300">
          Login
        </button>
      </motion.form>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        {/* LampContainer background */}
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
