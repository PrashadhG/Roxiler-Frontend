import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../Styles/Table.css'

const Table = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [month, setMonth] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTransactions(page, search, month);
    }, [page, search, month]);

    const fetchTransactions = async (page, search, month) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://roxiler-backend-6el1.onrender.com/api/transaction`, {
                params: {
                    page: page,
                    search: search,
                    month: month
                }
            });
            setTransactions(response.data.result);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
        setLoading(false);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        setPage(1);
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`pagination-button ${i === page ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className='table-container'>
            <div className='table-filter'>
                <Search size={26} color="#495b49" strokeWidth={1.5} className='search-icon' />
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                    className='search'
                />
                <select value={month} onChange={handleMonthChange} className='table-select'>
                    <option value="">-- Select Month --</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>
            <div className='table-data'>
                <table className='table'>
                    <thead className='outer-table-head'>
                        <tr>
                            <th>Image</th>
                            <th>Title & Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sold</th>
                        </tr>
                    </thead>
                    <tbody className='outer-table-body'>
                        {loading ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <tr key={index}>
                                    <td><Skeleton width={90} height={90}  borderRadius={10} style={{margin: '10px'}}/></td>
                                    <td>
                                        <table className='inner-table'>
                                            <tbody className='inner-table-body'>
                                                <tr>
                                                    <td className='table-title'><Skeleton width={200} /></td>
                                                </tr>
                                                <tr>
                                                    <td className='table-description'><Skeleton count={3} borderRadius={20} width={913}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td><Skeleton width={50} /></td>
                                    <td className='table-category'><Skeleton width={100} /></td>
                                    <td><Skeleton width={30} /></td>
                                </tr>
                            ))
                        ) : (
                            transactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <td><img
                                        src={transaction.image}
                                        alt={transaction.title}
                                        width={100}
                                        height={100}
                                    /></td>
                                    <td>
                                        <table className='inner-table'>
                                            <tbody className='inner-table-body'>
                                                <tr>
                                                    <td className='table-title'>{transaction.title}</td>
                                                </tr>
                                                <tr>
                                                    <td className='table-description'>{transaction.description}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>{transaction.price}</td>
                                    <td className='table-category'>{transaction.category}</td>
                                    <td>{transaction.sold ? "Yes" : "No"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className='pagination-button-container'>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className='previous-button'>
                    Previous
                </button>
                {renderPageButtons()}
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className='next-button'>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
