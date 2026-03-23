"use client";

import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';

type IProps = {
    data: {
        month: string;
        Orders: number;
    }[];
};

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-grey-100 rounded-xl shadow-lg px-4 py-3">
                <p className="font-inter text-xs font-semibold text-grey-500 mb-1">{label}</p>
                <p className="font-inter text-lg font-bold text-grey-900">
                    {payload[0].value?.toLocaleString()}
                    <span className="text-xs font-normal text-grey-400 ml-1">orders</span>
                </p>
            </div>
        );
    }
    return null;
}

export default function Barchart({ data }: IProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 8, right: 24, left: -10, bottom: 4 }}
                barSize={28}
                barCategoryGap="30%"
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" vertical={false} />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#98a2b3', fontWeight: 500 }}
                    padding={{ left: 8, right: 8 }}
                />
                <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontFamily: 'var(--font-inter)', fontSize: 11, fill: '#98a2b3', fontWeight: 500 }}
                    width={36}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#FDF0E7', radius: 6 }} />
                <Bar dataKey="Orders" fill="#ED7020" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

