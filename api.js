const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export async function fetchItineraries(q) {
  const url = new URL(`${API_BASE}/itineraries`);
  if (q) url.searchParams.append('q', q);
  const r = await fetch(url.toString());
  return r.json();
}

export async function createItinerary(data) {
  const r = await fetch(`${API_BASE}/itineraries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return r.json();
}

export async function getItinerary(id) {
  const r = await fetch(`${API_BASE}/itineraries/${id}`);
  return r.json();
}

export async function updateItinerary(id, data) {
  const r = await fetch(`${API_BASE}/itineraries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return r.json();
}

export async function deleteItinerary(id) {
  const r = await fetch(`${API_BASE}/itineraries/${id}`, { method: 'DELETE' });
  return r.json();
}
