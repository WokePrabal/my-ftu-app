// pages/program-of-study.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Sidebar from '../../../components/Sidebar';

const OPTIONS = {
  "Bachelor's": [
    'Bachelor of Science in Computer Science (BSCS)',
    'Bachelor of Science in Business Administration (BSBA)'
  ],
  "Master's": [
    'Master of Science in Computer Science (MSCS)',
    'Master of Business Administration (MBA)'
  ],
  "PhD": [
    'Doctorate in Computer Science',
    'Doctorate in Business Administration'
  ]
}

export default function ProgramOfStudy() {
  const router = useRouter();
  const { appId } = router.query;
  const [stream, setStream] = useState(null);
  const [degree, setDegree] = useState('');
  const [app, setApp] = useState(null);

  useEffect(()=>{
    if (!appId) return;
    axios.get(`/api/applications/${appId}`).then(r => {
      setApp(r.data);
      setStream(r.data.stream);
    });
  },[appId]);

  const saveAndContinue = async () => {
    await axios.put(`/api/applications/${appId}`, {
      degree,
      stepsCompleted: { programOfStudy: true }
    });
    router.push(`/upload-documents?appId=${appId}`);
  }

  return (
    <div className="flex">
      <Sidebar userId={app?.userId}/>
      <main className="p-8 flex-1">
        <h1 className="text-2xl mb-4">Program of Study</h1>
        <div>
          <label>Degree to Apply</label>
          <select value={degree} onChange={e=>setDegree(e.target.value)} className="block mt-2 p-2 border">
            <option value="">Select</option>
            {(OPTIONS[stream] || []).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <div className="mt-4">
            <button className="px-4 py-2 border" onClick={saveAndContinue} disabled={!degree}>Save & Continue</button>
          </div>
        </div>
      </main>
    </div>
  );
}
