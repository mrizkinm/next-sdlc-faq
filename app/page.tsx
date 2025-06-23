'use client'

import React, { useEffect, useRef, useState } from "react";

interface Message {
  role: string;
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sops, setSops] = useState<string[]>([]);
  const [selectedSop, setSelectedSop] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    async function fetchSop() {
      const res = await fetch('/api/sops', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      setSops(data.files);
    }

    fetchSop();
  }, [])

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);
    // const newMessages: Message[] = [...messages, { role: 'user', content: question }]
    setMessages([...messages, { role: 'user', content: question }]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question, sop: selectedSop }),
    });

    if (!res.ok) {
      setLoading(false);
      const errorText = await res.text();
      alert(`Error: ${errorText}`);
      return;
    }

    const data = await res.json();
    setMessages([...messages, { role: 'user', content: question }, { role: 'bot', content: data.answer }])
    setQuestion("");
    setLoading(false);
  } 

  return (
   <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Tanya Jawab SDLC</h1>
      <select
        className="w-full border px-4 py-2 rounded-md"
        value={selectedSop}
        onChange={(e) => setSelectedSop(e.target.value)}
      >
        <option value="">Pilih SOP</option>
        {sops.map(s => <option key={s} value={s}>{s.split('.txt').join('')}</option>)}
      </select>
      <div className="space-y-2 mb-4 mt-4 h-[68vh] overflow-y-auto" style={{ scrollbarGutter: 'stable' }}>
        {
          messages.length === 0 && (
            <div className="text-gray-500 italic">Belum ada tanya jawab...</div>
          )
        }

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`
                whitespace-pre-wrap
                rounded-xl px-4 py-3 max-w-[75%]
                text-sm leading-relaxed
                ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}
              `}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl max-w-[75%]">Loading...</div>
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border px-4 py-2 rounded-md"
          placeholder="Tanyakan tentang SDLC..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ask()}
        />
        <button
          onClick={ask}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={!selectedSop || loading}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
