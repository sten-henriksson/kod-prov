import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { ApiElement } from '../types/types';

export const SendUrl = ({ setData }: any) => {
    type FormValues = {
        url: string;
        match:string
    };
    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async data => {
        const res = await axios.post(process.env.NEXT_PUBLIC_API_ADRESS + '/speedurl', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const apiData: ApiElement[] = res.data;
        setData(apiData);
    };
    return (

        <form onSubmit={handleSubmit(onSubmit)} >
            <input {...register("url")} placeholder="enter url with http://" />
            <input {...register("match")} placeholder="what to match" />
            <input type="submit" value="Test Time" />
        </form>

    )
}




export const SearchComp = ({ setData }: any) => {
    type SearchValues = {
        url: String;
    };
    const { register, handleSubmit } = useForm<SearchValues>();
    const onSearch: SubmitHandler<SearchValues> = async data => {
        const url = data.url
        const res = await axios.get(process.env.NEXT_PUBLIC_API_ADRESS + '/search', { params: { url:url } })
        const apiData: ApiElement[] = res.data;
        setData(apiData);
    };
    return (
        <form onSubmit={handleSubmit(onSearch)} >
            <input {...register("url")} placeholder="url" />
            <input type="submit" value="search" />

        </form>
    )
}