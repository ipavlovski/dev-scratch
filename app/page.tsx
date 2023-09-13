import { getCollectionProducts } from 'lib/shopify/api'
import type { Product } from 'lib/shopify/types'
import Image from 'next/image'
import Link from 'next/link'
import { css } from 'styled-system/css'
import { Center, Stack } from 'styled-system/jsx'

type PriceProps = {
  amount: string
  className?: string
  currencyCode: string
  currencyCodeClassName?: string
} & React.ComponentProps<'p'>
function Price({ amount, className, currencyCode = 'USD', currencyCodeClassName }: PriceProps) {
  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol'
      }).format(parseFloat(amount))}`}
      <span>{`${currencyCode}`}</span>
    </p>
  )
}

type LabelProps = {
  title: string
  amount: string
  currencyCode: string
  position?: 'bottom' | 'center'
}
function Label({ title, amount, currencyCode, position = 'bottom' }: LabelProps) {
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <Price
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  )
}

type GridTileImageProps = {
  isInteractive?: boolean
  active?: boolean
  label?: LabelProps
} & React.ComponentProps<typeof Image>

function GridTileImage({ isInteractive = true, active, label, ...props }: GridTileImageProps) {
  return (
    <div>
      {props.src ? (
        // `alt` is inherited from `props`, which is being enforced with TypeScript:
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image {...props} />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  )
}

type ThreeItemGridItemProps = { item: Product; size: 'full' | 'half'; priority?: boolean }
function ThreeItemGridItem({ item, size, priority }: ThreeItemGridItemProps) {
  return (
    <div>
      <Link href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  )
}

async function ThreeItemGrid() {
  // `hidden-*` collections are hidden from the search page
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  })
  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null
  const [firstProduct, secondProduct, thirdProduct] = homepageItems

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  )
}

async function Carousel() {
  // `hidden-*` collections are hidden from the search page
  const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' })
  if (!products?.length) return null

  // purseful duplication - fill-in even the widest of screens for looping
  const carouselProducts = [...products, ...products, ...products]

  return (
    <div>
      <ul>
        {carouselProducts.map((product, i) => (
          <li key={`${product.handle}${i}`}>
            <Link href={`/product/${product.handle}`}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Home() {
  const styles = css({
    fontSize: '3xl'
  })

  return (
    <Center height="calc(100vh - 4rem)">
      <ThreeItemGrid />
      <Carousel />
    </Center>
  )
}
