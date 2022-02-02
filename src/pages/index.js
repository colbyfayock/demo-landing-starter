import { useState } from 'react';
import Head from 'next/head'
import { FaShoppingCart } from 'react-icons/fa';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

import styles from '@styles/Home.module.scss'

import products from '@data/products.json';

const defaultCartState = {
  items: {}
};

export default function Home() {
  const [cart, updateCart] = useState(defaultCartState)

  const cartItems = Object.keys(cart.items).map(id => {
    const product = products.find(p => p.id === id);
    return {
      ...product,
      quantity: cart.items[id],
      subtotal: product.price * cart.items[id]
    }
  });

  const subtotal = cartItems.map(({ subtotal }) => subtotal).reduce((prev, current) => prev + current, 0);

  /**
   * addItemToCart
   */

  function addItemToCart(id) {
    updateCart(prev => {
      const { items } = prev;

      if ( items[id] > 0 ) {
        items[id] = items[id] + 1;
      } else {
        items[id] = 1;
      }

      return {
        ...prev,
        items
      }
    })

  }

  return (
    <Layout>
      <Head>
        <title>Space Jelly</title>
        <meta name="description" content="Cosmic web dev tutorials that will shock you with joy!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1 className={styles.title}>
          Space Jelly Shop
        </h1>

        <p className={styles.subtitle}>
          The best space jellyfish swag in the universe!
        </p>

        <div className={styles.cart}>
          <h2 className={styles.cartHeading}>
            <FaShoppingCart /> Cart
          </h2>

          <ul className={styles.cartItems}>
            {cartItems.length > 0 && cartItems.map(item => {
              return (
                <li key={item.id}>
                  <span>{ item.title } x { item.quantity }</span>
                  <span>${ item.subtotal.toFixed(2) }</span>
                </li>
              );
            })}
            {cartItems.length === 0 && (
              <li className={styles.cartNoItems}>No Items</li>
            )}
          </ul>


          <p className={styles.cartTotal}>
            <span className={styles.cartValue}>${ subtotal > 0 ? subtotal.toFixed(2) : '0.00'}</span>
          </p>
        </div>

        <ul className={styles.grid}>
          {products.map(product => {
            const { id, title, image, description, price } = product;
            return (
              <li key={id} className={styles.card}>
                <img src={image} alt={title} />
                <h3>{ title }</h3>
                <p>${ price }</p>
                <p>{ description }</p>
                <p>
                  <Button onClick={() => addItemToCart(id)}>Add to Cart</Button>
                </p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Layout>
  )
}