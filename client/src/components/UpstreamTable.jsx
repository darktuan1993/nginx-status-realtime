// File: src/components/UpstreamTable.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

export default function UpstreamTable({ zones }) {
  const charts = Object.entries(zones).map(([group, peers]) => {
    const labels = peers.map((p) => p.server);

    const datasets = [
      {
        label: '2xx',
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        barThickness: 10,
        data: peers.map((p) => p.responses['2xx'] || 0),
      },
      {
        label: '3xx',
        backgroundColor: '#10B981',
        borderRadius: 8,
        barThickness: 10,
        data: peers.map((p) => p.responses['3xx'] || 0),
      },
      {
        label: '4xx',
        backgroundColor: '#FBBF24',
        borderRadius: 8,
        barThickness: 10,
        data: peers.map((p) => p.responses['4xx'] || 0),
      },
      {
        label: '5xx',
        backgroundColor: '#EF4444',
        borderRadius: 8,
        barThickness: 10,
        data: peers.map((p) => p.responses['5xx'] || 0),
      },
    ];

    const onlineServers = peers.filter((p) => !p.down).length;
    const offlineServers = peers.filter((p) => p.down).length;

    return (
      <div key={group} className="mb-4 px-3 pt-3 pb-4 rounded-3 shadow-sm border bg-light-subtle">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-semibold text-uppercase text-primary small m-0">{group}</h6>
          <div className="small text-muted">
            <span className="me-2">🟢 {onlineServers} online</span>
            <span>🔴 {offlineServers} offline</span>
          </div>
        </div>
        <div style={{ height: '200px', maxWidth: '100%' }}>
          <Bar
            data={{ labels, datasets }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  mode: 'index',
                  intersect: false,
                  backgroundColor: '#ffffff',
                  titleColor: '#1f2937',
                  bodyColor: '#374151',
                  borderColor: '#d1d5db',
                  borderWidth: 1,
                  titleFont: { size: 12, family: 'Inter' },
                  bodyFont: { size: 11, family: 'Inter' },
                  padding: 10,
                },
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    boxWidth: 10,
                    font: { size: 10 },
                    color: '#4B5563',
                    padding: 12,
                  },
                },
              },
              scales: {
                x: {
                  stacked: false,
                  ticks: {
                    color: '#6B7280',
                    font: { size: 10 },
                  },
                  grid: { display: false },
                },
                y: {
                  stacked: false,
                  beginAtZero: true,
                  grid: {
                    color: '#F3F4F6',
                    lineWidth: 1,
                  },
                  ticks: {
                    stepSize: 100,
                    font: { size: 10 },
                    color: '#9CA3AF',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="card shadow border-0">
      <div className="card-header bg-primary text-white fw-semibold">
        <h5 className="mb-0">Upstream Zones Overview</h5>
      </div>
      <div className="card-body">
        {charts.length > 0 ? charts : <p className="text-muted">No upstream data available.</p>}
      </div>
    </div>
  );
}
