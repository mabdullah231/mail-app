import React, { useEffect, useState } from 'react';

// Dev-only API Debug Panel
const ApiDebugPanel = () => {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const interval = setInterval(() => {
      try {
        const buffer = Array.isArray(window.__API_LOGS__) ? window.__API_LOGS__ : [];
        setLogs(buffer.slice(0, 20));
      } catch (_) {}
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!import.meta.env.DEV) return null;

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1050 }}>
      {!open && (
        <button
          className="btn btn-sm btn-dark shadow"
          onClick={() => setOpen(true)}
          title="Open API Debug"
        >
          API
        </button>
      )}

      {open && (
        <div className="card shadow" style={{ width: 360, maxHeight: 420 }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <span className="fw-bold">API Debug</span>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-secondary">{logs.length}</span>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
          <div className="card-body p-2 overflow-auto" style={{ maxHeight: 340 }}>
            {logs.length === 0 ? (
              <div className="text-muted small">No API activity yet.</div>
            ) : (
              <ul className="list-unstyled mb-0">
                {logs.map((log, idx) => (
                  <li key={idx} className="border-bottom py-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary me-2">{log.method}</span>
                      <span className={`badge ${log.status >= 200 && log.status < 300 ? 'bg-success' : 'bg-danger'}`}>{log.status}</span>
                      <span className="text-muted small">{log.duration} ms</span>
                    </div>
                    <div className="small text-truncate" title={log.url}>{log.url}</div>
                    {log.error && (
                      <div className="small text-danger mt-1 text-truncate" title={typeof log.error === 'string' ? log.error : JSON.stringify(log.error)}>
                        {typeof log.error === 'string' ? log.error : JSON.stringify(log.error)}
                      </div>
                    )}
                    <div className="small text-muted">{new Date(log.time).toLocaleTimeString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                try {
                  window.__API_LOGS__ = [];
                  setLogs([]);
                } catch (_) {}
              }}
            >
              Clear
            </button>
            <a className="btn btn-sm btn-outline-dark" href="/panel" target="_self">Open Panel</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiDebugPanel;