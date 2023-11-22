import Image from "next/image";
import Link from "next/link";

export default function MainBody() {
  return (
    <div className="body">
      <section id="hero">
        <div>
          <h1>Buy, Sell, and Repair Phones</h1>
          <p>Your one-stop destination for all your phone needs.</p>
          <Link href={"/products"} className="explore-Btn">
            Explore Services
          </Link>
        </div>
      </section>

      <section id="services-info">
        <Image
          src={"/images/services.png"}
          className="servicesImg hImg"
          alt="services"
          width={50}
          height={50}
        />
        <h2>Services</h2>
        <div className="services">
          <div className="service">
            <h2>Selling Phones</h2>
            <p>Discover the latest smartphone models at competitive prices.</p>
            <Link href={""} className="cta-btn">
              Shop Now
            </Link>
          </div>

          <div className="service">
            <h2>Repairing Phones</h2>
            <p>
              Trust our experts to fix your phone issues quickly and
              professionally.
            </p>
            <Link href={""} className="cta-btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <Image
          src={"/images/rating.png"}
          className="ratings hImg"
          alt="ratings"
          width={50}
          height={50}
        />
        <h2>What Our Customers Say</h2>
        <div className="testimonial">
          <div className="customer_img"></div>
          <div className="tes-Per">
            <div className="openQ"></div>
            The repair service was fast, and my phone looks brand new!
            <div className="closeQ"></div>
            <span className="cus-info">
              <span className="cus-name">Olaegbe Abdul-Rahmon</span>
              <span className="cus_work"> CEO at AlronWaves Robotics</span>
            </span>
          </div>
        </div>
        <div className="testimonial">
          <div className="customer_img"></div>
          <div className="tes-Per">
            <div className="openQ"></div>I found the perfect phone at Your Phone
            Shop. Great prices and selection!
            <div className="closeQ"></div>
            <span className="cus-info">
              <span className="cus-name">Olaegbe Abdul-Rahmon</span>
              <span className="cus_work"> CEO at AlronWaves Robotics</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
