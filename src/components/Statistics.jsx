import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Statistics.css';
import CountUp from 'react-countup';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Statistics = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [soldItems, setSoldItems] = useState(0);
    const [notSoldItems, setNotSoldItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [month, setMonth] = useState('03');

    useEffect(() => {
        fetchStatistics(month);
    }, [month]);

    const fetchStatistics = async (month) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://roxiler-backend-6el1.onrender.com/api/statistics/${month}`);
            setTotalAmount(response.data.totalAmount);
            setSoldItems(response.data.soldItems);
            setNotSoldItems(response.data.notSoldItems);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='statistics-container'>
            <div className='title'><h1>Statistics</h1></div>
            <div className='statistics-content'>
                <div className='month-radio-buttons'>
                    <div className='select-month'><p>Select the Month</p></div>
                    <div className='month-line-1'>
                        <input type='radio' value="01" onChange={handleMonthChange} id='jan' checked={month === '01'} />
                        <label className='stats-tab' htmlFor='jan'>January</label>
                        <input type='radio' value="02" onChange={handleMonthChange} id='feb' checked={month === '02'} />
                        <label className='stats-tab' htmlFor='feb'>February</label>
                        <input type='radio' value="03" onChange={handleMonthChange} id='mar' checked={month === '03'} />
                        <label className='stats-tab' htmlFor='mar'>March</label>
                        <input type='radio' value="04" onChange={handleMonthChange} id='apr' checked={month === '04'} />
                        <label className='stats-tab' htmlFor='apr'>April</label>
                    </div>
                    <div className='month-line-2'>
                        <input type='radio' value="05" onChange={handleMonthChange} id='may' checked={month === '05'} />
                        <label className='stats-tab' htmlFor='may'>May</label>
                        <input type='radio' value="06" onChange={handleMonthChange} id='jun' checked={month === '06'} />
                        <label className='stats-tab' htmlFor='jun'>June</label>
                        <input type='radio' value="07" onChange={handleMonthChange} id='jul' checked={month === '07'} />
                        <label className='stats-tab' htmlFor='jul'>July</label>
                        <input type='radio' value="08" onChange={handleMonthChange} id='aug' checked={month === '08'} />
                        <label className='stats-tab' htmlFor='aug'>August</label>
                    </div>
                    <div className='month-line-3'>
                        <input type='radio' value="09" onChange={handleMonthChange} id='sep' checked={month === '09'} />
                        <label className='stats-tab' htmlFor='sep'>September</label>
                        <input type='radio' value="10" onChange={handleMonthChange} id='oct' checked={month === '10'} />
                        <label className='stats-tab' htmlFor='oct'>October</label>
                        <input type='radio' value="11" onChange={handleMonthChange} id='nov' checked={month === '11'} />
                        <label className='stats-tab' htmlFor='nov'>November</label>
                        <input type='radio' value="12" onChange={handleMonthChange} id='dec' checked={month === '12'} />
                        <label className='stats-tab' htmlFor='dec'>December</label>
                    </div>
                </div>
                <div className='statistics-data'>
                    {loading ? (
                        <div className='loader-container'>
                            <SkeletonTheme baseColor="#6969ff" highlightColor="#9696ff ">
                            <div className='skeleton-loader'>
                                <Skeleton width={220} height={20}/>
                                <Skeleton width={220} height={20} />
                                <Skeleton width={220} height={20} />
                            </div>
                            <div className='skeleton-loader'>
                                <Skeleton width={70} height={20} />
                                <Skeleton width={50} height={20} />
                                <Skeleton width={50} height={20} />
                            </div>
                            </SkeletonTheme>
                        </div>
                    ) : (
                        <>
                            <div className='stats-para'>
                                <p>Total Amount:</p>
                                <p>Sold Items:</p>
                                <p>Not Sold items:</p>
                            </div>
                            <div className='stats-value'>
                                <p><CountUp duration={0.5} end={totalAmount} /></p>
                                <p><CountUp duration={0.5} end={soldItems} /></p>
                                <p><CountUp duration={0.5} end={notSoldItems} /></p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Statistics;
