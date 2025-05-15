import React, { useEffect, useState } from 'react';
import ServerInfo from './components/ServerInfo';
import UpstreamTable from './components/UpstreamTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsGlobe } from 'react-icons/bs';
import DomainListSidebar from './components/DomainListSidebar';


export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      try {
        setData(JSON.parse(event.data));
      } catch (err) {
        console.error('JSON parse error', err);
      }
    };
    return () => socket.close();
  }, []);

  return (
    <div className="container-fluid py-4 px-3 bg-light min-vh-100">
      <h2 className="fw-bold mb-4 text-primary text-center">NGINX STATUS DASHBOARD</h2>

      {data && <ServerInfo data={data} />}

      <div className="row mt-4">
        {/* Sidebar: Danh sách domain */}
        <div className="col-lg-7 col-md-5 mb-4">
          <DomainListSidebar serverZones={data?.serverZones} />

        </div>

        {/* Main: Biểu đồ */}
        <div className="col-lg-5 col-md-7">
          {data?.upstreamZones && <UpstreamTable zones={data.upstreamZones} />}
        </div>
      </div>
    </div>
  );
}
