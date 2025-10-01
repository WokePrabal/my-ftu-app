// pages/upload-documents.js
import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar';
import { useRouter } from 'next/router';

export default function UploadDocuments() {
  const router = useRouter();
  const { appId } = router.query;
  const [photoFile, setPhotoFile] = useState(null);
  const [docFile, setDocFile] = useState(null);

  const uploadToServer = async () => {
    const form = new FormData();
    if (photoFile) form.append('photo', photoFile);
    if (docFile) form.append('doc', docFile);
    form.append('appId', appId);

    const res = await axios.post('/api/upload', form, { headers: {'Content-Type': 'multipart/form-data'}});
    // res.data.photo, res.data.doc have URLs
    await axios.put(`/api/applications/${appId}`, {
      photo: res.data.photo,
      documents: res.data.doc ? [res.data.doc] : [],
      stepsCompleted: { uploadDocuments: true }
    });
    router.push(`/review?appId=${appId}`);
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-8 flex-1">
        <h1 className="text-2xl mb-4">Upload Documents</h1>
        <label>Photo Upload (profile)</label>
        <input type="file" accept="image/*" onChange={e=>setPhotoFile(e.target.files[0])} />
        <label className="mt-4">File Upload (supporting)</label>
        <input type="file" onChange={e=>setDocFile(e.target.files[0])} />
        <div className="mt-4">
          <button onClick={uploadToServer} className="px-4 py-2 border">Save & Continue</button>
        </div>
      </main>
    </div>
  );
}
