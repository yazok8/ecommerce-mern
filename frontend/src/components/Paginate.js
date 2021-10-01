import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {
          //num is whatever the number of pages is
          [...Array(pages).keys()].map((num) => (
            <LinkContainer
              key={num + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${num + 1}`
                    : `/page/${num + 1}`
                  : `/admin/productlist/${num + 1}`
              }
            >
              <Pagination.Item active={num + 1 === page}>
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
