import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
export default function Home() {
  type FormValues = {
    url: String;
  }
  type ApiElement = {
    url: String,
    time: String,
    date: String
  }
  const [data, setData] = useState<ApiElement[]>()

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async data => {
    axios.post('http://localhost:1339/speedurl', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };
  async function getUrls() {
    const res = await axios.get('http://localhost:1339/urls')
    const apiData: ApiElement[] = res.data;
    setData(apiData)
  }
  useEffect(() => {
    getUrls();
  }, [])
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("url")} placeholder="url" />
        <input type="submit" />
      </form>
      {
        data?.map((x: ApiElement, index: number) => {
          return <div key={index}>
            {x.url + ":" + x.time}
          </div>
        })
      }
      <style jsx global>{`
      `}</style>
    </div>
  )
}
