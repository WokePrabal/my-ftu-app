import Link from 'next/link';
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function Sidebar({ userId }) {
  // We fetch application progress for user to show checkmarks
  const [progress, setProgress] = useState({});
  useEffect(() => {
    if (!userId) return;
    axios.get(`/api/applications?userId=${userId}`).then(res => {
      const apps = res.data; // assume array, pick latest
      if (apps && apps.length) {
        setProgress(apps[0].stepsCompleted || {});
      }
    }).catch(()=>{});
  }, [userId]);

  return (
    <div className="w-64 p-4 bg-white h-screen border-r">
      <div className="mb-6 font-bold text-xl">Application Steps</div>
      <ul className="space-y-3">
        <li>
          <Link href="/select-stream">
            <a className="flex items-center justify-between">
              <span>Select Stream</span>
              {progress.selectStream ? <span>✅</span> : null}
            </a>
          </Link>
        </li>
        <li>
          <Link href="/program-of-study"><a className="flex justify-between">Program of Study {progress.programOfStudy ? '✅' : ''}</a></Link>
        </li>
        <li>
          <Link href="/upload-documents"><a className="flex justify-between">Upload Document {progress.uploadDocuments ? '✅' : ''}</a></Link>
        </li>
        <li>
          <Link href="/review"><a className="flex justify-between">Review {progress.review ? '✅' : ''}</a></Link>
        </li>
      </ul>
    </div>
  );
}
