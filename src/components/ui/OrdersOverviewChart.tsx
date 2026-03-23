"use client";

import React, { useState } from 'react';
import Barchart from './Barchart';

type OrderData = {
    month: string;
    Orders: number;
};

type IProps = {
    initialData: OrderData[];
    initialYear: number;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getAvailableYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let y = 2025; y <= currentYear; y++) {
        years.push(y);
    }
    return years;
}

const selectClass =
    'font-inter text-xs text-grey-600 bg-grey-75 border border-grey-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 cursor-pointer transition-colors hover:border-grey-400';

export default function OrdersOverviewChart({ initialData, initialYear }: IProps) {
    const [data, setData] = useState<OrderData[]>(initialData);
    const [year, setYear] = useState<number>(initialYear);
    const [monthFilter, setMonthFilter] = useState<string>('All');
    const [loading, setLoading] = useState(false);

    const availableYears = getAvailableYears();

    const handleYearChange = async (newYear: number) => {
        setYear(newYear);
        setMonthFilter('All');
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/order-overview?year=${newYear}`, {
                credentials: 'include',
            });
            const json = await res.json();
            if (json.status === 200) {
                setData(json.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredData = monthFilter === 'All'
        ? data
        : data.filter((d) => d.month === monthFilter);

    const totalForPeriod = filteredData.reduce((sum, d) => sum + d.Orders, 0);

    return (
        <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-grey-100 shrink-0">
                <div>
                    <h2 className="font-inter font-semibold text-sm text-grey-900">Orders Overview</h2>
                    <p className="font-inter text-xs text-grey-400 mt-0.5">
                        {totalForPeriod.toLocaleString()} orders &bull; {monthFilter === 'All' ? year : `${monthFilter} ${year}`}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={monthFilter}
                        onChange={(e) => setMonthFilter(e.target.value)}
                        className={selectClass}
                    >
                        <option value="All">All Months</option>
                        {MONTHS.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                    <select
                        value={year}
                        onChange={(e) => handleYearChange(Number(e.target.value))}
                        className={selectClass}
                    >
                        {availableYears.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Chart */}
            <div className="flex-1 min-h-0 py-2">
                {loading ? (
                    <div className="flex h-full items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    </div>
                ) : (
                    <Barchart data={filteredData} />
                )}
            </div>
        </div>
    );
}
