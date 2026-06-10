import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { apiClient } from '@/apiClient';

export interface TenantInfo {
    id: number;
    name: string;
    code: string;
    subtitle?: string;
    emoji: string;
    delivery_cost?: number;
    min_order_for_free_delivery?: number;
}
const TARGET_TENANT_CODES = ['DEMO_RESTAURANT', 'DEMO_FLOWERS'];

const getEmojiForCode = (code: string) => {
    switch(code) {
        case 'DEMO_RESTAURANT': return '🍝';
        case 'DEMO_FLOWERS': return '💐';
        default: return '🏪';
    }
}

interface TenantContextProps {
    activeTenant: TenantInfo | null;
    availableTenants: TenantInfo[];
    changeTenant: (code: string) => void;
    isLoading: boolean;
}

const TenantContext = createContext<TenantContextProps | undefined>(undefined);

export const TenantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [availableTenants, setAvailableTenants] = useState<TenantInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [activeTenantCode, setActiveTenantCode] = useState<string | null>(() => {
        return localStorage.getItem("demoTenantCode") || import.meta.env.VITE_TENANT_CODE || null;
    });

    useEffect(() => {
        apiClient.tenants.demoList()
            .then(res => {
                const fetchedTenants = res.data
                    .filter(t => t.code && TARGET_TENANT_CODES.includes(t.code))
                    .map(t => ({
                        id: t.id!,
                        name: t.name!,
                        code: t.code!,
                        subtitle: "Демо-режим",
                        emoji: getEmojiForCode(t.code!),
                        delivery_cost: t.delivery_cost,
                        min_order_for_free_delivery: t.min_order_for_free_delivery
                    }));
                
                setAvailableTenants(fetchedTenants);

                // Авто-выбор первого доступного тенанта, если ещё не выбран
                if (!activeTenantCode && fetchedTenants.length > 0) {
                    const firstCode = fetchedTenants[0].code;
                    setActiveTenantCode(firstCode);
                    localStorage.setItem("demoTenantCode", firstCode);
                }

                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch tenants:", err);
                setIsLoading(false);
            });
    }, []);

    const activeTenant = useMemo(() => {
        if (!availableTenants.length) return null;
        return availableTenants.find(t => t.code === activeTenantCode) || availableTenants[0];
    }, [activeTenantCode, availableTenants]);

    const changeTenant = (code: string) => {
        localStorage.setItem("demoTenantCode", code);
        setActiveTenantCode(code);
        // Релоад страницы чтобы сбросить стейты корзины и данных
        window.location.reload();
    };

    return (
        <TenantContext.Provider value={{ activeTenant, availableTenants, changeTenant, isLoading }}>
            {children}
        </TenantContext.Provider>
    );
};

export const useTenant = () => {
    const context = useContext(TenantContext);
    if (!context) {
        throw new Error("useTenant must be used within a TenantProvider");
    }
    return context;
};
