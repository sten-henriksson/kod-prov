import Home from '../pages/index'
import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

describe('Home', () => {
    it('check for text', () => {

        render(<Home />)
        const heading = screen.getByText("url");
        expect(heading).toBeInTheDocument()

    })
})