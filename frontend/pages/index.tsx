import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
export default function Home() {
  type FormValues = {
    url: String;
  }
  type ApiElement = {
    url: string,
    time: string,
    date: string
  }
  const [data, setData] = useState<ApiElement[]>()
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async data => {
    const res = await axios.post(process.env.NEXT_PUBLIC_API_ADRESS + '/speedurl', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const apiData: ApiElement[] = res.data;
    setData(apiData)
  };
  const onSearch: SubmitHandler<FormValues> = async data => {
    reset()
    const url = data.url
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ADRESS + '/search', { params: { url } })
    const apiData: ApiElement[] = res.data;
    setData(apiData)
  };
  async function getUrls() {
    reset()
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ADRESS + '/urls')
    const apiData: ApiElement[] = res.data;
    setData(apiData)
  }
  useEffect(() => {
    getUrls();
  }, [])
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("url")} placeholder="enter url with http://" />
        <input type="submit" value="Test Time" />
      </form>
      <form onSubmit={handleSubmit(onSearch)}>
        <input {...register("url")} placeholder="search" />
        <input type="submit" value="search" />

      </form>
      <table>
        <thead>
          <tr>
            <th>url</th>
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
