import React, { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const [month, setMonth] = useState("11");
  const [year, setYear] = useState("2025");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRevenue = async (m, y) => {
    setLoading(true);
    try {
      const res = await adminApi.getRevenue(m, y);
      console.log(res);
      setData(res.data); // nhớ API trả về {month, year, data: [...]}
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue(month, year);
  }, [month, year]);

  // Chuẩn bị dữ liệu cho Chart.js
  const chartData = {
    labels: data.map((d) => dayjs(d.day).format("DD-MM-YYYY")),
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: data.map((d) => parseFloat(d.revenue).toFixed(2)),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `Doanh thu tháng ${month}/${year}` },
    },
  };

  // Tạo options cho tháng và năm
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const years = Array.from({ length: 5 }, (_, i) => (2025 - i).toString()); // 2025, 2024,...

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h3 className="text-center mb-4">Thống kê doanh thu</h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map((m) => (
            <option key={m} value={m}>
              Tháng {m}
            </option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {years.map((y) => (
            <option key={y} value={y}>
              Năm {y}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default RevenueChart;
