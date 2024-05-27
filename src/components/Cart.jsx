import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

function Cart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const categories = [];
    for (let i = 5; i <= 60; i += 5) {
      categories.push(i + "k");
    }
    const data = [];
    for (let i = 0; i < 12; i++) {
      // Sesuaikan jumlah data dengan jumlah kategori pada sumbu x
      data.push(Math.floor(Math.random() * 100)); // Data acak antara 0 dan 100
    }
    const options = {
      chart: {
        type: "area",
        height: 350, // Ubah tinggi chart sesuai kebutuhan Anda
      },
      series: [
        {
          name: "User",
          data: [30, 40, 15, 50, 19, 60, 70, 21, 100],
        },
      ],
      xaxis: {
        categories: categories,
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          formatter: function (value) {
            return value + "%";
          },
        },
      },
    };
    const chart = new ApexCharts(chartRef.current, options);

    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl">
      {/* <p className="px-5 pt-5 text-2xl font-bold font-Inter">Lihat Detail</p> */}
      {/* Elemen div untuk menampilkan chart */}
      <div ref={chartRef}></div>
    </div>
  );
}

export default Cart;
