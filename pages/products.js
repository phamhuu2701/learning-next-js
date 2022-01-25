import Layout from '../layouts/Main'
import Footer from '../components/footer'
import Breadcrumb from '../components/breadcrumb'
import ProductsFilter from '../components/products-filter'
import ProductsContent from '../components/products-content'
import { connect } from 'react-redux'
import ProductApi from '../apis/product'
import { setProducts } from '../store/actions/productsActions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Products = (props) => {
  const dispatch = useDispatch()

  const getProducts = async ({}) => {
    let res = await ProductApi.getProducts({})
    if (res.success) {
      dispatch(setProducts(res.payload))
    } else {
      alert(res.error.message)
    }
  }

  useEffect(() => {
    getProducts({})
  }, [])

  return (
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter />
          <ProductsContent />
        </div>
      </section>
      <Footer />
    </Layout>
  )
}

export default connect((state) => state)(Products)
