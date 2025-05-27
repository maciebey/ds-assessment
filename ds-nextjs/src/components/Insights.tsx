import { Row } from '@/app/page';
import { useEffect, useState } from 'react';

interface InsightsProps {
    rowData: Row[];
}

// this maybe could have been done more sustinctly using the getDate method of the Date object
// but given that I'm just using a timezone fix currently this is more readable
const Days = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
}

const Insights = ({ rowData }: InsightsProps) => {
    const [max15, setMax15] = useState<number | null>(null);
    const [min15, setMin15] = useState<number | null>(null);
    const [maxDay, setMaxDay] = useState<number | null>(null);
    const [maxTimestamp, setMaxTimestamp] = useState<string | null>(null);

    
    const [selectedDays, setSelectedDays] = useState<number[]>([0,1,2,3,4,5,6]); // All days selected by default


    const generateInsights = () => {
        if (!rowData || rowData.length === 0) {
            setMax15(null);
            setMin15(null);
            return;
        }

        // Filter by selected days
        const filteredRows = rowData.filter(row => selectedDays.includes(Days[row.Day_of_week as keyof typeof Days]));
        if (filteredRows.length === 0) {
            setMax15(null);
            setMin15(null);
            return;
        }

        const usageData = filteredRows.map(row => row.Usage_kWh);
        const maxUsage = Math.max(...usageData);
        const minUsage = Math.min(...usageData);
        setMax15(maxUsage);
        setMin15(minUsage);

        let y = filteredRows[0].date.slice(0, 4);
        let m = filteredRows[0].date.slice(5, 7);
        let d = filteredRows[0].date.slice(8, 10);
        let dayTotal = 0;
        let max = -1;
        let maxDate = '';
        for (const row of filteredRows) {
            const ny = row.date.slice(0, 4);
            const nm = row.date.slice(5, 7);
            const nd = row.date.slice(8, 10);

            // if the date has changed, reset the day total
            if (y !== ny || m !== nm || d !== nd) {
                if (dayTotal > max) {
                    max = dayTotal;
                    maxDate = `${y}-${m}-${d}`;
                }
                y = ny;
                m = nm;
                d = nd;
                dayTotal = 0;
            }

            dayTotal += row.Usage_kWh;
        }
        setMaxDay(max);
        setMaxTimestamp(maxDate);
    };

    useEffect(() => {
        generateInsights();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowData, selectedDays]);

    // Checkbox change handler
    const handleCheckboxChange = (dayValue: number) => {
        setSelectedDays(prev =>
            prev.includes(dayValue)
                ? prev.filter(d => d !== dayValue)
                : [...prev, dayValue].sort((a, b) => a - b)
        );
    };

    // Weekend button handler
    const selectWeekend = () => setSelectedDays([0, 6]);
    // Weekday button handler
    const selectWeekdays = () => setSelectedDays([1, 2, 3, 4, 5]);
    // All days button handler
    const selectAllDays = () => setSelectedDays([0, 1, 2, 3, 4, 5, 6]);

    return (
        <div>
            {/* Filter Section */}
            <div className="mb-4 flex flex-col gap-2">
                <div className="flex gap-2 mt-2">
                    <button
                        type="button"
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                        onClick={selectWeekdays}
                    >
                        Weekdays
                    </button>
                    <button
                        type="button"
                        className="px-2 py-1 bg-purple-500 text-white rounded"
                        onClick={selectWeekend}
                    >
                        Weekends
                    </button>
                    <button
                        type="button"
                        className="px-2 py-1 bg-green-500 text-white rounded"
                        onClick={selectAllDays}
                    >
                        All Days
                    </button>
                </div>
                <div className="flex gap-4 flex-wrap">
                    {Object.entries(Days).map(([day, value]) => (
                        <label key={value} className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={selectedDays.includes(value)}
                                onChange={() => handleCheckboxChange(value)}
                            />
                            {day}
                        </label>
                    ))}
                </div>
                
            </div>
            {/* Insights Section */}
            <div className="space-y-4">
                {max15 !== null && (
                    <div className="text-green-600 dark:text-green-400">
                        Maximum Usage: {max15} kWh
                    </div>
                )}
                {min15 !== null && (
                    <div className="text-red-600 dark:text-red-400">
                        Minimum Usage: {min15} kWh
                    </div>
                )}
                {maxDay !== null && maxTimestamp !== null && (
                    <div className="text-blue-600 dark:text-blue-400">
                        Maximum Daily Usage: {maxDay.toFixed(2)} kWh on {maxTimestamp}
                    </div>
                )}
                {max15 === null && min15 === null && maxDay === null && (
                    <div className="text-gray-500">No data for selected days.</div>
                )}
            </div>
        </div>
    );
};

export default Insights;