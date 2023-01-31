import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    </>
  )
}

Meta.defaultProps = {
  title: 'Yoga Store',
  description: 'We sell the best products for the best prices',
  keywords: 'Yoga products, cheap yoga mats, yoga resistance band',
}

export default Meta
