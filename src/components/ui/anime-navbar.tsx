"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
    children?: NavItem[]
}

interface NavBarProps {
    items: NavItem[]
    className?: string
    defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
    const location = useLocation()
    const [mounted, setMounted] = useState(false)
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<string>(defaultActive)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const currentItem = items.find(item => item.url === location.pathname)
        if (currentItem) {
            setActiveTab(currentItem.name)
        }
    }, [location.pathname, items])

    if (!mounted) return null

    return (
        <div className="fixed top-4 left-0 right-0 z-[9999] px-4 pointer-events-none">
            <div className="flex justify-center pt-10 sm:pt-14">
                <motion.div
                    className="flex items-center gap-1 sm:gap-3 bg-black/60 border border-white/10 backdrop-blur-xl py-2 px-2 rounded-full shadow-2xl relative pointer-events-auto"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    {items.map((item) => {
                        const Icon = item.icon
                        const isActive = activeTab === item.name || (item.children?.some(c => c.url === location.pathname))
                        const isHovered = hoveredTab === item.name
                        const hasChildren = item.children && item.children.length > 0

                        return (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => setHoveredTab(item.name)}
                                onMouseLeave={() => setHoveredTab(null)}
                            >
                                {hasChildren ? (
                                    <span
                                        className={cn(
                                            "relative cursor-pointer text-[10px] sm:text-xs font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 uppercase tracking-widest inline-block",
                                            "text-white/60 hover:text-white",
                                            isActive && "text-white"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    opacity: [0.3, 0.5, 0.3],
                                                    scale: [1, 1.03, 1]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-organic-cyan/25 rounded-full blur-md" />
                                                <div className="absolute inset-[-4px] bg-organic-cyan/20 rounded-full blur-xl" />
                                            </motion.div>
                                        )}
                                        <motion.span
                                            className="hidden md:inline relative z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                        <motion.span
                                            className="md:hidden relative z-10 flex items-center justify-center w-5 h-5"
                                        >
                                            <Icon size={16} strokeWidth={2.5} />
                                        </motion.span>

                                        <AnimatePresence>
                                            {isHovered && !isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="absolute inset-0 bg-white/5 rounded-full -z-10"
                                                />
                                            )}
                                        </AnimatePresence>
                                    </span>
                                ) : (
                                    <Link
                                        to={item.url}
                                        onClick={() => setActiveTab(item.name)}
                                        className={cn(
                                            "relative cursor-pointer text-[10px] sm:text-xs font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 uppercase tracking-widest",
                                            "text-white/60 hover:text-white",
                                            isActive && "text-white"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    opacity: [0.3, 0.5, 0.3],
                                                    scale: [1, 1.03, 1]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-organic-cyan/25 rounded-full blur-md" />
                                                <div className="absolute inset-[-4px] bg-organic-cyan/20 rounded-full blur-xl" />
                                                <div className="absolute inset-[-8px] bg-organic-cyan/15 rounded-full blur-2xl" />
                                                <div className="absolute inset-[-12px] bg-organic-cyan/5 rounded-full blur-3xl" />

                                                <div
                                                    className="absolute inset-0 bg-gradient-to-r from-organic-cyan/0 via-organic-cyan/20 to-organic-cyan/0 animate-pulse-slow"
                                                />
                                            </motion.div>
                                        )}

                                        <motion.span
                                            className="hidden md:inline relative z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                        <motion.span
                                            className="md:hidden relative z-10 flex items-center justify-center w-5 h-5"
                                        >
                                            <Icon size={16} strokeWidth={2.5} />
                                        </motion.span>

                                        <AnimatePresence>
                                            {isHovered && !isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="absolute inset-0 bg-white/5 rounded-full -z-10"
                                                />
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                )}

                                {/* Dropdown for children */}
                                <AnimatePresence>
                                    {hasChildren && isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 py-2 px-1 bg-black/80 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl min-w-[180px] z-50"
                                        >
                                            {item.children!.map((child) => {
                                                const ChildIcon = child.icon
                                                const isChildActive = location.pathname === child.url
                                                return (
                                                    <Link
                                                        key={child.name}
                                                        to={child.url}
                                                        onClick={() => { setActiveTab(item.name); setHoveredTab(null) }}
                                                        className={cn(
                                                            "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                                                            isChildActive
                                                                ? "text-organic-cyan bg-organic-cyan/10"
                                                                : "text-white/60 hover:text-white hover:bg-white/5"
                                                        )}
                                                    >
                                                        <ChildIcon size={14} />
                                                        {child.name}
                                                    </Link>
                                                )
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    )
}
