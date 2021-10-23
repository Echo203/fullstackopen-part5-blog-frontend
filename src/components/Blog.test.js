import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> testing', () => {
  let component
  const blog = {
    author: 'Robert C. Martin',
    id: '61682f6b3cd02a1294853e4a',
    likes: 28,
    title: 'First class tests',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    user: { id: '61682770a4ef3320fc0e5a4b' }
  }
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog key={blog.id} passedBlog={blog} id={blog.user.id} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
    )
  })

  test('Title is displayed, author/likes/url are hidden', () => {

    expect(component.container).toHaveTextContent('First class tests')
    expect(component.container.querySelector('.hiddenBlogContainer')).toHaveStyle('display: none')
  })

  test('Likes, url, author are show after clicking the button', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    expect(component.container.querySelector('.hiddenBlogContainer')).not.toHaveStyle('display: none')
  })

  test('When like button is clicked twice, fucntion is also called twice', () => {
    const likeButton = component.container.querySelector('.likeButton')
    const likesContainer = component.container.querySelector('.hiddenBlogContainer')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likesContainer).toHaveTextContent('Likes: 30')
  })
})