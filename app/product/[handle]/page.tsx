function Gallery() {
}

function ProductDescription() {
}

function RelatedProducts() {
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  // const product = await getProduct(params.handle);

  // if (!product) return <h1>NOT FOUND</h1>

  return <h1>{params.handle}</h1>
}
