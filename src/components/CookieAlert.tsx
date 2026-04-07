import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { LuCookie } from "react-icons/lu";

const CookieAlert: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasAccepted = localStorage.getItem('cookies-accepted');
        if (!hasAccepted) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleDecision = (accepted: boolean) => {
        localStorage.setItem('cookies-accepted', accepted ? 'true' : 'false');
        setIsVisible(false);
        // Esperamos a que la animación termine para restaurar el scroll
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 700);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Fondo con Blur persistente - Desvanecimiento Suave */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[90] bg-slate-950/60 backdrop-blur-md"
                    />

                    {/* Underbar de Cookies - Deslizamiento Suave */}
                    <motion.div 
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 200, opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="fixed bottom-0 left-0 w-full z-[100]"
                    >
                        <div className="bg-bar border-t border-white/10 shadow-2xl py-5 px-6 md:px-12">
                            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                                
                                <div className="flex items-center gap-4 text-center lg:text-left flex-col md:flex-row">
                                    <motion.div
                                        animate={{
                                            y: [-2, 2],
                                            rotate: [-5, 5]
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            repeatType: "mirror",
                                            duration: 1.2,
                                            ease: "easeInOut"
                                        }}
                                        className="shrink-0"
                                    >
                                        <LuCookie className="w-8 h-8 md:w-10 md:h-10 text-comprar" strokeWidth={1.5} style={{ fill: '#E1D7D1' }} />
                                    </motion.div>
                                    <div>
                                        <p className="text-asap-text text-sm md:text-base font-['Asap'] leading-snug max-w-2xl font-light">
                                            <span className="font-bold">Privacidad en WasiBonsai:</span> Utilizamos cookies para asegurar que recibas la mejor experiencia natural en tu hogar.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full lg:w-auto">
                                    <button
                                        onClick={() => handleDecision(false)}
                                        className="flex-1 lg:flex-none text-asap-text/60 hover:text-white text-xs md:text-sm font-['Asap'] transition-colors cursor-pointer py-2 md:py-0"
                                    >
                                        Rechazar
                                    </button>
                                    <button
                                        onClick={() => handleDecision(true)}
                                        className="flex-1 lg:flex-none bg-comprar text-white px-6 md:px-8 py-2.5 rounded-full font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer font-['Asap'] tracking-tight whitespace-nowrap"
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CookieAlert;
