'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface HubMarker {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
}

interface LeafletMapProps {
  hubs: HubMarker[];
  selectedHubId: string;
  onSelectHub: (id: string) => void;
}

/* Custom blue marker SVG */
function createMarkerIcon(isSelected: boolean): L.DivIcon {
  const size = isSelected ? 28 : 22;
  const color = isSelected ? '#0066FF' : '#3B82F6';
  const borderColor = isSelected ? '#FFFFFF' : '#BFDBFE';
  const shadow = isSelected ? 'filter: drop-shadow(0 0 8px rgba(0,102,255,0.5));' : '';
  const pulse = isSelected
    ? `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:${size + 16}px;height:${size + 16}px;border-radius:50%;background:rgba(0,102,255,0.2);animation:marker-pulse 2s ease-in-out infinite;"></div>`
    : '';

  return L.divIcon({
    className: '',
    iconSize: [size + 16, size + 16],
    iconAnchor: [(size + 16) / 2, (size + 16) / 2],
    html: `
      <div style="position:relative;width:${size + 16}px;height:${size + 16}px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
        ${pulse}
        <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2.5px solid ${borderColor};display:flex;align-items:center;justify-content:center;${shadow}position:relative;z-index:2;">
          <svg width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      </div>
    `,
  });
}

export default function LeafletMap({ hubs, selectedHubId, onSelectHub }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  /* ---- Initialize map ---- */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Inject pulse animation CSS
    if (!document.getElementById('leaflet-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'leaflet-pulse-style';
      style.textContent = `
        @keyframes marker-pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%,-50%) scale(1.5); opacity: 0; }
        }
        .leaflet-container { font-family: inherit; }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 4px 20px -4px rgba(0,0,0,0.15) !important;
          border: 1px solid #E2E8F0 !important;
          padding: 0 !important;
        }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-popup-tip { display: none !important; }
      `;
      document.head.appendChild(style);
    }

    const map = L.map(containerRef.current, {
      center: [1.0, 32.3],
      zoom: 7,
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for each hub
    hubs.forEach((hub) => {
      const isSelected = hub.id === selectedHubId;
      const marker = L.marker([hub.lat, hub.lng], {
        icon: createMarkerIcon(isSelected),
        title: hub.name,
      }).addTo(map);

      marker.bindPopup(
        `<div style="padding:12px 14px;min-width:180px;">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#0066FF;margin-bottom:4px;">${hub.category}</div>
          <div style="font-size:14px;font-weight:800;color:#0F172A;line-height:1.3;">${hub.name}</div>
        </div>`,
        { closeButton: false, offset: [0, -8] }
      );

      marker.on('click', () => {
        onSelectHub(hub.id);
      });

      markersRef.current[hub.id] = marker;
    });

    mapRef.current = map;

    // Fit bounds to all hubs with padding
    const group = L.featureGroup(Object.values(markersRef.current));
    map.fitBounds(group.getBounds().pad(0.3));

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Update markers when selection changes ---- */
  useEffect(() => {
    if (!mapRef.current) return;

    hubs.forEach((hub) => {
      const marker = markersRef.current[hub.id];
      if (!marker) return;
      const isSelected = hub.id === selectedHubId;
      marker.setIcon(createMarkerIcon(isSelected));
    });

    // Pan to selected hub
    const selectedHub = hubs.find((h) => h.id === selectedHubId);
    if (selectedHub && mapRef.current) {
      mapRef.current.flyTo([selectedHub.lat, selectedHub.lng], 9, { duration: 1.2 });
    }
  }, [selectedHubId, hubs]);

  return <div ref={containerRef} className="w-full h-full" />;
}
