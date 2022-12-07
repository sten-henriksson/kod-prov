import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
type ApiElement = {
  url: string,
  time: string,
  date: string
}
export default function Home() {

  const [data, setData] = useState<ApiElement[]>()


  async function getUrls() {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ADRESS + '/urls')
    const apiData: ApiElement[] = res.data;
    setData(apiData)

  }
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

const SendUrl = ({ setData }: any) => {
  type FormValues = {
    url: String;
  }
  const { register, handleSubmit } = useForm<FormValues>();
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
    const url = data.url
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ADRESS + '/search', { params: { url } })
    const apiData: ApiElement[] = res.data;
    setData(apiData)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("url")} placeholder="enter url with http://" />
      <input type="submit" value="Test Time" />
    </form>
  )
}

const SearchComp = ({ setData }: any) => {
  type SearchValues = {
    url: String;
  }
  const { register, handleSubmit } = useForm<SearchValues>();
  const onSearch: SubmitHandler<SearchValues> = async data => {
    const url = data.url
    const res = await axios.get(process.env.NEXT_PUBLIC_API_ADRESS + '/search', { params: { url } })
    const apiData: ApiElement[] = res.data;
    setData(apiData)
  };
  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <input {...register("url")} placeholder="url" />
      <input type="submit" value="search" />

    </form>
  )
}