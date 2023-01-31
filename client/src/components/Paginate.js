import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

//instead of props we can pass {pages, page, isAdmin, and keyword}
const Paginate = (props) => {
  return (
    props.pages > 1 && (
      <Pagination>
        {
          //num is whatever the number of pages is
          [...Array(props.pages).keys()].map((num) => (
            <LinkContainer
              key={num + 1}
              to={
                !props.isAdmin
                  ? props.keyword
                    ? `/search/${props.keyword}/page/${num + 1}`
                    : `/page/${num + 1}`
                  : `/admin/productlist/${num + 1}`
              }
            >
              <Pagination.Item active={num + 1 === props.page}>
                {num + 1}
              </Pagination.Item>
            </LinkContainer>
          ))
        }
      </Pagination>
    )
  )
}

export default Paginate
