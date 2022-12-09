import Home from '../pages/index'
import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

const server = setupServer(
    rest.get('/urls', (req, res, ctx) => {
        return res(ctx.json({ data: [{ url: "url1", matches: "matches1", keyword: "keyword1", time: "4201", date: "0001.1.1" }] }))
    }),
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Home', () => {
    it('check for text', () => {

        render(<Home />)
        const heading = screen.getByText("url");
        expect(heading).toBeInTheDocument()

    })
})