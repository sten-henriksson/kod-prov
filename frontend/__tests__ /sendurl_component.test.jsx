import { useState } from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SendUrl } from '../components/input'
import userEvent from '@testing-library/user-event'

// respond with 200 on post if succ
const resolver = jest.fn()
const server = setupServer(
    rest.post(process.env.NEXT_PUBLIC_API_ADRESS + '/speedurl', async (req, res, ctx) => {
        let body = await req.json();
        if (body.url === "123" && body.match === "123") {
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
    render(<Send_url />)
    const inputs = screen.getAllByRole('textbox')
    await userEvent.type(inputs[0], '123')
    await userEvent.type(inputs[1], '123')
    await waitFor(() => {
        const button = screen.getByRole("button")
        fireEvent.click(button)
        expect(inputs[0]).toHaveValue('123')
        expect(inputs[1]).toHaveValue('123')
        expect(resolver).toHaveBeenCalled();
    })
})
// need to pass useState or else it starts to cry
function Send_url() {
    const [data, setData] = useState();
    return (
        SendUrl({ setData: setData })
    )
}
