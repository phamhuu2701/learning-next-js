import { useState } from 'react'
import Footer from '../../components/footer'
import Layout from '../../layouts/Main'
import Breadcrumb from '../../components/breadcrumb'
import ProductsFeatured from '../../components/products-featured'
import Gallery from '../../components/product-single/gallery'
import Content from '../../components/product-single/content'
import Description from '../../components/product-single/description'
import Reviews from '../../components/product-single/reviews'
import { server } from '../../utils/server'
import ProductApi from '../../apis/product'
import { connect } from 'react-redux'

export async function getServerSideProps({ query }) {
  const pid = query.pid
  const res = await ProductApi.getProductById(pid)

  let product = null
  if (res.success) {
    product = res.payload
  } else {
    alert(res.error.message)
  }

  return {
    props: {
      product,
    },
  }
}

const Product = (props) => {
  const { product } = props

  const [showBlock, setShowBlock] = useState('description')

  return (
    <>
      {product && (
        <Layout>
          <Breadcrumb currentPage={product.title} />

          <section className="product-single">
            <div className="container">
              <div className="product-single__content">
                <Gallery images={product.photos} />
                <Content product={product} />
              </div>

              <div className="product-single__info">
                <div className="product-single__info-btns">
                  <button
                    type="button"
                    onClick={() => setShowBlock('description')}
                    className={`btn btn--rounded ${
                      showBlock === 'description' ? 'btn--active' : ''
                    }`}
                  >
                    Description
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBlock('reviews')}
                    className={`btn btn--rounded ${showBlock === 'reviews' ? 'btn--active' : ''}`}
                  >
                    Reviews (2)
                  </button>
                </div>

                <Description product={product} show={showBlock === 'description'} />
                {/* <Reviews product={product} show={showBlock === 'reviews'} /> */}
              </div>
            </div>
          </section>

          <div className="product-single-page">
            <ProductsFeatured />
          </div>
          <Footer />
        </Layout>
      )}
    </>
  )
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Product)
