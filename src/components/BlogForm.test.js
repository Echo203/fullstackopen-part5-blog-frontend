import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Submit handler with good credentials is called', () => {
  const handleNewBlog = jest.fn()
  const component = render(
    <BlogForm handleNewBlog={handleNewBlog}/>
  )
  const form = component.container.querySelector('form')
  const titleField = component.container.querySelector('#title')
  const authorField = component.container.querySelector('#author')
  const urlField = component.container.querySelector('#url')

  fireEvent.change(titleField, { target: { value: 'Moja nowa ksiazka' } })
  fireEvent.change(authorField, { target: { value: 'Marcin Jankowski' } })
  fireEvent.change(urlField, { target: { value: 'wp.pl' } })
  fireEvent.submit(form)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0].title).toBe('Moja nowa ksiazka')
  expect(handleNewBlog.mock.calls[0][0].author).toBe('Marcin Jankowski')
  expect(handleNewBlog.mock.calls[0][0].url).toBe('wp.pl')
  console.log('handleNewBlog.mock.calls', handleNewBlog.mock.calls)
})