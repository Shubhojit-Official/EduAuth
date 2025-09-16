import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react"
import { ChartColumnStacked, FileUp, FileQuestionMark } from "lucide-react"

const Dashboard = lazy(() => import("./Dashboard"))
const Upload = lazy(() => import("./Upload"))
const Appeal = lazy(() => import("./Appeal"))

// Loading component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-[60vh] gap-4 text-gray-500 flex-col">
        <div className="w-12 h-12 border-4 border-gray-200 border-l-blue-500 rounded-full animate-spin" />
        <p className="font-medium">Loading...</p>
    </div>
)

const Sidebar = () => {
    const componentRegistry = useMemo(
        () => ({
            dashboard: { component: Dashboard, label: "Dashboard", icon: <ChartColumnStacked /> },
            upload: { component: Upload, label: "Upload Documents", icon: <FileUp /> },
            appeal: { component: Appeal, label: "Appeals", icon: <FileQuestionMark /> },
        }),
        []
    )

    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window !== "undefined") {
            const savedState = localStorage.getItem("sidebar-open")
            return savedState !== null ? JSON.parse(savedState) : window.innerWidth > 768
        }
        return true
    })

    const [activeComponent, setActiveComponent] = useState(() => {
        if (typeof window !== "undefined") {
            const path = window.location.pathname.slice(1) || "dashboard"
            const validComponent = componentRegistry[path] ? path : "dashboard"
            const savedComponent = localStorage.getItem("active-component") || validComponent
            return componentRegistry[savedComponent] ? savedComponent : "dashboard"
        }
        return "dashboard"
    })

    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth <= 768 : false
    )

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("sidebar-open", JSON.stringify(isOpen))
        }
    }, [isOpen])

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("active-component", activeComponent)
            const newPath = `/${activeComponent}`
            if (window.location.pathname !== newPath) {
                window.history.pushState({}, "", newPath)
            }
        }
    }, [activeComponent])

    useEffect(() => {
        let timeoutId = null

        const handleResize = () => {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                const mobile = window.innerWidth <= 768
                setIsMobile(mobile)
                if (mobile && isOpen) {
                    const userHasInteracted = localStorage.getItem("sidebar-user-interaction")
                    if (!userHasInteracted) {
                        setIsOpen(false)
                    }
                }
            }, 150)
        }

        const handlePopState = () => {
            const path = window.location.pathname.slice(1) || "dashboard"
            const validComponent = componentRegistry[path] ? path : "dashboard"
            setActiveComponent(validComponent)
        }

        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize)
            window.addEventListener("popstate", handlePopState)
            handleResize()

            return () => {
                window.removeEventListener("resize", handleResize)
                window.removeEventListener("popstate", handlePopState)
                if (timeoutId) clearTimeout(timeoutId)
            }
        }
    }, [isOpen, componentRegistry])

    const toggleSidebar = useCallback(() => {
        setIsOpen((prev) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("sidebar-user-interaction", "true")
            }
            return !prev
        })
    }, [])

    const handleNavClick = useCallback(
        (componentId) => {
            setActiveComponent(componentId)
            if (isMobile) setIsOpen(false)
        },
        [isMobile]
    )

    const handleOverlayClick = useCallback(() => {
        setIsOpen(false)
        if (typeof window !== "undefined") {
            localStorage.setItem("sidebar-user-interaction", "true")
        }
    }, [])

    const renderActiveComponent = () => {
        const componentConfig = componentRegistry[activeComponent]
        if (!componentConfig) {
            return (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center text-blue-950">
                    <h2 className="text-red-500 mb-2 text-xl font-semibold">Component not found</h2>
                    <p>The requested component could not be loaded.</p>
                </div>
            )
        }
        const Component = componentConfig.component
        return <Component sidebarOpen={isOpen} isMobile={isMobile} />
    }

    return (
        <div className="flex min-h-screen bg-white">
            {/* Overlay for mobile */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
                    onClick={handleOverlayClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Escape" && handleOverlayClick()}
                />
            )}

            {/* Hamburger */}
            <button
                className={`fixed top-4 left-4 z-[1001] bg-blue-900 w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded shadow-md transition-all ${isOpen ? "active" : ""
                    }`}
                onClick={toggleSidebar}
                type="button"
            >
                <span
                    className={`block w-5 h-0.5 bg-white rounded transition-all ${isOpen ? "translate-y-[6px] rotate-45" : ""
                        }`}
                />
                <span
                    className={`block w-5 h-0.5 bg-white rounded transition-all ${isOpen ? "opacity-0 scale-x-0" : ""
                        }`}
                />
                <span
                    className={`block w-5 h-0.5 bg-white rounded transition-all ${isOpen ? "-translate-y-[6px] -rotate-45" : ""
                        }`}
                />
            </button>

            {/* Sidebar */}
            <nav
                className={`fixed top-0 left-0 h-screen bg-blue-900 text-white shadow-md overflow-x-hidden transition-all z-[1000] ${isMobile
                    ? isOpen
                        ? "translate-x-0 w-64"
                        : "-translate-x-full w-64"
                    : isOpen
                        ? "w-64"
                        : "w-[70px]"
                    }`}
            >
                <div className="px-4 py-6 border-b border-white/10 text-center">
                    <h2 className="text-xl font-bold">{isOpen ? "Company" : "C"}</h2>
                </div>

                <ul className="py-4">
                    {Object.entries(componentRegistry).map(([id, config]) => (
                        <li key={id} className="my-1">
                            <button
                                className={`flex items-center w-full gap-4 px-4 py-3 text-base transition-colors rounded-md ${activeComponent === id
                                    ? "bg-white text-blue-900 font-semibold shadow"
                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                                    }`}
                                onClick={() => handleNavClick(id)}
                            >
                                <span className="text-lg">{config.icon}</span>
                                {isOpen && <span className="whitespace-nowrap">{config.label}</span>}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Main content */}
            <main
                className={`flex-1 pt-12 transition-all ${isMobile ? "ml-0 pt-16" : isOpen ? "ml-64" : "ml-[70px]"
                    }`}
            >
                <Suspense fallback={<LoadingSpinner />}>{renderActiveComponent()}</Suspense>
            </main>
        </div>
    )
}

export default Sidebar
