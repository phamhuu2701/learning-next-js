import Link from 'next/link'
import { some } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavProduct } from './../../store/actions/userActions'
import numberWithCommas from './../../utils/numberWithCommas'

const ProductItem = (props) => {
  const { discount, productImage, id, name, price, currentPrice, product } = props
  const dispatch = useDispatch()

  const { favProducts } = useSelector((state) => state.user)

  const isFavourite = some(favProducts, (productId) => productId === id)

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id,
      })
    )
  }

  let _discount = 0
  if (product) {
    _discount = product.price_compare ? Math.ceil((product.price / product.price_compare) * 100) : 0
  }
  let _title = ''
  if (product) {
    _title = product.title.length > 27 ? product.title.slice(0, 27) + '..' : product.title
  }

  return (
    <>
      {product && (
        <div className="product-item">
          <div className="product__image">
            <button
              type="button"
              onClick={toggleFav}
              className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}
            >
              <i className="icon-heart"></i>
            </button>

            <Link href={`/product/${product._id}`}>
              <a>
                <img src={product.thumbnail} alt="product" />
                {_discount && <span className="product__discount">{_discount}%</span>}
              </a>
            </Link>
          </div>

          <div className="product__description">
            <h3>{_title}</h3>
            <div className={'product__price ' + (_discount ? 'product__price--discount' : '')}>
              <h4>${numberWithCommas(product.price)}</h4>

              {_discount && <span>${numberWithCommas(product.price_compare)}</span>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductItem
