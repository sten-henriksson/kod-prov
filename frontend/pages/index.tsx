import { useState, useEffect } from 'react'
import axios from 'axios';
import { SearchComp, SendUrl } from '../components/input';
import { ApiElement } from '../types/types';
import Head from 'next/head';
export default function Home() {
  const [data, setData] = useState<ApiElement[]>();
  async function getUrls() {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ADRESS + '/urls');
    const apiData: ApiElement[] = res.data;
    setData(apiData);

  };
  useEffect(() => {
    getUrls();
  }, [])
  return (
    <div className="container">

      {SendUrl({ setData: setData })}
      {SearchComp({ setData: setData })}
      <table>
        <thead>
          <tr>
            <th>url</th>
            <th>match</th>
            <th>keyword</th>
            <th>time</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map((x: ApiElement, index: number) => {
              return <tr key={index}>
                <td>
                  {x.url}
                </td>
                <td>
                  {x.matches}
                </td>
                <td>
                  {x.keyword}
                </td>
                <td>
                  {parseInt(x.time) + "ms"
                  }
                </td>
                <td>
                  {x.date}
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
      <style jsx global>{`
      .container{
                display:flex;
                flex-wrap: wrap;
                flex-direction: column;
                align-items: center;

              }
      `}</style>
    </div>
  )
}

