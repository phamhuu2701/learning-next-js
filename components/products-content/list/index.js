import useSwr from 'swr'
import ProductItem from './../../product-item'
import ProductsLoading from './loading'
import { connect } from 'react-redux'

const ProductsContent = (props) => {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSwr('/api/products', fetcher)
  const { products } = props

  if (error) return <div>Failed to load users</div>
  return (
    <>
      {!products && <ProductsLoading />}

      {products?.docs && (
        <section className="products-list">
          {products.docs.map((item, index) => (
            <ProductItem
              key={index}
              product={item}
              discount={item.discount}
              key={item.id}
              id={item.id}
              price={item.price}
              currentPrice={item.currentPrice}
              productImage={item.images?.[0]}
              name={item.name}
            />
          ))}
        </section>
      )}
    </>
  )
}

export default connect((state) => state)(ProductsContent)
