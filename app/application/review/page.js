// pages/review.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar';
import { useRouter } from 'next/router';

export default function Review() {
  const router = useRouter();
  const { appId } = router.query;
  const [app, setApp] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    if (!appId) return;
    axios.get(`/api/applications/${appId}`).then(r => {
      setApp(r.data);
      validate(r.data);
    });
  },[appId]);

  const validate = (data) => {
    const errs = {};
    if (!data.stream) errs.stream = true;
    if (!data.degree) errs.degree = true;
    if (!data.photo || !data.photo.url) errs.photo = true;
    if (!data.documents || data.documents.length === 0) errs.documents = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const submit = async () => {
    if (!validate(app)) return;
    // generate PDF first, then send email
    const pdfRes = await axios.post('/api/generate-pdf', { appId }); // returns pdf url or buffer
    await axios.post('/api/send-email', { appId, pdfUrl: pdfRes.data.pdfUrl });
    await axios.put(`/api/applications/${appId}`, { status: 'Submitted', stepsCompleted: {...app.stepsCompleted, review: true} });
    router.push('/'); // back to list
  }

  if (!app) return <div>Loading...</div>;
  const ready = Object.keys(errors).length === 0;

  return (
    <div className="flex">
      <Sidebar userId={app.userId}/>
      <main className="p-8 flex-1">
        <h1 className="text-2xl mb-4">Review</h1>
        <div className={`p-4 border ${errors.stream ? 'border-red-500' : ''}`}>Stream: {app.stream || <span className="text-red-500">Missing</span>}</div>
        <div className={`p-4 border mt-4 ${errors.degree ? 'border-red-500' : ''}`}>Degree: {app.degree || <span className="text-red-500">Missing</span>}</div>
        <div className={`p-4 border mt-4 ${errors.photo ? 'border-red-500' : ''}`}>
          Photo: {app.photo?.url ? <img src={app.photo.url} width={80} /> : <span className="text-red-500">Missing</span>}
        </div>
        <div className={`p-4 border mt-4 ${errors.documents ? 'border-red-500' : ''}`}>
          Documents: {app.documents?.length ? app.documents.map(d => <div key={d.url}><a href={d.url} target="_blank">Open</a></div>) : <span className="text-red-500">Missing</span>}
        </div>
        <div className="mt-6">
          <button disabled={!ready} onClick={submit} className={`px-4 py-2 ${!ready ? 'opacity-50 cursor-not-allowed' : 'bg-red-600 text-white'}`}>Submit Application</button>
        </div>
      </main>
    </div>
  );
}
