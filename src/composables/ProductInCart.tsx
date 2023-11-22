import Link from 'next/link';
import Image from 'next/image';

interface ProductInCartProps {
  name: string;
  price: number;
  id: string;
  imgUrl: string;
  activity: string;
}

export default function ProductInCart({
  name,
  price,
  id,
  imgUrl,
  activity,
}: ProductInCartProps) {
  const handleRemoveClick = (e: any) => {
    e.preventDefault();
    console.log(`Removing ${name} from the cart`);
    // You can add code to remove the product from the cart here
  };

  return (
    <div className="product-card cart-product">
      <div className="product-image">
        <Image src={imgUrl} height={100} width={100} alt={name} />
      </div>

      <div className="product-info">
        <h2 className="product-name">{name}</h2>

        <div className="product-price">
          <span>{price}</span>
        </div>
        
        <button className="remove-from-cart-btn" onClick={handleRemoveClick}>
          {activity} from Cart
        </button>
      </div>
    </div>
  );
}
