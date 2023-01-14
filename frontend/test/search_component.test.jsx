import { useState, useEffect } from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SearchComp } from '../components/input'
import userEvent from '@testing-library/user-event'

// respond with 200 on post if succ
const resolver = jest.fn()
const server = setupServer(
    rest.get(process.env.NEXT_PUBLIC_API_ADRESS + '/search', async (req, res, ctx) => {
        if (await req.url.searchParams.get("url") === "123") {
            resolver();
            return res(ctx.json([{ url: "url2", matches: "matches2", keyword: "keyword2", time: "4202", date: "0001.1.2" }]))
        }
        else {
            return res(ctx.status(400));
        }
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('Search post', async () => {
    render(<Search />)
    await userEvent.type(screen.getByRole('textbox'), '123')
    await waitFor(() => {
        const button = screen.getByText("search")
        const textinput = screen.getByRole("textbox");
        fireEvent.click(button)
        expect(screen.getByRole('textbox')).toHaveValue('123')
        expect(resolver).toHaveBeenCalled();
    })
})




// need to pass useState or else it starts to cry
function Search() {
    const [data, setData] = useState();
    return (
        SearchComp({ setData: setData })
    )
}
