import { useState, useEffect } from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'
import { SearchComp } from '../components/input'
import userEvent from '@testing-library/user-event'
import { ApiElement } from '../types/types'
// respond with 200 on post if succ
const resolver = jest.fn()
const server = setupServer(
    rest.get(process.env.NEXT_PUBLIC_API_ADRESS + '/urls', (req, res, ctx) => {
        return res(ctx.json([{ url: "url1", matches: "matches1", keyword: "keyword1", time: "4201", date: "0001.1.1" }]))
    }),
    rest.get(process.env.NEXT_PUBLIC_API_ADRESS + '/search', resolver),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('mock api and check if data displayed', async () => {
    render(<Home />)
    await waitFor(() => {
        const heading = screen.getByText("keyword");
        expect(heading).toBeInTheDocument()
    })
})

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





function Search() {
    const [data, setData] = useState();
    return (
        SearchComp({ setData: setData })
    )
}
