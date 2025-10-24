import React, { useEffect, useState } from 'react';
import { fetchItineraries, createItinerary, updateItinerary, deleteItinerary } from './api';
import ItineraryList from './components/ItineraryList';
import ItineraryForm from './components/ItineraryForm';
import ItineraryView from './components/ItineraryView';

export default function App() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load(q) {
    setLoading(true);
    const items = await fetchItineraries(q);
    setList(items);
    setLoading(false);
  }

  useEffect(()=> { load(); }, []);

  async function handleCreate(data) {
    const created = await createItinerary(data);
    setList(prev => [created, ...prev]);
  }

  async function handleUpdate(id, data) {
    const updated = await updateItinerary(id, data);
    setList(prev => prev.map(p => p._id === id ? updated : p));
    setEditing(null);
    setSelected(updated);
  }

  async function handleDelete(id) {
    await deleteItinerary(id);
    setList(prev => prev.filter(p => p._id !== id));
    setSelected(null);
  }

  function onSearch(e) {
    const q = e.target.value;
    setQuery(q);
    load(q);
  }

  return (
    <div className="app">
      <header>
        <h1>Travel Itinerary Planner</h1>
      </header>

      <main>
        <section className="left">
          <div className="controls">
            <input placeholder="Search by title, destination or tag..." value={query} onChange={onSearch} />
          </div>

          <ItineraryForm onCreate={handleCreate} />

          <h3>Saved Itineraries {loading ? '(loading...)' : `(${list.length})`}</h3>
          <ItineraryList
            items={list}
            onSelect={setSelected}
            onEdit={(it) => setEditing(it)}
            onDelete={handleDelete}
          />
        </section>

        <section className="right">
          {editing ? (
            <div>
              <h3>Editing</h3>
              <ItineraryForm initial={editing} onCreate={(d)=>handleUpdate(editing._id, d)} />
              <button onClick={()=>setEditing(null)}>Cancel</button>
            </div>
          ) : selected ? (
            <ItineraryView itinerary={selected} onEdit={()=>setEditing(selected)} onDelete={()=>handleDelete(selected._id)} />
          ) : (
            <div className="placeholder">Select an itinerary to view details</div>
          )}
        </section>
      </main>

      <footer>
        <small>Built with ❤️ — demo</small>
      </footer>
    </div>
  );
}
