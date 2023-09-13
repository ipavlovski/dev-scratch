import { getCollectionProducts } from 'lib/shopify/api'
import type { Product } from 'lib/shopify/types'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { css } from 'styled-system/css'
import { Center, Grid, GridItem, HStack, Stack } from 'styled-system/jsx'

function GridTileImage({ src, alt }: ComponentProps<typeof Image>) {
  const styles = css({
    transition: '250ms all ease-in-out',
    _hover: {
      transform: 'scale(1.05)'
    }
  })
  return <Image className={styles} src={src} alt={alt} fill sizes="(min-width: 768px) 33vw, 50vw" />
}

type GridTileLabelProps = { title: string; amount: string; currencyCode: string }
function GridTileLabel({ title, amount, currencyCode }: GridTileLabelProps) {
  const labelStyles = css({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    margin: '1rem',
    background: 'slate.800',
    padding: '.25rem .25rem .25rem .75rem',
    fontSize: '.75rem',
    fontWeight: 'bold',
    borderRadius: '2rem',
    boxShadow: '13px -11px 33px -6px rgba(0,0,0,0.51);',
    maxWidth: '30vw'
  })

  const titleStyles = css({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '10rem',
    flex: 1,
    marginRight: '1rem'
  })

  const priceStyles = css({
    padding: '.5rem',
    borderRadius: '2rem',
    backgroundColor: 'blue.800'
  })

  return (
    <div className={labelStyles}>
      <h2 className={titleStyles}>{title}</h2>
      <h2 className={priceStyles}>
        {amount} {currencyCode}
      </h2>
    </div>
  )
}

function ThreeItemGridItem({ item }: { item: Product }) {
  const styles = css({
    position: 'relative',
    background: 'slate.900',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid',
    borderColor: 'stone.900',
    overflow: 'hidden',
    _hover: {
      borderColor: 'stone.300'
    }
  })

  return (
    <div className={styles}>
      <Link href={`/product/${item.handle}`}>
        <GridTileImage src={item.featuredImage.url} alt={item.title} />
        <GridTileLabel
          title={item.title}
          amount={item.priceRange.maxVariantPrice.amount}
          currencyCode={item.priceRange.maxVariantPrice.currencyCode}
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

  const styles = css({
    display: 'grid',
    gridTemplateRows: 'repeat(2, 30vw)',
    gridTemplateColumns: 'repeat(2, 30vw)',
    gridGap: '1rem',
    padding: '1rem',
    height: 'calc(100vh - 4rem)',
    width: '100vw',

    '& > div:nth-child(1)': {
      gridArea: '1 / 1 / 3 / 3'
    },
    '& > div:nth-child(2)': {
      gridArea: '1 / 3 / 2 / 4'
    },
    '& > div:nth-child(3)': {
      gridArea: '2 / 3 / 3 / 4'
    }
  })

  return (
    <section className={styles}>
      <ThreeItemGridItem item={firstProduct} />
      <ThreeItemGridItem item={secondProduct} />
      <ThreeItemGridItem item={thirdProduct} />
    </section>
  )
}

export default function Home() {
  const styles = css({
    fontSize: '3xl'
  })

  return (
    <Center>
      <ThreeItemGrid />
      {/* <Carousel /> */}
    </Center>
  )
}
