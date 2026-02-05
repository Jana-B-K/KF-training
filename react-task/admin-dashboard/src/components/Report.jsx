import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"; 
import reportData from "../middleware/reportData";
import "./Report.css"
import Layout from "./Layout";

export default function Reports() {
    const { state } = useContext(AuthContext);
    
    // State for filter values
    const [month, setMonth] = useState("all");
    const [status, setStatus] = useState("all");

    const handleExport = (e) => {
            const type = e.target.value;
            if (!type) return; // Do nothing if "Export ↓" is clicked

            console.log(`Exporting as ${type}...`);

            if (type === "excel") {
                // Logic for Excel (CSV is the easiest way to do this manually)
                alert("Excel Export triggered")
            } else if (type === "pdf") {
                // Logic for PDF (Usually requires a library like jsPDF)
                alert("PDF Export triggered");
            }

            // Reset the dropdown back to the "Export ↓" label
            e.target.value = "";
        };

    // Filtering logic: 
    const filteredData = reportData.filter((item) => {
        const matchesMonth = month === "all" || item.month.toLowerCase() === month;
        const matchesStatus = status === "all" || item.status === status;
        return matchesMonth && matchesStatus;
    });

    // Summary counts based on the CURRENT filtered data
    const totalReports = filteredData.length;
    const completedCount = filteredData.filter(r => r.status === "Completed").length;

    const columns = reportData.length > 0 ? Object.keys(reportData[0]) : [];

    return (
        <Layout>
            <div className="report-container">
                <h1>Reports Dashboard</h1>

                {/* Summary Badges */}
                <div className="summary-cards">
                    <div className="card">Total: {totalReports}</div>
                    <div className="card completed">Completed: {completedCount}</div>
                </div>

                <div className="report-dropdown">
                    {/* Month Filter */}
                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="all">All Months</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">Sebtember</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                    </select>
                    
                    {/* Status Filter */}
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="all">All Statuses</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                        <option value="In Progress">In progress</option>
                        <option value="Pending">Pending</option>
                    </select>

                    <select className="export-btn" onChange={handleExport} value="">
                        <option value="" disabled>Export ↓</option>
                        <option value="pdf">Pdf</option>
                        <option value="excel">Excel</option>
                    </select>
                </div>

                <div className="report-table">
                    <table>
                        <thead>
                            <tr>
                                {columns.map((col) => <th key={col}>{col.toUpperCase()}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row) => (
                                <tr key={row.id}>
                                    {columns.map((col) => (
                                        <td key={col}>
                                            {/* Status Badge Rendering */}
                                            {col === 'status' ? (
                                                <span className={`badge ${row[col].toLowerCase().replace(" ", "-")}`}>
                                                    {row[col]}
                                                </span>
                                            ) : row[col]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
         </Layout>
        );
   
}