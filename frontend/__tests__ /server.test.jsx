import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'

const server = setupServer(
    rest.get('/urls', (req, res, ctx) => {
        return res(ctx.json([{ url: "url1", matches: "matches1", keyword: "keyword1", time: "4201", date: "0001.1.1" }]))
    }),
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
