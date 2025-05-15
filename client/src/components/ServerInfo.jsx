import React from 'react';

export default function ServerInfo({ data }) {
  const uptime = data.nowMsec - data.loadMsec;
  const uptimeSeconds = Math.floor(uptime / 1000);

  return (
    <div className="card shadow-sm border-0 mb-4 rounded-3 bg-light-subtle">
      <div className="card-header bg-primary text-white fw-semibold rounded-top">
        Thông Tin Máy Chủ
      </div>
      <div className="card-body">
        <table className="table table-sm align-middle text-center">
          <thead className="table-light text-secondary small">
            <tr>
              <th scope="col">Host</th>
              <th scope="col">Phiên bản</th>
              <th scope="col">Uptime</th>
              <th scope="col">Kết nối Active</th>
            </tr>
          </thead>
          <tbody>
            <tr className="fw-medium">
              <td>{data.hostName}</td>
              <td>{data.nginxVersion}</td>
              <td>{uptimeSeconds}s</td>
              <td>{data.connections.active}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}