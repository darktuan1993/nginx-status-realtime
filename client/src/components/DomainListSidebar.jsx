// File: src/components/DomainListSidebar.jsx
import React, { useState } from 'react';
import { BsGlobe } from 'react-icons/bs';

export default function DomainListSidebar({ serverZones }) {
  const [search, setSearch] = useState('');

  const filtered = Object.keys(serverZones || {}).filter((domain) =>
    domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="card shadow-sm border-0 h-100 rounded-3 bg-light-subtle">
        <div className="card-header bg-primary text-white fw-semibold rounded-top">
          <BsGlobe className="me-2" /> Danh sách Tên Miền
        </div>
        <div className="card-body overflow-auto px-3 py-2" style={{ maxHeight: '800px' }}>
          <input
            type="text"
            className="form-control form-control-sm mb-3"
            placeholder="Tìm kiếm tên miền..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filtered.length > 0 ? (
            <ul className="list-group list-group-flush">
              {filtered.map((domain, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex align-items-center px-3 py-2 border-0 border-bottom"
                >
                  <BsGlobe className="me-2 text-primary" />
                  <span className="text-dark small fw-medium flex-grow-1">{domain}</span>
                  <span className="badge bg-success rounded-pill">Online</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted small">Không có tên miền nào</p>
          )}
        </div>
      </div>
  );
}
